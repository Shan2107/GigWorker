from django.urls import path
from . import views

urlpatterns = [
    # Example endpoint
    path('', views.hello_incidents, name='hello-incidents'),
]
