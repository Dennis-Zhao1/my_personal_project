from django.shortcuts import render
from .models import Trips
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_201_CREATED
from .serializers import TripSerializer
from plans_app.models import Plans
from plans_app.serializer import PlanSerializer
from day_detail_app.models import Day_detail
from day_detail_app.serializers import DaySerializer

# Create your views here.
class all_trips(APIView):
    def get(self,request, plan_name):
        user = request.user
        plans = Plans.objects.filter(user = user)
        serialized_plans = PlanSerializer(plans,many=True)
        plan_names = [plan['name'] for plan in serialized_plans.data]
        if plan_name in plan_names:
            cur_plan = Plans.objects.get(name=plan_name)
            trips = Trips.objects.filter(plans = cur_plan)
            serialized_trips = TripSerializer(trips,many=True)
            
            for trip in serialized_trips.data:                
                day_details = Day_detail.objects.filter(trip = trip['id'])
                print("day_details",day_details)
                serialized_day = DaySerializer(day_details,many=True)
                trip["day_detail"] = serialized_day.data
        
            return Response({'trips': serialized_trips.data})
        else:
            return Response(status=404)
    
    def post(self,request,plan_name):
        plan = Plans.objects.get(name = plan_name)
        request.data["plans"] = plan
        new_trip = Trips(**request.data)
        new_trip.full_clean()
        new_trip.save()
        new_trip = TripSerializer(new_trip)
        return Response(new_trip.data, status = HTTP_201_CREATED)
    
class a_trip(APIView):
    def get_a_trip(self,request,plan_name,trip_name):
        user = request.user
        plans = Plans.objects.filter(user = user)
        serialized_plans = PlanSerializer(plans,many=True)
        plan_names = [plan['name'] for plan in serialized_plans.data]
        if plan_name in plan_names:
            cur_plan = Plans.objects.get(name=plan_name)
            trips = Trips.objects.filter(plans = cur_plan)
            print("trips: ",trips)
            serialized_trips = TripSerializer(trips,many=True)            
            for trip in serialized_trips.data:
                if trip_name == trip["name"]:
                    print("trip",trip)
                    day_details = Day_detail.objects.filter(trip = trip['id'])
                    print("day_details",day_details)
                    serialized_day = DaySerializer(day_details,many=True)
                    trip["day_detail"] = serialized_day.data
                    return trip
        
       
    def get(self,request,plan_name,trip_name):
        trip = self.get_a_trip(request,plan_name,trip_name)
        return Response(trip)
    
    def put(self,request,plan_name,trip_name):
        trip = self.get_a_trip(request,plan_name,trip_name)
        if trip:
            cur_trip = Trips.objects.get(name= trip_name)
            if 'name' in request.data and request.data["name"]:
                cur_trip.name = request.data["name"]
            if 'start_day' in request.data and request.data["start_day"]:
                cur_trip.start_day = request.data["start_day"]
            if 'end_day' in request.data and request.data["end_day"]:
                cur_trip.end_day = request.data["end_day"]
            cur_trip.full_clean()
            cur_trip.save()
            return Response(status=HTTP_204_NO_CONTENT)
        
    def delete(self,request,plan_name,trip_name):
        trip = self.get_a_trip(request,plan_name,trip_name)
        if trip:
            cur_trip = Trips.objects.get(name= trip_name)
            cur_trip.delete()
            return Response(status=HTTP_204_NO_CONTENT)