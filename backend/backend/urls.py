from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def home(request):
    return HttpResponse("GigWorker backend is running")

urlpatterns = [
    path("", home),  # root URL
    path("admin/", admin.site.urls),
    path("api/accounts/", include("accounts.urls")),
]