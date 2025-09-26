import json
from rest_framework import serializers
from .models import User, Transaction
from phonenumber_field.serializerfields import PhoneNumberField


class UserSerializer(serializers.ModelSerializer):
    phone = PhoneNumberField()

    class Meta: 
        model = User
        # fields = ["email", "name", "phone", "tree", "donation"]
        fields = "__all__"

class UserNestedSerializer(serializers.ModelSerializer):
    # Remove unique validator so DRF won't block existing users
    email = serializers.EmailField(validators=[])
    phone = PhoneNumberField(validators=[])

    class Meta:
        model = User
        fields = ["email", "name", "phone"]


class TransactionSerializerPOST(serializers.ModelSerializer):
    user = UserNestedSerializer()
    amount = serializers.IntegerField()
    message = serializers.CharField(required=False, allow_blank=True)
    transaction_prove = serializers.ImageField()

    class Meta:
        model = Transaction
        fields = ["user", "amount", "message", "type", "transaction_prove"]

    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError("Amount must be a positive integer.")
        return value

    def create(self, validated_data):
        user_data = validated_data.pop("user")

        email = user_data.get("email")
        phone = user_data.get("phone")
        name = user_data.get("name", "")

        if not email:
            raise serializers.ValidationError({"email": "Email is required."})
        if not phone:
            raise serializers.ValidationError({"phone": "Phone number is required."})

        # 1️⃣ Check existing by email
        try:
            existing_user = User.objects.get(email=email)
            if str(existing_user.phone) != str(phone):  # mismatch
                raise serializers.ValidationError({"email": "This email is already used with a different phone number."})
            # phone matches → update name if needed
            existing_user.name = name or existing_user.name
            existing_user.save()
            user = existing_user
        except User.DoesNotExist:
            # 2️⃣ Check existing by phone
            try:
                existing_phone_user = User.objects.get(phone=phone)
                if existing_phone_user.email != email:
                    raise serializers.ValidationError({"phone": "This phone number is already used with a different email."})
                user = existing_phone_user
            except User.DoesNotExist:
                # 3️⃣ Create brand new user
                user = User.objects.create(email=email, phone=phone, name=name)

        # Create transaction linked to this user
        transaction = Transaction.objects.create(user=user, **validated_data)

        return transaction

class TransactionSerializer(serializers.ModelSerializer):
    user = UserNestedSerializer()

    class Meta:
        model = Transaction
        fields = ["id", "timestamp", "user", "amount", "message", "type", "is_success"]

class LeaderboardSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.name', read_only=True)

    class Meta:
        model = Transaction
        fields = ['name', 'message', 'timestamp', 'amount']

