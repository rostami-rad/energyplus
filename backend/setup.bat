@echo off
REM Setup script for backend on Windows

echo Setting up EnergyPlus Chat Backend...

REM Create virtual environment if it doesn't exist
if not exist .venv (
    echo Creating virtual environment...
    python -m venv .venv
)

REM Activate virtual environment
echo Activating virtual environment...
call .venv\Scripts\activate.bat

REM Install dependencies
echo Installing dependencies...
pip install -r requirements.txt

REM Run migrations
echo Running database migrations...
python manage.py migrate

REM Create simulation directories if they don't exist
echo Creating simulation directories...
if not exist simulations\inputs mkdir simulations\inputs
if not exist simulations\outputs mkdir simulations\outputs

echo Backend setup complete!
echo Run 'python manage.py runserver' to start the server

