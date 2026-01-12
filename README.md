# Authentication System Project

## About the Project
This is a full-stack **Authentication System** that I built using the **MERN Stack** (MongoDB, Express, React, Node.js) and **TypeScript**. 

I created this project to understand how secure login and signup systems work in real web applications. It’s a complete system where users can register, log in, and manage their profiles safely.

It handles **Multi-User** functionality, which means different users can create their own accounts and log in to the system separately. Everyone has their own private data and profile page that others can't see.

---

## Features I Implemented

### 1. User Authentication
- **Signup & Login**: Users can create an account and log in easily.
- **Secure Sessions**: I used **HTTP-Only Cookies** to store tokens (JWT). This makes the app more secure than just storing tokens in the browser.
- **Logout**: Safely logs the user out and clears the session.

### 2. Password Security (Forgot Password)
- **Password Hashing**: I used **Bcrypt** to encrypt passwords before saving them in the database.
- **Forgot Password Flow**: If a user forgets their password, they can reset it.
- **Email OTP**: The system generates a 6-digit One-Time Password (OTP) and sends it to the user's email ID using **Nodemailer**.

### 3. Profile Management
- **Dashboard**: Once logged in, users can see their profile details.
- **Update Profile**: Users can change their name, email, or update their password.

---

## Tech Stack Used

*   **Frontend**: React (with Vite), Redux Toolkit (for state management), Tailwind CSS (for styling).
*   **Backend**: Node.js, Express.js.
*   **Database**: MongoDB (Mongoose).
*   **Language**: TypeScript (for better code quality).
*   **Tools**: Postman (for API testing), Nodemailer (for sending emails).

---

## How to Run This Project

If you want to run this project on your local machine, follow these steps:

### 1. Setup Backend
Go to the `server` folder and install dependencies:
```bash
cd server
npm install
```
Create a `.env` file in the `server` folder with these details:
```
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=some_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```
Run the server:
```bash
npm run dev
```

### 2. Setup Frontend
Go to the `frontend` folder and install dependencies:
```bash
cd frontend
npm install
```
Run the frontend:
```bash
npm run dev
```

---

## API Endpoints List

Here are the API routes I created for the backend:

- **POST** `/api/auth/signup` -> Register a new user
- **POST** `/api/auth/login` -> Login user
- **POST** `/api/auth/logout` -> Logout user
- **GET**  `/api/auth/profile` -> Get user details (Requires Login)
- **PUT**  `/api/auth/profile` -> Update profile details (Requires Login)
- **POST** `/api/auth/forgot-password` -> Send OTP to email
- **POST** `/api/auth/verify-otp` -> Verify the OTP
- **POST** `/api/auth/reset-password` -> Set new password

---


