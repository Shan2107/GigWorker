from django.urls import path
from .views import export_transactions_csv


urlpatterns = [
    path('export/transactions/', export_transactions_csv, name='export-transactions'),
]