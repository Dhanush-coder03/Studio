# Velu Photography Studio - Node.js & MongoDB Backend

A modular Node.js & Express REST API powered by MongoDB (Mongoose), designed specifically for seamless local development and serverless deployment on **Vercel**.

---

## 📁 Architecture Overview

```
Studio/
├── api/
│   └── index.js              # Root serverless handler for fullstack Vercel deployment
├── backend/
│   ├── api/
│   │   └── index.js          # Standalone serverless handler
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js         # Mongoose connection with Vercel serverless caching & pooling
│   │   ├── controllers/      # Route controllers (Images, Services, Gallery, Packages, Contacts, Seed)
│   │   ├── models/           # Mongoose schemas (Image, Service, GalleryItem, Package, ContactInfo, Inquiry)
│   │   ├── routes/           # Express routers
│   │   ├── data/             # Default initial seed data
│   │   └── app.js            # Express app configuration & middleware
│   ├── server.js             # Standalone local dev server
│   ├── .env.example          # Environment variables template
│   ├── vercel.json           # Standalone Vercel deployment config
│   └── package.json
├── vercel.json               # Fullstack Vercel deployment config
└── vite.config.js            # Dev proxy for /api -> http://localhost:5000
```

---

## 🚀 Running Locally

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/velu_studio?retryWrites=true&w=majority
NODE_ENV=development
CORS_ORIGIN=*
```
> **Note**: If `MONGODB_URI` is not set or local MongoDB is not running, the server gracefully runs in fallback mode and informs you via the health check endpoint.

### 3. Start Server
From the root workspace:
```bash
npm run server
# or auto-reloading watch mode:
npm run server:dev
```
Or from inside `backend/`:
```bash
npm run dev
```

Local server endpoints:
- API Base: `http://localhost:5000/api`
- Health check: `http://localhost:5000/api/health`

---

## ☁️ Deploying to Vercel

### Option A: Deploy the Entire Repository (Recommended Fullstack)
1. Push your repository to GitHub.
2. In the [Vercel Dashboard](https://vercel.com/dashboard), click **"Add New Project"** and select this repository.
3. Keep default settings (Framework: Vite).
4. Under **Environment Variables**, add:
   - `MONGODB_URI`: Your MongoDB Atlas connection string (`mongodb+srv://...`)
   - `NODE_ENV`: `production`
5. Click **Deploy**. Vercel will build the frontend and serve all `/api/*` endpoints via serverless execution defined in `vercel.json` and `api/index.js`!

### Option B: Deploy Only the `backend/` Folder (Standalone Backend)
1. In Vercel, import the repository and set the **Root Directory** to `backend`.
2. Add your `MONGODB_URI` in **Environment Variables**.
3. Deploy! Vercel uses `backend/vercel.json` and `backend/api/index.js`.

---

## 📡 API Endpoints

### 1. Media & Images
- `GET /api/images` - List all images (supports `?category=Wedding` & `?search=query`)
- `POST /api/images` - Upload/create image `{ title, url, category, caption }`
- `DELETE /api/images/:id` - Delete an image

### 2. Services
- `GET /api/services` - List services (supports `?featured=true` & `?category=Pre-Wedding`)
- `GET /api/services/:id` - Get single service
- `POST /api/services` - Create service `{ title, category, image, priceStarting, description, detailedInfo, features, isFeatured }`
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### 3. Gallery Showcase
- `GET /api/gallery` - List portfolio items (supports `?category=Traditional`)
- `POST /api/gallery` - Add gallery item `{ title, category, image, client, location, year, description, isFeatured }`
- `PUT /api/gallery/:id` - Update gallery item
- `DELETE /api/gallery/:id` - Delete gallery item

### 4. Pricing Packages
- `GET /api/packages` - List pricing packages
- `POST /api/packages` - Create package `{ name, badge, price, period, description, deliverablesSummary, features, isPopular }`
- `PUT /api/packages/:id` - Update package
- `DELETE /api/packages/:id` - Delete package

### 5. Contact Info & Client Inquiries
- `GET /api/contact/info` - Get Studio contact details
- `PUT /api/contact/info` - Update Studio contact details
- `GET /api/contact/inquiries` - List client inquiries (supports `?status=New` & `?search=name`)
- `POST /api/contact/inquiries` - Submit booking inquiry `{ name, phone, email, weddingDate, eventType, location, message }`
- `PUT /api/contact/inquiries/:id/status` - Update status `{ status: 'Contacted' | 'Booked' | 'Archived' }`
- `DELETE /api/contact/inquiries/:id` - Delete inquiry

### 6. Seeding & Health Check
- `POST /api/seed` - Populate database with default studio content `{ force: true }`
- `GET /api/health` - Check API and MongoDB connection status
