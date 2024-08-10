from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Transaction, User

@receiver(post_save, sender=Transaction)
def update_user_amount(sender, instance, **kwargs):
    user = instance.user
    user.update_tree()
    user.update_donation()
    user.save()
