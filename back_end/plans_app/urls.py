from django.urls import path,include
from .views import all_plans,a_plan

urlpatterns = [
    path('', all_plans.as_view(),name="all_plans"),
    path('<str:plan_name>/', a_plan.as_view(),name="a_plan"),
    path('<str:plan_name>/trips/', include("trips_app.urls") ),
]

