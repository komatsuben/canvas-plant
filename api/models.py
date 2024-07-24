from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.
class User(models.Model):
    email = models.EmailField(max_length=255, primary_key=True)
    name = models.CharField(max_length=255, null=False, default="")
    phone = PhoneNumberField(null=False, blank=False, unique=True)
    donation = models.IntegerField(null=False, default=0)

class Transaction(models.Model):
    id = models.AutoField(primary_key=True)
    is_success = models.BooleanField(null=False, default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
