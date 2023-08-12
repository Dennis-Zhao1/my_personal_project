from django.shortcuts import render
from .models import Time_detail
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import TimeSerializer

# Create your views here.
class all_times(APIView):
    def get(self,request):
        time = TimeSerializer(Time_detail.objects.all(), many=True)
    
        return Response({'times': time.data})