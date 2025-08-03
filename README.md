# 🎉 EventHere

EventHere is a full-stack event discovery and ride-sharing web app. Users can explore local events, join them, offer/request rides, and communicate with other participants in real-time.

## 🚀 Tech Stack

### Frontend (React + Vite)
- React.js
- Vite
- Tailwind CSS
- Redux Toolkit
- Firebase Auth
- Socket.io
- Lottie for animations

### Backend (Node.js + Express)
- Express.js
- MongoDB (with Mongoose)
- JWT authentication
- Firebase Admin SDK
- Socket.io for chat & real-time updates

### DevOps
- Docker & Docker Compose
- Vercel (for frontend deployment)
- MongoDB Atlas

---

## 📁 Folder Structure

```
backend/         - Express server with API routes & models
frontend/        - React frontend (Vite + Tailwind + Redux)
docker-compose.yml - Spins up both backend and frontend
```

---

## 🧪 Setup Instructions (Local Dev)

### 1. Clone the Repository

```bash
git clone https://github.com/Ireshudayanga/EventHere.git
cd EventHere
```

---

### 2. Setup Environment Variables

You need two `.env` files:

#### Backend: `backend/.env`
```env
PORT=5000
DB_USER=your_db_user
DB_PASSWORD=your_db_password

JWT_SECRET=your_jwt_secret

TYPE=...
PROJECT_ID=...
PRIVATE_KEY_ID=...
PRIVATE_KEY=...
CLIENT_EMAIL=...
CLIENT_ID=...
AUTH_URI=...
TOKEN_URI=...
AUTH_PROVIDER_CERT_URI=...
CLIENT_CERT_URI=...

FRONTEND_ORIGINS=http://localhost:5173
```

#### Frontend: `frontend/.env`
```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

---

### 3. Run with Docker (Recommended)
```bash
docker-compose up --build
```

If you want to run manually:

#### Backend
```bash
cd backend
npm install
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## ✨ Features

- 🔐 Firebase Authentication
- 📅 Event creation/joining with live map view
- 🚗 Ride sharing & smart ride matching
- 💬 Real-time admin chat with users
- 📊 Admin dashboard & event analytics
- ⚠️ User banning/suspension controls
- 🔄 Live location updates using Socket.io

---

## 🛠️ Technologies Used

| Area        | Tech Stack                           |
|-------------|--------------------------------------|
| Frontend    | React, Tailwind, Redux Toolkit, Vite |
| Backend     | Node.js, Express.js, MongoDB         |
| Auth        | Firebase Auth + JWT                  |
| Real-time   | Socket.io                            |
| DevOps      | Docker, Vercel, MongoDB Atlas        |

---

## 📄 License

This project is licensed under the MIT License.


## 🙌 Author

**Iresh Udayanga**  
Made with ❤️ by [@Ireshudayanga](https://github.com/Ireshudayanga) | [LinkedIn](https://www.linkedin.com/in/iresh-udayanga/)
