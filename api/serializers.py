from rest_framework import serializers
from .models import User, Transaction
from rest_framework import generics, status
from rest_framework.response import Response

import phonenumbers
from phonenumbers import NumberParseException
from phonenumber_field.phonenumber import PhoneNumber
from phonenumber_field.serializerfields import PhoneNumberField

class UserSerializer(serializers.ModelSerializer):
    phone = PhoneNumberField()
    class Meta:
        model = User
        fields = ["email", "name", "phone", "donation"]

class UserNestedSerializer(serializers.Serializer):
    email = serializers.EmailField()
    name = serializers.CharField()
    phone = PhoneNumberField()

class TransactionSerializer(serializers.ModelSerializer):
    user = UserNestedSerializer()
    class Meta:
        model = Transaction
        fields = ["id", "timestamp", "user", "tree", "message", "is_success"]

class LeaderboardSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.name', read_only=True)
    class Meta:
        model = Transaction
        fields = ['name', 'message', 'timestamp', 'tree']

class TransactionSerializerPOST(serializers.ModelSerializer):
    user = UserNestedSerializer()
    tree = serializers.IntegerField()
    message = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = Transaction
        fields = ["user", "tree", "message"]

    def validate_tree(self, value):
        if value <= 0:
            raise serializers.ValidationError("Tree amount must be a positive integer.")
        return value

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        email = user_data.get('email')
        name = user_data.get('name')
        phone = user_data.get('phone')
        
        user, created = User.objects.get_or_create(
            email=email,
            defaults={'name': name, 'phone': phone}
        )

        if not created:
            user.name = name
            user.phone = phone
            user.save()

        transaction = Transaction.objects.create(user=user, **validated_data)
        return transaction
