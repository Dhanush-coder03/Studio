# Velu Photography Studio - Fullstack Application

A modern, cinematic web application and administrative content management suite for Velu Photography Studio, built with React, Vite, Node.js, Express, and MongoDB, ready for deployment on Vercel.

---

## 📁 Project Structure

```text
Studio/
├── api/                  # Vercel serverless function entrypoint (fullstack monorepo)
│   └── index.js
├── backend/              # Node.js + Express + MongoDB REST API
│   ├── api/index.js      # Standalone Vercel serverless entrypoint
│   ├── src/
│   │   ├── config/       # MongoDB connection & pooling
│   │   ├── controllers/  # Image, Service, Gallery, Package, Contact controllers
│   │   ├── models/       # Mongoose schemas
│   │   ├── routes/       # Express route handlers
│   │   └── scripts/      # Database seeding scripts
│   ├── .env.example
│   ├── package.json
│   ├── server.js         # Local Express development server (Port 5000)
│   └── vercel.json       # Standalone backend Vercel configuration
├── frontend/             # React 19 + Vite frontend
│   ├── public/           # Static icons & assets
│   ├── src/
│   │   ├── assets/       # Studio photography images & icons
│   │   ├── components/   # UI components & Admin CMS modules
│   │   │   └── admin/    # Admin Overview, Images, Services, Gallery, Packages, Contacts, Settings
│   │   ├── context/      # StudioContext (Dual-mode: MongoDB REST API + localStorage fallback)
│   │   ├── pages/        # Home & Admin pages
│   │   ├── services/     # API client for backend integration
│   │   └── styles/       # CSS design system & animations
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── vercel.json       # Standalone frontend Vercel SPA rewrite config
│   └── vite.config.js    # Dev proxy to backend (http://localhost:5000)
├── package.json          # Root orchestration scripts
└── vercel.json           # Root fullstack Vercel deployment configuration
```

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
From the root directory:
```bash
npm run install:all
```
*(Or install separately with `npm install` inside `frontend/` and `backend/`)*

### 2. Configure Environment Variables
Inside `backend/`, copy `.env.example` to `.env`:
```bash
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/velu_studio?retryWrites=true&w=majority
NODE_ENV=development
```

### 3. Start Backend & Frontend
You can run either from root or from each respective directory:

**From root:**
- Start Backend: `npm run server:dev` (runs on http://localhost:5000)
- Start Frontend: `npm run dev` (runs on http://localhost:5173 with automatic `/api` proxy)
- Optional database seed: `npm run seed`

**Or individually:**
- `cd backend && npm run dev`
- `cd frontend && npm run dev`

---

## 🌐 Vercel Deployment Options

### Option A: Monorepo Deployment (Recommended)
1. Push this repository to GitHub.
2. Import the root repository in Vercel.
3. Vercel automatically reads `vercel.json`:
   - Builds `frontend/` into `frontend/dist`.
   - Routes `/api/*` to `api/index.js` (Serverless Function).
   - Routes all other traffic to `frontend/dist/index.html`.
4. Add the `MONGODB_URI` environment variable in Vercel Project Settings.

### Option B: Separate Frontend & Backend Deployments
- **Backend Deployment**:
  - In Vercel, set the **Root Directory** to `backend`.
  - Add `MONGODB_URI` under Environment Variables.
- **Frontend Deployment**:
  - In Vercel, set the **Root Directory** to `frontend`.
  - Set `VITE_API_URL` to your deployed backend URL (e.g. `https://your-backend.vercel.app`).

---

## ✨ Features

- **Cinematic Photography Experience**: Interactive camera viewports, aperture & focal lens simulations, portfolio reels, packages, services showcase, and booking modal.
- **Comprehensive Admin Suite (`/admin`)**:
  - 🖼️ **Images**: Upload, manage, filter, and tag studio images.
  - 🛠️ **Services**: Dynamic service catalog, descriptions, icons, and categories.
  - 📸 **Gallery Reel**: Curated photo gallery with category filters and aspect ratio controls.
  - 📦 **Packages**: Pricing tiers, included deliverables, and popular tags.
  - 📬 **Contact Leads & Inquiries**: Real-time client inquiries tracker with status updates (New, Contacted, Booked, Completed).
  - ⚙️ **Studio Settings**: Studio name, phone, email, address, working hours, and social media links.
- **Resilient Offline / Fallback Architecture**: `StudioContext` connects to MongoDB via REST API, automatically falling back to browser storage if the database is offline or unconfigured.
