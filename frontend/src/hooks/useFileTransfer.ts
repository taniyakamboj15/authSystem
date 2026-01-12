import { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import { useToast } from '../context/ToastContext';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import type { SharedFile } from '../types/files';

export const useFileTransfer = () => {
    const { socket } = useSocket();
    const { addToast } = useToast();
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const [files, setFiles] = useState<SharedFile[]>([]);

    useEffect(() => {
        if (!socket) return;

        const handleFileShared = (file: SharedFile) => {
            setFiles((prev) => [file, ...prev]);
            // Only notify if the file is NOT from the current user
            if (file.senderId !== userInfo?._id) {
                addToast(`New file received: ${file.fileName}`, 'info');
            }
        };

        const handleFileSent = (file: SharedFile) => {
            setFiles((prev) => [file, ...prev]);
        };

        socket.on('file-shared', handleFileShared);
        socket.on('file-sent', handleFileSent);

        return () => {
            socket.off('file-shared', handleFileShared);
            socket.off('file-sent', handleFileSent);
        };
    }, [socket, userInfo, addToast]);

    return { files };
};
