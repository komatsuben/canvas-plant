from django.urls import path, re_path
from .views import index

urlpatterns = [
    path('', index, name='index'),
    path('plant', index, name='main'),
    path('success', index, name='success'),
    path('search', index, name='search'),

    # Catch-all route for React Router
    re_path(r'^plant/.*$', index, name='plant-catchall'),
]
