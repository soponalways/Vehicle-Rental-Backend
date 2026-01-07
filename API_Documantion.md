# 🌐 API Reference

← [Back to Main Documentation](/README.md)

API reference for the **Sopon Vehicle Rental System**. All endpoints follow REST conventions, JWT‑based authentication, and role‑based authorization.

---

## 🔗 Base URL

```
http://localhost:5000/api/v1
```

---

## 🔐 Authentication Endpoints

### 1️⃣ User Registration

**Access:** Public
**Description:** Register a new user account

**Endpoint**
`POST /auth/signup`

**Request Body**

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123",
  "phone": "01712345678",
  "role": "customer"
}
```

**Success Response (201 Created)**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "01712345678",
    "role": "customer"
  }
}
```

---

### 2️⃣ User Login

**Access:** Public
**Description:** Authenticate user and return JWT token

**Endpoint**
`POST /auth/signin`

**Request Body**

```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Success Response (200 OK)**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "<JWT_TOKEN>",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "01884953018",
      "role": "customer"
    }
  }
}
```

---

## 🚗 Vehicle Endpoints

### 3️⃣ Create Vehicle

**Access:** Admin only
**Description:** Add a new vehicle to the system

**Endpoint**
`POST /vehicles`

**Headers**

```
Authorization: Bearer <JWT_TOKEN>
```

**Request Body**

```json
{
  "vehicle_name": "Toyota Camry 2024",
  "type": "car",
  "registration_number": "ABC-1234",
  "daily_rent_price": 50,
  "availability_status": "available"
}
```

**Success Response (201 Created)**

```json
{
  "success": true,
  "message": "Vehicle created successfully",
  "data": {
    "id": 1,
    "vehicle_name": "Toyota Camry 2024",
    "type": "car",
    "registration_number": "ABC-1234",
    "daily_rent_price": 50,
    "availability_status": "available"
  }
}
```

---

### 4️⃣ Get All Vehicles

**Access:** Public
**Description:** Retrieve all vehicles

**Endpoint**
`GET /vehicles`

**Success Response (200 OK)**

```json
{
  "success": true,
  "message": "Vehicles retrieved successfully",
  "data": []
}
```

---

### 5️⃣ Get Vehicle by ID

**Access:** Public
**Description:** Retrieve specific vehicle details

**Endpoint**
`GET /vehicles/:vehicleId`

---

### 6️⃣ Update Vehicle

**Access:** Admin only
**Description:** Update vehicle details

**Endpoint**
`PUT /vehicles/:vehicleId`

**Headers**

```
Authorization: Bearer <JWT_TOKEN>
```

---

### 7️⃣ Delete Vehicle

**Access:** Admin only
**Description:** Delete a vehicle (only if no active bookings exist)

**Endpoint**
`DELETE /vehicles/:vehicleId`

---

## 👥 User Endpoints

### 8️⃣ Get All Users

**Access:** Admin only
**Endpoint**
`GET /users`

---

### 9️⃣ Update User

**Access:** Admin or Own Profile
**Endpoint**
`PUT /users/:userId`

---

### 🔟 Delete User

**Access:** Admin only
**Endpoint**
`DELETE /users/:userId`

---

## 📅 Booking Endpoints

### 1️⃣1️⃣ Create Booking

**Access:** Customer / Admin
**Endpoint**
`POST /bookings`

---

### 1️⃣2️⃣ Get Bookings

**Access:** Role‑based

* Admin → All bookings
* Customer → Own bookings

**Endpoint**
`GET /bookings`

---

### 1️⃣3️⃣ Update Booking Status

**Access:** Role‑based
**Endpoint**
`PUT /bookings/:bookingId`

---

## 📝 Common Response Format

### ✅ Success

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### ❌ Error

```json
{
  "success": false,
  "message": "Error description"
}
```

---

## 🔒 Authentication Header

All protected routes require:

```
Authorization: Bearer <JWT_TOKEN>
