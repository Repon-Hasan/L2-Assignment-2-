🚗 Vehicle Rental System API
Apollo-Level2-Web-Dev

A complete backend API for managing users, vehicles, and rental bookings.
Built with Node.js, Express.js, PostgreSQL, and JWT authentication.

🔗 Live Base URL:

https://assignment-2-seven-coral.vercel.app/

📘 Table of Contents

Overview

Features

Tech Stack

Authentication

API Endpoints

Auth

Vehicles

Users

Bookings

Business Logic Rules

Response Structure

Installation & Setup

Environment Variables

Deployment

License

📖 Overview

This is an advanced backend system for a Vehicle Rental Service, supporting:

User authentication & roles

Vehicle inventory management

Booking management

Price calculation

Automatic vehicle status updates

Cancellation restrictions

Auto-return logic

Delete-prevention based on active bookings

⭐ Features

✔ JWT Authentication (Admin & Customer)
✔ CRUD operations for Users & Vehicles
✔ Booking creation with automatic pricing
✔ Status handling — active, cancelled, returned
✔ Auto-mark booking as returned if rental period ends
✔ Delete constraints (cannot delete if active booking exists)
✔ Role-Based Access Control (RBAC)
✔ Clean API response format

🛠 Tech Stack
Layer	Technology
Runtime	Node.js
Framework	Express.js
Database	PostgreSQL
Auth	JWT
Deployment	Vercel
Language	TypeScript (compiled to JS)
🔐 Authentication

Auth Header for protected routes:

Authorization: Bearer <jwt_token>

📡 API Endpoints
1️⃣ Authentication Endpoints
POST /api/v1/auth/signup

Register a new user.

POST /api/v1/auth/signin

Login and receive JWT.

2️⃣ Vehicle Endpoints
POST /api/v1/vehicles

Admin: Create a vehicle.

GET /api/v1/vehicles

Public: Get all vehicles.

GET /api/v1/vehicles/:vehicleId

Get a single vehicle.

PUT /api/v1/vehicles/:vehicleId

Admin: Update a vehicle.

DELETE /api/v1/vehicles/:vehicleId

Admin: Delete only if no active bookings exist.

3️⃣ User Endpoints
GET /api/v1/users

Admin: Get all users.

PUT /api/v1/users/:userId

Admin or User: Update user details.

DELETE /api/v1/users/:userId

Admin: Delete only if no active bookings exist.

4️⃣ Booking Endpoints
POST /api/v1/bookings

Create a booking (Customer/Admin).

GET /api/v1/bookings

Customer → Own bookings
Admin → All bookings

PUT /api/v1/bookings/:bookingId

Customer → Cancel booking
Admin → Mark returned

📌 Business Logic Rules
🚗 Vehicle Availability
Event	Status
Booking created	"booked"
Booking cancelled	"available"
Booking returned	"available"
💰 Price Calculation
total_price = daily_rent_price × number_of_days
number_of_days = rent_end_date - rent_start_date

🔄 Auto-Return Logic (System Rule)

If the rent_end_date has passed:

Booking automatically becomes "returned"

Vehicle becomes "available"

❌ Deletion Restrictions

A User or Vehicle cannot be deleted if there are any active bookings.

Installation & Setup
1️⃣ Clone Repo
git clone <repo-url>
cd Apollo-Level2-Web-Dev

2️⃣ Install Dependencies
npm install

3️⃣ Build
npm run build

4️⃣ Start Server
npm start

🌿 Environment Variables

Create .env:

PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
JWT_SECRET=your_secret_key

🚀 Deployment (Vercel)

✔ Build output is inside /dist
✔ vercel.json routes all traffic to dist/server.js
