"""
API views for EnergyPlus simulation endpoints.
"""
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .services import EnergyPlusService
from .models import SimulationRun


@api_view(['POST'])
@csrf_exempt
def run_simulation(request):
    """Run an EnergyPlus simulation."""
    try:
        data = request.data if hasattr(request, 'data') else json.loads(request.body)
        user_message = data.get('message', 'Run simulation')
        idf_content = data.get('idf_content', None)
        
        service = EnergyPlusService()
        results = service.run_simulation(user_message, idf_content=idf_content)
        
        # TODO: Maybe add cleanup job for old simulations
        SimulationRun.objects.create(
            simulation_id=results.get("simulation_id", "unknown"),
            message=user_message,
            idf_file=results.get("idf_file", ""),
            used_mock_data=results.get("used_mock_data", False),
            total_energy=results["total_energy"],
            energy_by_type=results.get("energy_by_type", {}),
            energy_breakdown=results.get("energy_breakdown", []),
            additional_info=results.get("additional_info"),
        )

        return Response({
            "status": "success",
            "simulation_id": results.get("simulation_id", "unknown"),
            "message": "Simulation completed successfully",
            "results": results
        }, status=status.HTTP_200_OK)
        
    except FileNotFoundError as e:
        return Response(
            {
                "status": "error",
                "message": f"IDF file not found: {str(e)}"
            },
            status=status.HTTP_404_NOT_FOUND
        )
        
    except Exception as e:
        return Response(
            {
                "status": "error",
                "message": f"Simulation failed: {str(e)}"
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
def health_check(request):
    """Basic health check."""
    return Response({"status": "ok"}, status=status.HTTP_200_OK)


@api_view(['GET'])
def simulation_history(request):
    """Return recent simulation runs."""
    try:
        limit = int(request.query_params.get('limit', 20))
    except ValueError:
        limit = 20

    # Cap at 100 to avoid performance issues
    limit = max(1, min(limit, 100))

    runs = SimulationRun.objects.all()[:limit]
    data = [
        {
            "simulation_id": run.simulation_id,
            "message": run.message,
            "idf_file": run.idf_file,
            "used_mock_data": run.used_mock_data,
            "total_energy": run.total_energy,
            "energy_by_type": run.energy_by_type,
            "energy_breakdown": run.energy_breakdown,
            "additional_info": run.additional_info,
            "created_at": run.created_at.isoformat(),
        }
        for run in runs
    ]

    return Response(
        {
            "count": len(data),
            "results": data,
        },
        status=status.HTTP_200_OK,
    )
