from django.db import models


class SimulationRun(models.Model):
    """Stores metadata and results for each simulation request."""

    simulation_id = models.CharField(max_length=64, unique=True)
    message = models.TextField()
    idf_file = models.CharField(max_length=255, blank=True)
    used_mock_data = models.BooleanField(default=False)
    total_energy = models.FloatField()
    energy_by_type = models.JSONField()
    energy_breakdown = models.JSONField()
    additional_info = models.JSONField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self) -> str:
        return f"{self.simulation_id} - {self.total_energy} kWh"
