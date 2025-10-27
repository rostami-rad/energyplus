# Setup Instructions - Copy & Paste Commands

## Complete Step-by-Step Setup

Follow these commands in order. Copy and paste each one into your terminal.

---

## **Terminal 1: Backend Setup**

```powershell
cd C:\Users\pctoday\Desktop\energyplus-chat\backend
```

```powershell
python -m venv .venv
```

```powershell
.venv\Scripts\activate
```

```powershell
pip install -r requirements.txt
```

```powershell
python manage.py migrate
```

```powershell
python manage.py runserver
```

**✅ Keep this terminal open!** The backend will be running on http://localhost:8000

---

## **Terminal 2: Frontend Setup** (Open a NEW terminal)

```powershell
cd C:\Users\pctoday\Desktop\energyplus-chat\frontend
```

```powershell
npm install
```

```powershell
npm run dev
```

**✅ Keep this terminal open!** The frontend will be running on http://localhost:3000

---

## **Access the Application**

Open your browser and go to: **http://localhost:3000**

---

## **How to Use**

1. Type a message in the chat box, for example:
   - "Run simulation for my building"
   - "Calculate energy consumption"
   - "Analyze building energy usage"

2. Click **Send** or press **Enter**

3. Wait for the simulation to complete (shows loading spinner)

4. View results:
   - Chat response with energy breakdown
   - Right sidebar with:
     - Energy summary statistics
     - Interactive bar chart
     - Detailed energy by category

---

## **Troubleshooting**

### Backend Errors

If you get an error about Django:
```powershell
pip install --upgrade pip
pip install -r requirements.txt
```

### Frontend Errors

If npm install fails:
```powershell
npm cache clean --force
npm install
```

### Port Already in Use

If port 8000 or 3000 is in use:
- Backend: Use port 8001: `python manage.py runserver 8001`
- Frontend: Use port 3001: `npm run dev -p 3001`

Update frontend `.env.local` if using different backend port.

---

## **Optional: Install EnergyPlus**

The app works with mock data by default. To run real EnergyPlus simulations:

1. Download: https://energyplus.net/downloads
2. Install to: `C:/EnergyPlusV24-1-0`
3. Restart the backend server
4. The app will automatically detect and use EnergyPlus

**Note:** Mock data is realistic and demonstrates all features perfectly!

---

## **What You'll See**

### Backend Terminal
```
Starting development server at http://127.0.0.1:8000/
```

### Frontend Terminal
```
 ▲ Next.js 15.0.0
 - Local:        http://localhost:3000
```

### Browser
- Modern chat interface
- Dark theme
- Energy consumption visualizations
- Interactive charts

---

## **Project Features**

✅ Complete chat interface with message history  
✅ EnergyPlus simulation integration (auto-detects or uses mock data)  
✅ Interactive data visualizations with Recharts  
✅ Energy breakdown by category (Cooling, Heating, Lighting, Equipment, Ventilation)  
✅ Loading states and error handling  
✅ Responsive design  
✅ Professional UI with dark theme  

---

## **Ready to Test!**

1. ✅ Both terminals running
2. ✅ Browser open at http://localhost:3000
3. ✅ Type a message in the chat
4. ✅ See results appear

**Enjoy your EnergyPlus Chat Interface! 🎉**

