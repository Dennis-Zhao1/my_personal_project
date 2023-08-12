from rest_framework import serializers
from .models import Day_detail
from trips_app.serializers import TripSerializer

class DaySerializer(serializers.ModelSerializer):
    trip = TripSerializer()
    class Meta:
        model = Day_detail
        fields = ['id','day','trip']