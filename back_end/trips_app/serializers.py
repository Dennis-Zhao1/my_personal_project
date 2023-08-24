from rest_framework import serializers
from .models import Trips
# from plans_app.serializer import PlanSerializer

class TripSerializer(serializers.ModelSerializer):
    # plans = PlanSerializer()
    class Meta:
        model = Trips
        fields = ['id','name','start_day','end_day']