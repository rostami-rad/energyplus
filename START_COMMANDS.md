# Commands to Start the Application

## 🚀 Step-by-Step Commands (Copy & Paste)

---

## **Terminal 1: Backend** (Open First)

Copy these commands one by one:

```powershell
cd C:\Users\pctoday\Desktop\energyplus-chat\backend
```

```powershell
.venv\Scripts\activate
```

```powershell
python manage.py runserver
```

**✅ Keep this terminal open!** Backend is now running on http://localhost:8000

---

## **Terminal 2: Frontend** (Open New Terminal)

Open a NEW PowerShell window and paste:

```powershell
cd C:\Users\pctoday\Desktop\energyplus-chat\frontend
```

```powershell
npm install
```

```powershell
npm run dev
```

**✅ Keep this terminal open!** Frontend is now running on http://localhost:3000

---

## 🌐 Access the Application

Open your browser and go to:
### **http://localhost:3000**

---

## 💬 What to Type in the Chat Box

Once you see the chat interface, try any of these messages:

### Sample Messages (Copy & Paste):

```
Run simulation for my building
```

```
Calculate energy consumption for an office building
```

```
Analyze building energy usage
```

```
Run EnergyPlus simulation now
```

```
Show me energy data for a commercial building
```

### Expected Output:
1. **You'll see your message** appear in the chat
2. **Loading spinner appears** - "Running simulation..."
3. **AI responds** with energy breakdown
4. **Results panel opens** on the right with:
   - Energy summary (Total: X kWh)
   - Interactive bar chart
   - Energy breakdown by category

---

## 🎯 Additional Features to Try

### 1. **Download Results**
- After simulation completes
- Click the 📥 download icon in results panel
- CSV file downloads automatically

### 2. **Upload Custom IDF**
- Click "Upload IDF" button in header
- Choose .idf file OR paste content
- Click "Use This IDF"
- Run simulation

### 3. **Toggle Theme**
- Click sun/moon icon (☀️/🌙) in header
- Switch between dark and light themes

---

## 📋 Complete Example Flow

1. **Start backend** (Terminal 1)
   ```powershell
   cd backend
   .venv\Scripts\activate
   python manage.py runserver
   ```

2. **Start frontend** (Terminal 2 - new window)
   ```powershell
   cd frontend
   npm install
   npm run dev
   ```

3. **Open browser**: http://localhost:3000

4. **Type in chat box**:
   ```
   Run simulation for my building
   ```

5. **Press Enter** or click Send

6. **Wait** 2-3 seconds for simulation

7. **See results** appear with charts and data!

---

## ⚠️ Troubleshooting

### If backend won't start:
```powershell
pip install -r requirements.txt
python manage.py migrate
```

### If frontend won't start:
```powershell
npm install --force
npm run dev
```

### If port is in use:
- Backend: Use port 8001 → `python manage.py runserver 8001`
- Frontend: Use port 3001 → Update `.env.local`

---

## 🎉 You're Ready!

Once both terminals show:
- ✅ Backend: "Starting development server at http://127.0.0.1:8000/"
- ✅ Frontend: "▲ Next.js" with "Local: http://localhost:3000"

**Open http://localhost:3000 and start chatting!** 🚀

