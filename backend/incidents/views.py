from django.http import JsonResponse

def hello_incidents(request):
    return JsonResponse({"message": "Incidents app works!"})
