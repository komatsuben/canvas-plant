from django.urls import path
from .views import index

urlpatterns = [
    path('', index, name='index'),
    path('success/', index, name='success'),
    path('search', index, name='search'),
    path('main', index, name='main'),
]
