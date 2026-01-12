# DevDrop - Real-Time File Sharing System

**DevDrop** is a secure, real-time file-sharing platform designed for developers to share code snippets, binaries, and assets instantly. Built on the **MERN Stack** (MongoDB, Express, React, Node.js) and **TypeScript**, it leverages **WebSocket** technology for peer-to-peer-like transfer speeds and immediate updates.

---

## 🚀 Project Overview

The goal of this project was to build a robust system that handles both **User Authentication** and **Real-Time Data Transfer**. It solves the problem of slow, clunky file sharing by providing a drag-and-drop interface where files are broadcasted or privately sent instantly to online users.

### Key Capabilities
-   **Real-Time Communication**: Uses `Socket.io` to create a live connection between all active users.
-   **Secure Authentication**: Full signup/login flow with HTTP-Only cookies and JWT.
-   **Hybrid Sharing Modes**:
    1.  **Public Broadcast**: Share a file with *everyone* currently online.
    2.  **Private Direct Message**: Select a specific user from the online list to send a file privately.
-   **Visual Feedback**: Real-time upload progress bars and success notifications.

---

## 🏗️ Architecture & Logic

### 1. The Real-Time Engine (Socket.io)
At the heart of DevDrop is a WebSocket server (`src/socket/socketHandler.ts`) that manages active connections.
-   **Connection**: When a user logs in, they establish a socket connection and are added to an `onlineUsers` list.
-   **Events**:
    -   `upload-start`: Signals the server to prepare for an incoming file stream.
    -   `upload-chunk`: Files are split into binary chunks on the client and streamed to the server to handle large files efficiently without blocking the main thread.
    -   `file-shared`: Once the upload completes, the server emits this event.
        -   **If Public**: Emitted to `io.emit()` (all users).
        -   **If Private**: Emitted to `io.to(recipientSocketId)` (only the target user).

### 2. File Storage Strategy
-   Files are stored locally on the server in an `uploads/` directory.
-   **Sanitization**: Filenames are sanitized and prefixed with a unique UUID to prevent collisions and security risks (e.g., path traversal attacks).
-   **Cleanup**: A Cron job (`src/services/cronJob.ts`) automatically cleans up old files to manage server storage.

### 3. Frontend Experience (React + Redux)
-   **State Management**: `Redux Toolkit` manages the authenticated user state.
-   **Context API**: `SocketContext` maintains the active WebSocket connection and exposes it to components.
-   **Drag & Drop**: The `UploadPanel` component uses HTML5 Drag and Drop API to accept files, which are then read and chunked for upload.

---

## 🔄 Feature Flow

### Scenario A: Public Sharing
1.  **User A** drags a file into the "Share File" zone.
2.  Selects **"Everyone (Public)"** from the dropdown.
3.  Clicks **"Send File"**.
4.  **Backend** receives the file chunks, saves them to disk.
5.  **Backend** broadcasts a "New File Available" event to **ALL** connected sockets.
6.  **Users B, C, and D** see the file appear instantly in their "Live Feed" and can download it.

### Scenario B: Private Sharing
1.  **User A** sees **User B** in the "Online Users" list.
2.  Selects **User B** from the dropdown.
3.  Uploads the file.
4.  **Backend** verifies User B is still online.
5.  **Backend** saves the file but sends the notification **ONLY** to User B's specific socket ID.
6.  **User B** receives the file. **User C** sees nothing.

---

## ✅ Acceptance Criteria Status

| Requirement | Status | Implementation Details |
| :--- | :--- | :--- |
| **WebSocket Connection** | 🟢 **Working** | Users auto-connect on login; status is tracked live. |
| **Public Sharing** | 🟢 **Working** | Default mode; broadcasts to global room. |
| **Private Sharing** | 🟢 **Working** | Targeted emission using `socket.to(id)`. |
| **Progress Events** | 🟢 **Working** | Upload percentage calculated from chunk completion. |
| **Multiple Users** | 🟢 **Working** | Tested with concurrent sessions; distinct user identities maintained. |
| **Local Storage** | 🟢 **Working** | Files saved to `server/uploads` with reliable retrieval. |

---

## 🛠️ Tech Stack & Security

*   **Frontend**: React, Vite, Tailwind CSS (Dark Mode enabled), Redux, Socket.io-client.
*   **Backend**: Node.js, Express, Socket.io, Multer (custom chunk handler), Node-Cron.
*   **Authentication**:
    *   **JWT Implementation**: Tokens stored in secure, HTTP-only cookies to prevent XSS attacks.
    *   **Password Security**: Bcrypt hashing for encryption.
    *   **Input Validation**: Strict regex for emails and passwords.

---

## 🚀 How to Run

### 1. Backend Setup
```bash
cd server
npm install
npm run dev
# Server runs on port 5000 (Socket & API)
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Client runs on port 5173
```

*For detailed setup instructions, please refer to the `README.md` files inside the `frontend` and `server` directories.*
