from django.urls import path
from .views import RegisterView   # make sure RegisterView exists in accounts/views.py

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
]