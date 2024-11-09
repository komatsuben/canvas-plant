from django.urls import path
from .views import index

urlpatterns = [
    path('', index, name='index'),
    path('plant', index, name='main'),
    path('plant/success/', index, name='success'),
    path('plant/search', index, name='search'),
]
