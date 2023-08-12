from django.shortcuts import render
from .models import Day_detail
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import DaySerializer


# Create your views here.
class all_days(APIView):
    def get(self,request):
        day = DaySerializer(Day_detail.objects.all(), many=True)
    
        return Response({'days': day.data})