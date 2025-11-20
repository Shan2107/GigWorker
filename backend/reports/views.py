from django.shortcuts import render

# Create your views here.
import csv
from django.http import HttpResponse
from finance.models import Transaction


def export_transactions_csv(request):
    user = request.user
    transactions = Transaction.objects.filter(account__user=user)
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="transactions.csv"'


    writer = csv.writer(response)
    writer.writerow(['date','account','amount','description','category'])
    for t in transactions:
        writer.writerow([t.date, t.account.name, t.amount, t.description, t.category])
    return response