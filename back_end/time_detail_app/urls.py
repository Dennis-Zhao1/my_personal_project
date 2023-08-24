from django.urls import path,include
from .views import all_times,a_time

urlpatterns = [
    path('', all_times.as_view(),name="all_times"),
    path('<int:time_id>/', a_time.as_view(),name="a_time")
]
