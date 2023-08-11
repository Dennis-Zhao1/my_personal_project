from django.shortcuts import render
from .models import Plans
from rest_framework.views import APIView
from rest_framework.response import Response


# Create your views here.
class all_plans(APIView):
    def get(self,request):
    
        return Response(True)