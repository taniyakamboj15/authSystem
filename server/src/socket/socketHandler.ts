import { Server, Socket } from 'socket.io';
import fs from 'fs';
import path from 'path';

interface User {
    userId: string;
    socketId: string;
    username?: string;
}

let onlineUsers: User[] = [];

export const registerSocketHandlers = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('join', (userData: { userId: string; username: string }) => {
            const { userId, username } = userData;
            // Remove existing socket for this user if any
            onlineUsers = onlineUsers.filter((user) => user.userId !== userId);
            onlineUsers.push({ userId, socketId: socket.id, username });

            console.log(`User registered: ${username} (${userId})`);
            io.emit('online-users', onlineUsers);
        });

        // --- File Upload Handling ---

        socket.on('upload-start', (data: { fileName: string; size: number; fileId: string }) => {
            const { fileName, fileId } = data;
            const filePath = path.join(__dirname, '../../uploads', `${fileId}-${fileName}`);

            // Create an empty file
            fs.writeFile(filePath, '', (err) => {
                if (err) {
                    console.error('Error creating file:', err);
                    socket.emit('upload-error', { fileId, message: 'Failed to start upload' });
                } else {
                    socket.emit('upload-ack', { fileId, status: 'ready' });
                }
            });
        });

        socket.on('upload-chunk', (data: { fileId: string; fileName: string; chunk: Buffer; offset: number }) => {
            const { fileId, fileName, chunk } = data;
            const filePath = path.join(__dirname, '../../uploads', `${fileId}-${fileName}`);

            fs.appendFile(filePath, chunk, (err) => {
                if (err) {
                    console.error('Error appending chunk:', err);
                    socket.emit('upload-error', { fileId, message: 'Failed to write chunk' });
                } else {
                    // Acknowledge chunk received (optional, for flow control)
                    // socket.emit('chunk-ack', { fileId, offset }); 
                }
            });
        });

        socket.on('upload-end', (data: { fileId: string; fileName: string; isPrivate: boolean; recipientId?: string; senderId: string, senderName: string }) => {
            const { fileId, fileName, isPrivate, recipientId, senderId, senderName } = data;
            const downloadUrl = `/uploads/${fileId}-${fileName}`;

            const fileData = {
                fileId,
                fileName,
                downloadUrl,
                senderId,
                senderName,
                timestamp: new Date().toISOString(),
                isPrivate
            };

            if (isPrivate && recipientId) {
                const recipient = onlineUsers.find(u => u.userId === recipientId);
                if (recipient) {
                    io.to(recipient.socketId).emit('file-shared', fileData);
                    socket.emit('file-sent', { ...fileData, recipientName: recipient.username });
                }
            } else {
                io.emit('file-shared', fileData);
            }
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
            onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
            io.emit('online-users', onlineUsers);
        });
    });
};
