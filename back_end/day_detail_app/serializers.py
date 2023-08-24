from rest_framework import serializers
from .models import Day_detail



class DaySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Day_detail
        fields = ['id','day']