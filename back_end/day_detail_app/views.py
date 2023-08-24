from django.shortcuts import render,get_object_or_404
from .models import Day_detail
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import DaySerializer
from time_detail_app.models import Time_detail
from plans_app.models import Plans
from trips_app.models import Trips
from plans_app.serializer import PlanSerializer
from trips_app.serializers import TripSerializer
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_201_CREATED

# Create your views here.
class all_days(APIView):
    def get(self,request,plan_name,trip_name):
        # auth user
        print("get all_days:")
        user = request.user
        plan = get_object_or_404(Plans,user = user,name=plan_name)        
        trip = get_object_or_404(Trips,plans = plan,name=trip_name)          
        days = Day_detail.objects.filter(trip = trip)             
        serialized_days = DaySerializer(days,many=True)
        return Response(serialized_days.data)
                
    def post(self,request,plan_name,trip_name):
        user = request.user
        plan = get_object_or_404(Plans,user = user,name=plan_name)
       
        trip = get_object_or_404(Trips,plans = plan,name=trip_name)
        
        request.data['trip'] = trip
        new_day = Day_detail(**request.data)
        new_day.full_clean()
        new_day.save()
        new_day = DaySerializer(new_day)
        
        return Response(new_day.data, status =HTTP_201_CREATED)
    
class a_day(APIView):
    def get_a_day(self,request,plan_name,trip_name,day_day):
        # auth user
        print("get all_days:")
        user = request.user
        plan = get_object_or_404(Plans,user = user,name=plan_name)
        trip = get_object_or_404(Trips,plans = plan,name=trip_name)
        day = get_object_or_404(Day_detail,trip = trip,day=day_day)        
        serialized_day = DaySerializer(day)
        return day
    def get(self,request,plan_name,trip_name,day_day):
        day = self.get_a_day(request,plan_name,trip_name,day_day)
        serialized_day = DaySerializer(day)
        return Response(serialized_day.data)
    
    def put(self,request,plan_name,trip_name,day_day):
        day = self.get_a_day(request,plan_name,trip_name,day_day)
        if 'day' in request.data and request.data["day"]:
            day.day = request.data["day"]
            day.full_clean()
            day.save()
            return Response(status=HTTP_204_NO_CONTENT)
        
    def delete(self,request,plan_name,trip_name,day_day):
        day = self.get_a_day(request,plan_name,trip_name,day_day)
        day.delete()
        return Response(status=HTTP_204_NO_CONTENT)
        
        

           