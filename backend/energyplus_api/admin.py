from django.contrib import admin

from .models import SimulationRun


@admin.register(SimulationRun)
class SimulationRunAdmin(admin.ModelAdmin):
    list_display = (
        'simulation_id',
        'message',
        'total_energy',
        'used_mock_data',
        'created_at',
    )
    list_filter = ('used_mock_data', 'created_at')
    search_fields = ('simulation_id', 'message', 'idf_file')
    readonly_fields = ('created_at',)
