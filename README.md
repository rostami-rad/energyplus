# EnergyPlus Chat Interface

Chat interface for running EnergyPlus building energy simulations.

## Quick Start

**Backend:**
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate  # Windows (use source .venv/bin/activate on Linux/Mac)
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

**Frontend (in another terminal):**
```bash
cd frontend
npm install
npm run dev
```

Then open http://localhost:3000

## What it does

Type a message like "Run simulation for office building" and the app will run an EnergyPlus simulation (or use mock data if EnergyPlus isn't installed) and show you the results with charts.

## Features

- Chat interface for simulations
- Energy consumption charts
- Simulation history
- Download results as CSV
- Upload custom IDF files
- Dark/light theme

## EnergyPlus

The app works without EnergyPlus installed - it'll use mock data. If you want real simulations, install EnergyPlus from https://energyplus.net/downloads and the app will auto-detect it. Or set the `ENERGYPLUS_HOME` environment variable.

## API

- `POST /api/simulation/run` - Run a simulation (body: `{"message": "...", "idf_content": "..."}`)
- `GET /api/simulation/history?limit=20` - Get recent simulations

## Tech Stack

Backend: Django 5.0.6, Django REST Framework  
Frontend: Next.js 15, React 19, TypeScript, Tailwind CSS, Recharts

## Notes

- Uses default IDF file if none specified
- History limited to 100 most recent runs
- Error handling could be better in some cases
