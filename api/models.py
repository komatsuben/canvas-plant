from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.
class User(models.Model):
    email = models.EmailField(max_length=255, primary_key=True)
    name = models.CharField(max_length=255, null=False, blank=True, default="Anonymous")
    phone = PhoneNumberField(null=False, blank=False, unique=True)
    donation = models.IntegerField(null=False, default=0)
    
    def save(self, *args, **kwargs):
        self.name = self.name.strip().title()
        super().save(*args, **kwargs)
    
    def update_donation(self):
        total_donation = Transaction.objects.filter(user=self, is_success=True).aggregate(models.Sum('tree'))['tree__sum'] or 0
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
    tree = models.IntegerField(null=False, default=0)
    message = models.CharField(null=True, blank=True, max_length=255)
    is_success = models.BooleanField(null=False, default=False)
    
    def __str__(self):
        return f"Transaction {self.id} by {self.user.email}"

    class Meta:
        verbose_name = "Transaction"
        verbose_name_plural = "Transactions"
