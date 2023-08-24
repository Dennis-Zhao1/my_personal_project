from django.shortcuts import render,get_object_or_404
from .models import Time_detail
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import TimeSerializer
from plans_app.models import Plans
from trips_app.models import Trips
from day_detail_app.models import Day_detail
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_201_CREATED

# Create your views here.
class all_times(APIView):
    def get(self,request,plan_name,trip_name,day_day):
        user = request.user
        plan = get_object_or_404(Plans,user=user,name=plan_name)
        trip = get_object_or_404(Trips,plans=plan,name=trip_name)
        day = get_object_or_404(Day_detail,trip=trip,day=day_day)
        times = Time_detail.objects.filter(day = day)        
        
        serialized_times = TimeSerializer(times,many=True)
    
        return Response(serialized_times.data)
    
    def post(self,request,plan_name,trip_name,day_day):
        user = request.user
        plan = get_object_or_404(Plans,user=user,name=plan_name)
        trip = get_object_or_404(Trips,plans=plan,name=trip_name)
        day = get_object_or_404(Day_detail,trip=trip,day=day_day)
        request.data['day'] = day
        new_time = Time_detail(**request.data)
        new_time.full_clean()
        new_time.save()
        
        new_time = TimeSerializer(new_time)
        return Response(new_time.data,status=HTTP_201_CREATED)
    
    
class a_time(APIView):
    def get_a_time(self,request,plan_name,trip_name,day_day,time_id):
        user = request.user
        plan = get_object_or_404(Plans,user=user,name=plan_name)
        trip = get_object_or_404(Trips,plans=plan,name=trip_name)
        day = get_object_or_404(Day_detail,trip=trip,day=day_day)
        times = get_object_or_404(Time_detail,day = day,id=time_id) 
        return times
    
    def get(self,request,plan_name,trip_name,day_day,time_id):
        cur_time = self.get_a_time(request,plan_name,trip_name,day_day,time_id)
        cur_time = TimeSerializer(cur_time)
        return Response(cur_time.data)
    
    def put(self,request,plan_name,trip_name,day_day,time_id):
        cur_time = self.get_a_time(request,plan_name,trip_name,day_day,time_id)
        if 'time' in request.data and request.data["time"]:
            cur_time.time = request.data["time"]
        if 'description' in request.data and request.data["description"]:
            cur_time.description = request.data["description"]
        cur_time.full_clean()
        cur_time.save()
        return Response(status=HTTP_204_NO_CONTENT)
    
    def delete(self,request,plan_name,trip_name,day_day,time_id):
        cur_time = self.get_a_time(request,plan_name,trip_name,day_day,time_id)
        cur_time.delete()
        return Response(status=HTTP_204_NO_CONTENT)