from django.contrib import admin
from .models import User, Transaction

# Register your models here.

def toggle_is_success(modeladmin, request, queryset):
    for transaction in queryset:
        transaction.is_success = not transaction.is_success
        transaction.save()

class TransactionAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Transaction._meta.fields]
    readonly_fields = [field.name for field in Transaction._meta.fields if field.name not in ['is_success', 'amount', 'type']]
    fields = ['is_success', 'amount', 'type']
    ordering = ['id']
    
    actions = [toggle_is_success]
    toggle_is_success.short_description = "Toggle is_success"

admin.site.register(User)
admin.site.register(Transaction, TransactionAdmin)