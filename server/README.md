# DevDrop Backend Server

This is the backend server for **DevDrop**, a secure, real-time file-sharing application built with the MERN stack (MongoDB, Express, React, Node.js) and TypeScript.

## Features

-   **User Authentication**: Secure Signup, Login, and Logout using JWT and HTTP-only cookies.
-   **Real-time Communication**: Powered by `Socket.io` for instant file sharing and user status updates.
-   **File Sharing**:
    -   **Public Sharing**: Broadcast files to all connected users.
    -   **Private Sharing**: Send files securely to specific online users.
    -   **Chunked Uploads**: Supports large file uploads via chunking for reliability.
-   **Local Storage**: Files are stored locally in the `uploads/` directory with sanitized names.
-   **Security**:
    -   Rate Limiting (10 uploads/min per user).
    -   Input Validation (Email, Password complexity).
    -   Sanitized Filenames to prevent path traversal.
-   **Scheduled Tasks**: Cron jobs to clean up old files or inactive sessions (configurable).
-   **Global Error Handling**: Centralized error middleware for consistent API responses.

## Tech Stack

-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Language**: TypeScript
-   **Database**: MongoDB (via Mongoose)
-   **Real-time**: Socket.io
-   **Auth**: JSON Web Tokens (JWT), BCrypt, Cookie-Parser
-   **Utilities**: Nodemailer (Email), Node-Cron (Scheduling)

## Prerequisites

-   Node.js (v18+ recommended)
-   MongoDB (running locally or a cloud instance)

## Installation

1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

## Environment Variables

Create a `.env` file in the root of the `server` directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

## Running the Server

-   **Development Mode** (with hot reload):
    ```bash
    npm run dev
    ```
-   **Production Build**:
    ```bash
    npm run build
    npm start
    ```

## API Endpoints

### Authentication (`/api/auth`)
-   `POST /signup` - Register a new user.
-   `POST /login` - Authenticate user and set HTTP-only cookie.
-   `POST /logout` - Clear auth cookie.
-   `POST /verify-otp` - Verify email OTP.
-   `POST /resend-otp` - Resend verification OTP.
-   `POST /forgot-password` - Request password reset link.
-   `POST /reset-password/:token` - Reset password.
-   `GET /profile` - Get current user profile (Protected).
-   `PUT /profile` - Update user profile (Protected).

## Socket Events

The server listens for and emits the following socket events for real-time functionality:

-   `connection` / `disconnect`: Handle user presence.
-   `join`: Register user with `userId` to map to `socketId`.
-   `upload-start`: Initiate a file upload session.
-   `upload-chunk`: Receive file binary chunks.
-   `upload-end`: Finalize upload and notify recipients.
-   `file-shared`: Emit to recipients when a file is ready for download.
-   `online-users`: Broadcast the list of currently active users.
