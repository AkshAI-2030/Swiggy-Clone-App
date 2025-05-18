# 🛵 Swiggy Clone 🍔

A full-stack food ordering web application inspired by Swiggy. This clone allows users to browse restaurants, view menus, add items to a cart, and save their cart. Built using the **MERN stack** (MongoDB, Express, React, Node.js) with Redux Toolkit for state management.

---
## 🚀 Live Deployed URL: https://swiggy-clone-app-frontend.onrender.com/login

## 🚀 Features

- 🔐 User Authentication (Register/Login)
- 🏠 Restaurant Listing & Menu Page
- 🛒 Add to Cart with Quantity Control
- 💾 Save Cart to Database (Persistent Saved Cart)
- 📱 Fully Responsive UI
- ⚙️ JWT Protected Backend APIs

---

## 📸 Screenshots

### 🔐 Login Page
<img width="1431" alt="Image" src="https://github.com/user-attachments/assets/67dd0699-03db-4b22-83f1-ced688f35cdb" />

### 📝 Register Page
<img width="1440" alt="Image" src="https://github.com/user-attachments/assets/2e6b7132-1189-4f0e-82d5-6e43a6bd3c42" />

### 🏠 Home / Restaurant Listing
<img width="1438" alt="Image" src="https://github.com/user-attachments/assets/858e654d-896a-4f3b-a0b1-704282953cbf" />

### 🛒 Cart Page
<img width="1433" alt="Image" src="https://github.com/user-attachments/assets/84a1657d-6a65-4054-86cd-ae31c741e1a9" />

### 💾 Saved Cart
<img width="1426" alt="Image" src="https://github.com/user-attachments/assets/58445462-f6c5-44e7-a3ef-6ed55dfc953d" />

### 🍱 Menu
<img width="1437" alt="Image" src="https://github.com/user-attachments/assets/6f9ede7f-d262-4701-95a3-f993d3eaa183" />

---

## 🛠️ Tech Stack

**Frontend:**
- React (with Parcel)
- Redux Toolkit
- Tailwind CSS
- React Router v6

**Backend:**
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT for Authentication
- Bcrypt for Password Hashing

---

## ⚙️ Installation, Setup & Configuration

### 📦 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### 🧰 Steps

```bash
# 1. Clone the Repository
git clone https://github.com/AkshAI-2030/Swiggy-Clone-App.git
cd Swiggy-Clone-App

# 2. Backend Setup
cd backend
npm install

# Create a .env file in the server directory and add the following:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Start the backend server
npm start

# Authentication
POST /api/auth/register     # Register a new user
POST /api/auth/login        # Login and receive JWT

# Restaurants
GET /api/restaurants        # List all restaurants
GET /api/restaurants/:id    # Get menu of a restaurant

# Cart
POST /api/cart/save         # Save current cart to DB
GET /api/cart/:userId       # Fetch saved cart for a user

# 3. Frontend Setup
cd frontend
npm install

# Start the frontend server
npm run dev
or
npm start 

👤 Author
Akshay Arelli
