from django.contrib import admin
from .models import User, Transaction

# Register your models here.
class TransactionAdmin(admin.ModelAdmin):
    # Display all fields in the list view
    list_display = [field.name for field in Transaction._meta.fields]
    
    # Make all fields read-only except 'is_success'
    readonly_fields = [field.name for field in Transaction._meta.fields if field.name != 'is_success']
    
    # Specify editable fields
    fields = ('is_success',)

admin.site.register(User)
admin.site.register(Transaction, TransactionAdmin)