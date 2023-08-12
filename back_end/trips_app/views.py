from django.shortcuts import render
from .models import Trips
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import TripSerializer


# Create your views here.
class all_trips(APIView):
    def get(self,request):
        trip = TripSerializer(Trips.objects.all(), many=True)
    
        return Response({'trips': trip.data})