from django.urls import path
from .views import CategorizeAPIView, ChatAPIView

urlpatterns = [
    path('categorize/', CategorizeAPIView.as_view(), name='categorize'),
    path('chat/', ChatAPIView.as_view(), name='chat'),
]

