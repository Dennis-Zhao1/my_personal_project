from rest_framework import serializers
from .models import Time_detail
# from day_detail_app.serializers import DaySerializer

class TimeSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Time_detail
        fields = ['id','time','description']