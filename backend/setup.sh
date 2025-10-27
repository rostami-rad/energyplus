#!/bin/bash
# Setup script for backend

echo "Setting up EnergyPlus Chat Backend..."

# Create virtual environment if it doesn't exist
if [ ! -d ".venv" ]; then
    echo "Creating virtual environment..."
    python -m venv .venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source .venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Run migrations
echo "Running database migrations..."
python manage.py migrate

# Create simulation directories if they don't exist
echo "Creating simulation directories..."
mkdir -p simulations/inputs simulations/outputs

echo "Backend setup complete!"
echo "Run 'python manage.py runserver' to start the server"

