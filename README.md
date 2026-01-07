# 🚗 Sopon Vehicle Rental

**Sopon Vehicle Rental** is a backend-based vehicle rental management system built with a **modular architecture**.  
This project provides secure authentication, role-based access, and scalable APIs for managing vehicle rentals.

🔗 **Live URL:** _Coming Soon_ 

🔗 [API Documentation](/API_Documantion.md)


---

## ✨ Features

- Modular backend architecture (Clean & Scalable)
- User Authentication with JWT
- Password encryption using bcrypt
- Role-based authorization
- Secure RESTful APIs
- PostgreSQL database integration
- Environment-based configuration
- CORS enabled for frontend integration

---

## 🛠 Technology Stack

**Backend**
- Node.js
- Express.js (v5)
- TypeScript

**Database**
- PostgreSQL (NeonDB)

**Security**
- JWT (JSON Web Token)
- bcryptjs

**Utilities**
- dotenv
- cors
## 📁 Project Structure (Modular Pattern)

Each feature is organized into its own module for better maintainability and scalability.


## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/soponalways/Vehicle-Rental-Backend.git
cd Vehicle-Rental-Backend
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
CONNECTION_STRING=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret_key
```

> ⚠️ Never push your `.env` file to GitHub.

---

## ▶️ Run the Project

### Development Mode

```bash
npm run dev
```

The server will start on:

```
http://localhost:5000
```

---

## 📌 Scripts

| Command       | Description                   |
| ------------- | ----------------------------- |
| `npm run dev` | Runs the server in watch mode |

---

## 🔐 Authentication Flow

* User registers / logs in
* JWT token is generated
* Token is required for protected routes
* Role-based access control handled via middleware

---

## 🚀 Future Improvements

* Admin dashboard
* Vehicle availability management
* Booking history
* Payment integration
* API documentation (Swagger)

---

## 👨‍💻 Author

**Sopon islam**
Full Stack Developer
