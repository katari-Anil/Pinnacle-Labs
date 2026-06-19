# 📝 Cloud-Inspired Attendance Tracking System

A sleek, modern, and responsive **Attendance Tracking System** built using **HTML5, CSS3 (Glassmorphic UI Design)**, and **Vanilla JavaScript**.  
The system runs entirely in the browser using **Local Storage**, requiring no backend or external dependencies.

---

## 👤 Developer & Live Demo

- **Developer:** Katari Anil  
- **Live Demo:** https://pinnacle-labs-phi.vercel.app/

---

## 🚀 Key Features

### 📊 Dashboard (Real-Time Monitoring)
- Live tracking of total members, present, and absent count
- One-click **Check-In / Check-Out** system
- Automatic timestamp recording for attendance actions
- Instant UI updates without page reload

### 👥 Roster Management System
- Add and remove members dynamically
- Prevents duplicate entries automatically
- Clean and simple user management interface
- Persistent storage using Local Storage

### 📅 Attendance Logs (History Engine)
- View past attendance records by date
- Search and filter records instantly
- Clear present/absent status indicators
- Historical tracking of all attendance activity

---

## 🧠 Tech Stack

- HTML5
- CSS3 (Glassmorphism UI Design)
- JavaScript (Vanilla ES6)
- Local Storage API

---

## 📁 Project Structure

```text
AttendanceSystem/
│
├── index.html              # Dashboard (Main Panel)
├── roster.html             # Member Management System
├── logs.html               # Attendance History Viewer
│
├── css/
│   └── style.css           # Glassmorphic UI Styling
│
└── js/
    ├── app.js              # Core Local Storage & Shared Logic
    ├── dashboard.js        # Attendance Actions & Metrics
    ├── roster.js           # Member CRUD Operations
    └── logs.js             # History Filtering System