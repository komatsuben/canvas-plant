from typing import *
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from enum import Enum

def get_choices(enum_class: Enum) -> List[Tuple[str, str]]:
    choices = [(choice.name, choice.value) for choice in enum_class]
    return [(key, value) for key, value in choices if value != ''] 

# Choices (db_val, label)
class TransactionType(Enum):
    TREE = "Tree"
    DONATION = "Donation"

# Create your models here.
class User(models.Model):
    email = models.EmailField(max_length=255, primary_key=True)
    name = models.CharField(max_length=255, null=False, blank=True, default="Anonymous")
    phone = PhoneNumberField(null=False, blank=False, unique=True)
    tree = models.IntegerField(null=False, default=0)
    donation = models.IntegerField(null=False, default=0)
    
    def save(self, *args, **kwargs):
        self.name = self.name.strip().title()
        super().save(*args, **kwargs)
    
    def update_tree(self):
        total_tree = Transaction.objects.filter(user=self, is_success=True, type="TREE").aggregate(models.Sum('amount'))['amount__sum'] or 0
        self.tree = total_tree
        self.save()
    
    def update_donation(self):
        total_donation = Transaction.objects.filter(user=self, is_success=True, type="DONATION").aggregate(models.Sum('amount'))['amount__sum'] or 0
        self.donation = total_donation
        self.save()
    
    def __str__(self):
        return self.email

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

class Transaction(models.Model):
    id = models.AutoField(primary_key=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.IntegerField(null=False, default=0)
    message = models.CharField(null=True, blank=True, max_length=255)
    type = models.CharField(null=False, default="TREE", choices=get_choices(TransactionType), max_length=8)
    is_success = models.BooleanField(null=False, default=False)
    transaction_prove = models.ImageField(upload_to='images/', null=True, blank=True)
    
    def __str__(self):
        return f"Transaction {self.id} by {self.user.email}"

    class Meta:
        verbose_name = "Transaction"
        verbose_name_plural = "Transactions"
