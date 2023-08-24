from django.shortcuts import render,get_object_or_404
from .models import Plans
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import PlanSerializer
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_201_CREATED
from trips_app.models import Trips
from trips_app.serializers import TripSerializer
from day_detail_app.models import Day_detail
from day_detail_app.serializers import DaySerializer
from time_detail_app.models import Time_detail
from time_detail_app.serializers import TimeSerializer


# Create your views here.
class all_plans(APIView):
    def get(self,request):
        user = request.user        
        plans = Plans.objects.filter(user=user.id) 
        serializer_plans = PlanSerializer(plans,many=True)  
      
        for plan in serializer_plans.data:            
            plan_id = plan['id']            
            trips = Trips.objects.filter(plans = plan_id)           
            serializer_tirps = TripSerializer(trips,many=True)
            
            for trip in serializer_tirps.data:
                trip_id = trip["id"]
                days = Day_detail.objects.filter(trip = trip_id)
                serialized_days = DaySerializer(days,many=True)
                
                for day in serialized_days.data:
                    day_id = day["id"]
                    times = Time_detail.objects.filter(day = day_id)
                    serialized_times = TimeSerializer(times,many=True)
                    day["times"] = serialized_times.data                
                
                trip["day_detail"] = serialized_days.data            
            
            plan["trips"] = serializer_tirps.data 
          
        return Response({'plans': serializer_plans.data})
    
    def post(self,request):
        user = request.user
        request.data["user"] = user
        new_plan = Plans(**request.data)
        new_plan.full_clean
        new_plan.save()
        new_plan = PlanSerializer(new_plan)
        
        return Response(new_plan.data,status = HTTP_201_CREATED)
    
    
class a_plan(APIView):
    def get_a_plan(self,request,plan_name):
        user = request.user
        plan = get_object_or_404(Plans,name = plan_name, user = user)
        return plan
    
    def get(self,request,plan_name):        
        plan =self.get_a_plan(request,plan_name)
        return Response(PlanSerializer(plan).data)
    
    def put(self,request,plan_name):
        plan = self.get_a_plan(request,plan_name)
        if 'name' in request.data and request.data["name"]:
            plan.name = request.data["name"]
            plan.full_clean()
            plan.save()
            return Response(status=HTTP_204_NO_CONTENT)
        else:
            return Response("plan name change fail, did not find the name in the request",status = 404)
        
    def delete(self,request,plan_name):
        plan = self.get_a_plan(request,plan_name)
        plan.delete()
        return Response(status=HTTP_204_NO_CONTENT)
