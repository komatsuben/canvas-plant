from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.
class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, null=False, default="")
    phone = PhoneNumberField(null=False, blank=False, unique=True)
