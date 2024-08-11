from django.db.models import Sum
from .serializers import *
from .models import User, Transaction
from .permissions import IsSuperUser

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.
class GetUser(APIView):
    serializer_class = UserSerializer
    lookup_url_kwarg = 'email'
    
    def get(self, request, format=None):
        email = request.GET.get(self.lookup_url_kwarg)
        if email:
            try:
                user = User.objects.get(email=email)
                user.update_donation()
                data = UserSerializer(user).data
                return Response(data, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response({"error": "Email parameter is required"}, status=status.HTTP_400_BAD_REQUEST)

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
    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            transaction = serializer.save()
            response_serializer = TransactionSerializer(transaction)
            return Response({'status': "Accepted", 'data': response_serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'status': "Rejected", 'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

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
