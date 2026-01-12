import { useState, useEffect, useRef } from 'react';
import { useSocket } from '../context/SocketContext';
import { useToast } from '../context/ToastContext';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export const useFileUpload = () => {
    const { socket } = useSocket();
    const { addToast } = useToast();
    const { userInfo } = useSelector((state: RootState) => state.auth);
    
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [recipientId, setRecipientId] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setSelectedFile(e.dataTransfer.files[0]);
            setUploadProgress(0);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
            setUploadProgress(0);
        }
    };

    const uploadFile = () => {
        if (!selectedFile || !socket) return;
        socket.emit('upload-start', {
            fileName: selectedFile.name,
            size: selectedFile.size,
            recipientId
        });
    };

    const uploadChunks = (file: File, fileId: string) => {
        const chunkSize = 64 * 1024; // 64KB
        let offset = 0;

        const readChunk = () => {
            const reader = new FileReader();
            const slice = file.slice(offset, offset + chunkSize);

            reader.onload = (e) => {
                if (e.target?.result && socket) {
                    socket.emit('upload-chunk', {
                        fileId,
                        fileName: file.name,
                        chunk: e.target.result,
                        offset
                    });

                    offset += chunkSize;
                    const progress = Math.min((offset / file.size) * 100, 100);
                    setUploadProgress(progress);

                    if (offset < file.size) {
                        readChunk();
                    } else {
                        socket.emit('upload-end', {
                            fileId,
                            fileName: file.name,
                            isPrivate: !!recipientId,
                            recipientId,
                            senderId: userInfo?._id,
                            senderName: userInfo?.name
                        });
                        addToast('File sent successfully!', 'success');
                        setSelectedFile(null);
                        setUploadProgress(0);
                    }
                }
            };
            reader.readAsArrayBuffer(slice);
        };
        readChunk();
    };

    useEffect(() => {
        if (!socket) return;

        const handleUploadAck = (data: any) => {
            if (data.status === 'ready' && selectedFile) {
                uploadChunks(selectedFile, data.fileId);
            }
        };

        const handleUploadError = (data: { message: string }) => {
            addToast(`Upload failed: ${data.message}`, 'error');
            setUploadProgress(0);
            setSelectedFile(null);
        };

        socket.on('upload-ack', handleUploadAck);
        socket.on('upload-error', handleUploadError);

        return () => {
            socket.off('upload-ack', handleUploadAck);
            socket.off('upload-error', handleUploadError);
        };
    }, [socket, selectedFile, recipientId, userInfo]);

    return {
        dragActive,
        selectedFile,
        uploadProgress,
        recipientId,
        setRecipientId,
        inputRef,
        handleDrag,
        handleDrop,
        handleChange,
        uploadFile
    };
};
