import json
from django.db.models import Sum
from .serializers import *
from .models import User, Transaction
from .permissions import IsSuperUser

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser

# Create your views here.
class GetUser(APIView):
    serializer_class = UserSerializer
    lookup_url_kwarg = 'email'

    def get(self, request, format=None):
        email = request.GET.get(self.lookup_url_kwarg)
        if not email:
            return Response(
                {"error": "Email parameter is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # get or create user automatically
        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                "name": request.GET.get("name", ""),
                "phone": request.GET.get("phone", "") or "",
            },
        )

        # keep totals in sync
        user.update_donation()
        user.update_tree()

        return Response(
            UserSerializer(user).data,
            status=status.HTTP_201_CREATED if created else status.HTTP_200_OK
        )


class GetTransaction(APIView):
    serializer_class = TransactionSerializer
    lookup_url_kwarg = 'id'
    permission_classes = [IsSuperUser]
    
    def get(self, request, format=None):
        id = request.GET.get(self.lookup_url_kwarg)
        if id:
            try:
                transaction = Transaction.objects.get(id=id)
                data = TransactionSerializer(transaction).data
                return Response(data, status=status.HTTP_200_OK)
            except Transaction.DoesNotExist:
                return Response({"error": "Transaction not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response({"error": "id parameter is required"}, status=status.HTTP_400_BAD_REQUEST)

class GetTree(APIView):
    def get(self, request, format=None):
        total_trees = Transaction.objects.filter(is_success=True, type="TREE").aggregate(Sum('amount'))
        total_tree_count = total_trees['amount__sum'] if total_trees['amount__sum'] else 0
        data = {'total': total_tree_count}
        return Response(data, status=status.HTTP_200_OK)

class GetMostTree(APIView):
    serializer_class = UserSerializer
    def get(self, request, format=None):
        user = User.objects.exclude(tree=0).order_by('-tree')[:20]
        data = UserSerializer(user, many=True).data
        return Response(data, status=status.HTTP_200_OK)

class GetMostRecent(APIView):
    serializer_class = LeaderboardSerializer
    def get(self, request, format=None):
        transactions = Transaction.objects.filter(is_success=True).order_by('-timestamp')[:20]
        data = LeaderboardSerializer(transactions, many=True).data
        return Response(data, status=status.HTTP_200_OK)

class PostTransaction(APIView):
    serializer_class = TransactionSerializerPOST
    parser_classes = [MultiPartParser, FormParser]  # Handles multipart form data

    def post(self, request, format=None):
        # Make a mutable copy of request data
        data = request.data.copy()

        # --- Handle user data ---
        if 'user' in data:
            user_raw = data.get('user')

            # QueryDict returns lists, take the first value if needed
            if isinstance(user_raw, list):
                user_raw = user_raw[0]

            # Convert bytes to str if needed
            if isinstance(user_raw, (bytes, bytearray)):
                try:
                    user_raw = user_raw.decode('utf-8')
                except Exception:
                    return Response(
                        {"status": "Rejected", "error": {"user": ["Could not decode user field."]}},
                        status=status.HTTP_400_BAD_REQUEST
                    )

            # If it's a JSON string, parse it
            if isinstance(user_raw, str):
                try:
                    user_data = json.loads(user_raw)
                    data['user'] = user_data
                except (TypeError, ValueError):
                    return Response(
                        {"status": "Rejected", "error": {"user": ["Invalid JSON in user field."]}},
                        status=status.HTTP_400_BAD_REQUEST
                    )

        # If user data is sent as separate dotted fields
        elif 'user.email' in data:
            user_data = {
                'email': data.get('user.email', ''),
                'name': data.get('user.name', ''),
                'phone': data.get('user.phone', '')
            }
            data['user'] = user_data
            # Clean up dotted fields
            data.pop('user.email', None)
            data.pop('user.name', None)
            data.pop('user.phone', None)

        # No user data at all
        else:
            return Response(
                {"status": "Rejected", "error": {"user": ["This field is required."]}},
                status=status.HTTP_400_BAD_REQUEST
            )

        # --- Force convert to plain dict (important for nested serializer) ---
        if hasattr(data, "dict"):  # if it's still a QueryDict
            data = dict(data)

        # --- Unwrap any single-element lists (QueryDict default) ---
        for key, value in list(data.items()):
            if isinstance(value, list) and len(value) == 1:
                data[key] = value[0]

        # --- Ensure user is parsed into a dict ---
        if isinstance(data.get('user'), str):
            try:
                data['user'] = json.loads(data['user'])
            except Exception:
                return Response(
                    {"status": "Rejected", "error": {"user": ["Invalid JSON format for user."]}},
                    status=status.HTTP_400_BAD_REQUEST
                )

        print("Final data going into serializer:", data)

        # --- Validate & Save ---
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            transaction = serializer.save()
            user = transaction.user
            user.update_tree()
            user.update_donation()
            response_serializer = TransactionSerializer(transaction)
            return Response(
                {"status": "Accepted", "data": response_serializer.data},
                status=status.HTTP_201_CREATED
            )

        # Debug serializer errors
        print("Serializer errors:", serializer.errors)

        return Response(
            {"status": "Rejected", "error": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )


class GetSearch(APIView):
    serializer_class = TransactionSerializer

    def post(self, request, format=None):
        keyword = request.data.get('keyword', '')
        field = request.data.get('field', 'name')

        valid_fields = ['user__name', 'message', 'timestamp']
        if field not in valid_fields:
            return Response({"error": "Invalid field for search"}, status=status.HTTP_400_BAD_REQUEST)

        data=[]
        if keyword:
            filter_kwargs = {f"{field}__icontains": keyword}
            transactions = Transaction.objects.filter(is_success=True, **filter_kwargs)
            data = self.serializer_class(transactions, many=True).data

        return Response(data, status=status.HTTP_200_OK)


class ApproveTransaction(APIView):
    permission_classes = [IsSuperUser]

    def post(self, request, format=None):
        transaction_id = request.data.get("id")
        try:
            transaction = Transaction.objects.get(id=transaction_id)
            transaction.is_success = True
            transaction.save()

            # update user totals after approval
            user = transaction.user
            user.update_tree()
            user.update_donation()

            return Response({"status": "Approved"}, status=status.HTTP_200_OK)
        except Transaction.DoesNotExist:
            return Response({"error": "Transaction not found"}, status=status.HTTP_404_NOT_FOUND)
