import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import type { SharedFile } from '../types/files';
import { useToast } from './ToastContext';

interface SocketContextData {
    socket: Socket | null;
    onlineUsers: User[];
    files: SharedFile[];
}

interface User {
    userId: string;
    socketId: string;
    username: string;
    email: string;
}

const SocketContext = createContext<SocketContextData>({
    socket: null,
    onlineUsers: [],
    files: [],
});

export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
    children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
    const [files, setFiles] = useState<SharedFile[]>([]);
    
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const { addToast } = useToast();

    useEffect(() => {
        if (userInfo) {
            const newSocket = io('http://localhost:5000'); // Ensure this matches backend port
            setSocket(newSocket);

            newSocket.on('connect', () => {
                console.log('Socket connected:', newSocket.id);
                // Register user
                newSocket.emit('join', {
                    userId: userInfo._id, 
                    username: userInfo.name,
                    email: userInfo.email
                });
            });

            newSocket.on('online-users', (users: User[]) => {
                setOnlineUsers(users);
            });
            
            // Global File Listeners
            newSocket.on('file-shared', (file: SharedFile & { isOffline?: boolean }) => {
                console.log('Received file:', file);
                setFiles((prev) => [file, ...prev]);
                if (file.senderId !== userInfo._id) {
                    if (file.isOffline) {
                        addToast(`You received "${file.fileName}" while you were offline`, 'info');
                    } else {
                        addToast(`New file received: ${file.fileName}`, 'info');
                    }
                }
            });

            newSocket.on('file-sent', (file: SharedFile) => {
                 setFiles((prev) => [file, ...prev]);
            });

            newSocket.on('file-delivered', (data: { fileId: string; recipientName: string }) => {
                console.log('Frontend received file-delivered event:', data);
                setFiles((prev) => prev.map(f => {
                    if (f.fileId === data.fileId) {
                         console.log(`Updating file ${f.fileId} status to delivered`);
                        return { ...f, recipientName: `${data.recipientName} (Delivered)` }; // Update status text
                    }
                    return f;
                }));
                addToast(`Your file was delivered to ${data.recipientName}!`, 'success');
            });

            return () => {
                newSocket.disconnect();
                setFiles([]); // Optional: clear files on logout/disconnect
            };
        } else {
            if (socket) {
                socket.disconnect();
                setSocket(null);
                setFiles([]);
            }
        }
    }, [userInfo]); 

    return (
        <SocketContext.Provider value={{ socket, onlineUsers, files }}>
            {children}
        </SocketContext.Provider>
    );
};
