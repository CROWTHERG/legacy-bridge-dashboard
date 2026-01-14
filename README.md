# Legacy Bridge Dashboard 🌉

A modern inventory modernization project that bridges a **Legacy SQL-style data structure** with a **Modern Full-Stack Architecture**. This application allows businesses to view their inventory data through a responsive, cloud-hosted interface.

## 🚀 Live Demo
- **Frontend:** [INSERT_YOUR_VERCEL_URL_HERE]
- **API Status:** [INSERT_YOUR_RENDER_URL_HERE/api/products]

## 🛠️ The Tech Stack
- **Frontend:** React.js (Hooks, Axios, Responsive Design)
- **Backend:** Python FastAPI (RESTful API, CORS Middleware)
- **Hosting:** Vercel (Frontend) & Render (Backend)
- **Data Architecture:** JSON-based persistence (Bridgeable to MySQL/PostgreSQL)

## 💡 The "Bridge" Strategy
Many local businesses (pharmacies, retail shops) use older SQL databases that are only accessible on-site. This project demonstrates how to:
1.  Wrap a legacy data source with a **Python FastAPI** layer.
2.  Expose secure endpoints to the internet.
3.  Build a **React** frontend that works on mobile phones, allowing business owners to check stock from anywhere.

## 📱 Mobile Responsive
The dashboard is designed for the Nigerian market, where mobile-first access is critical. It features:
- Horizontal scroll protection for data tables.
- Lightweight API calls for slower network connections.
- Clean, professional UI using standard CSS-in-JS.

## 🔧 Installation & Local Setup

### Backend (Python)
1. Navigate to `/backend_python`
2. Install dependencies: `pip install fastapi uvicorn`
3. Start the server: `uvicorn main:app --reload`

### Frontend (React)
1. Navigate to `/frontend_react`
2. Install dependencies: `npm install`
3. Start the app: `npm start`

## 👤 Author
**Crowther**
Full-Stack Developer focused on Modernizing Legacy Systems.
