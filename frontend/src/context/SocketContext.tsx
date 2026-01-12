import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

interface SocketContextData {
    socket: Socket | null;
    onlineUsers: User[];
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
});

export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
    children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
    const { userInfo } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (userInfo) {
            const newSocket = io('http://localhost:5000'); // Ensure this matches backend port
            setSocket(newSocket);

            newSocket.on('connect', () => {
                console.log('Socket connected:', newSocket.id);
                // Register user
                newSocket.emit('join', {
                    userId: userInfo._id, // Assuming _id is the unique ID
                    username: userInfo.name,
                    email: userInfo.email
                });
            });

            newSocket.on('online-users', (users: User[]) => {
                setOnlineUsers(users);
            });

            return () => {
                newSocket.disconnect();
            };
        } else {
            if (socket) {
                socket.disconnect();
                setSocket(null);
            }
        }
    }, [userInfo]); // Re-connect if user changes (login/logout)

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
