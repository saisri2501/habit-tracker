# 🌱 Habit Tracker (React + PWA)

A **modern Habit Tracker** built with **React (Vite)**, **TailwindCSS v4**, **IndexedDB**, and **Chart.js**.  
Track your daily habits, mark completions, and visualize your progress with a 7-day progress chart.  
The app is also a **PWA (Progressive Web App)** — you can install it on desktop or mobile 📱💻.

---

## ✨ Features
- ➕ **Add Habits** with name & description
- ✅ **Mark Done** for today (persists in local IndexedDB)
- 📊 **Progress Chart** showing last 7 days completions
- 🗑️ **Delete Habits** anytime
- 🎨 **Modern UI** built with TailwindCSS
- 📦 **Offline-ready** with PWA support (can be installed)

---

## 🛠️ Tech Stack
- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- [TailwindCSS v4](https://tailwindcss.com/)
- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) (via [`idb`](https://www.npmjs.com/package/idb))
- [Chart.js](https://www.chartjs.org/) + [react-chartjs-2](https://react-chartjs-2.js.org/)
- [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)

---

## 📂 Project Structure
habit-tracker/
├── public/
│ ├── icon-192.png
│ ├── icon-512.png
├── src/
│ ├── components/
│ │ ├── AddHabitModal.jsx
│ │ ├── HabitCard.jsx
│ │ ├── ProgressChart.jsx
│ ├── db.js
│ ├── App.jsx
│ ├── main.jsx
│ ├── index.css
├── vite.config.js
├── package.json
