from django.urls import path
from .views import *

urlpatterns = [
    # GET
    path('user/', GetUser.as_view(), name='get_user'),
    path('transaction/', GetTransaction.as_view(), name='get_transaction'),
    path('donation/', GetTree.as_view(), name='get_tree'),
    path('search/', GetSearch.as_view(), name='get_search'),
    # POST
    path('transaction/post', PostTransaction.as_view(), name='post_transaction'),
    # Leaderboard
    path('leaderboard/tree', GetMostTree.as_view(), name='leaderboard_user'),
    path('leaderboard/recent', GetMostRecent.as_view(), name='leaderboard_transaction'),
]
