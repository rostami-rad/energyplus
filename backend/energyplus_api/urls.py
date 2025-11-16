"""
URL configuration for energyplus_api app.
"""
from django.urls import path
from . import views

app_name = 'energyplus_api'

urlpatterns = [
    path('simulation/run', views.run_simulation, name='run_simulation'),
    path('simulation/history', views.simulation_history, name='simulation_history'),
    path('health', views.health_check, name='health_check'),
]

