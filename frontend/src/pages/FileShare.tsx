import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../context/SocketContext';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

interface SharedFile {
    fileId: string;
    fileName: string;
    downloadUrl: string;
    senderId: string;
    senderName: string;
    timestamp: string;
    isPrivate: boolean;
    recipientName?: string;
}

const FileShare = () => {
    const { socket, onlineUsers } = useSocket();
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [files, setFiles] = useState<SharedFile[]>([]);
    const [recipientId, setRecipientId] = useState<string>(''); // Empty string = public
    const inputRef = useRef<HTMLInputElement>(null);

    // Filter out current user from online users list
    const otherUsers = onlineUsers.filter(u => u.userId !== userInfo?._id);

    useEffect(() => {
        if (!socket) return;

        socket.on('file-shared', (file: SharedFile) => {
            setFiles((prev) => [file, ...prev]);
        });

        socket.on('file-sent', (file: SharedFile) => {
            setFiles((prev) => [file, ...prev]);
        });

        socket.on('upload-ack', (data) => {
            if (data.status === 'ready' && selectedFile) {
                uploadChunks(selectedFile, data.fileId);
            }
        });

        return () => {
            socket.off('file-shared');
            socket.off('file-sent');
            socket.off('upload-ack');
        };
    }, [socket, selectedFile]);

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
            setUploadProgress(0); // Reset progress
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

        const fileId = `${Date.now()}`;
        socket.emit('upload-start', {
            fileName: selectedFile.name,
            size: selectedFile.size,
            fileId
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
                        // Done
                        socket.emit('upload-end', {
                            fileId,
                            fileName: file.name,
                            isPrivate: !!recipientId,
                            recipientId,
                            senderId: userInfo?._id,
                            senderName: userInfo?.name
                        });
                        setSelectedFile(null);
                        setUploadProgress(0);
                    }
                }
            };
            reader.readAsArrayBuffer(slice);
        };

        readChunk();
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white p-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Left Panel: Upload & User Selection */}
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700">
                        <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Share File</h2>

                        {/* Recipient Selector */}
                        <div className="mb-4">
                            <label className="block text-sm text-slate-400 mb-2">Send to:</label>
                            <select
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                value={recipientId}
                                onChange={(e) => setRecipientId(e.target.value)}
                            >
                                <option value="">Everyone (Public)</option>
                                {otherUsers.map(user => (
                                    <option key={user.userId} value={user.userId}>{user.username}</option>
                                ))}
                            </select>
                        </div>

                        {/* Drop Zone */}
                        <div
                            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-slate-600 hover:border-slate-500 bg-slate-900/50'
                                }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            onClick={() => inputRef.current?.click()}
                        >
                            <input
                                ref={inputRef}
                                type="file"
                                className="hidden"
                                onChange={handleChange}
                            />

                            {selectedFile ? (
                                <div className="space-y-2">
                                    <div className="text-blue-400 font-medium truncate">{selectedFile.name}</div>
                                    <div className="text-xs text-slate-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</div>
                                </div>
                            ) : (
                                <div className="text-slate-400 pointer-events-none">
                                    <p className="mb-2 text-xl">☁️</p>
                                    <p className="text-sm">Drag & Drop or Click to Upload</p>
                                </div>
                            )}
                        </div>

                        {/* Progress Bar */}
                        {uploadProgress > 0 && (
                            <div className="mt-4">
                                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
                                        style={{ width: `${uploadProgress}%` }}
                                    ></div>
                                </div>
                                <div className="text-right text-xs text-slate-400 mt-1">{Math.round(uploadProgress)}%</div>
                            </div>
                        )}

                        {/* Upload Button */}
                        <button
                            disabled={!selectedFile || uploadProgress > 0}
                            onClick={uploadFile}
                            className={`mt-4 w-full py-2 px-4 rounded-lg font-semibold transition-all shadow-lg ${!selectedFile || uploadProgress > 0
                                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-blue-500/20'
                                }`}
                        >
                            {uploadProgress > 0 ? 'Uploading...' : 'Send File'}
                        </button>
                    </div>

                    {/* Online Users List */}
                    <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700">
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Online Users ({otherUsers.length})</h3>
                        <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
                            {otherUsers.map(user => (
                                <div key={user.userId} className="flex items-center space-x-3 p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-xs shadow-lg">
                                        {user.username.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-slate-200">{user.username}</span>
                                </div>
                            ))}
                            {otherUsers.length === 0 && (
                                <p className="text-slate-500 text-sm italic">No other users online.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Panel: File Feed */}
                <div className="md:col-span-2">
                    <div className="bg-slate-800 rounded-2xl shadow-xl border border-slate-700 min-h-[600px] flex flex-col">
                        <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white">Live Feed</h2>
                            <span className="text-xs px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">Real-time</span>
                        </div>

                        <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[600px] custom-scrollbar">
                            {files.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-slate-500">
                                    <div className="text-4xl mb-4">📂</div>
                                    <p>No files shared yet.</p>
                                </div>
                            ) : (
                                files.map((file, idx) => (
                                    <div key={idx} className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 hover:border-slate-600 transition-all group flex items-start space-x-4">
                                        <div className="p-3 bg-slate-800 rounded-lg text-2xl">
                                            📄
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-semibold text-slate-200 truncate">{file.fileName}</h3>
                                                    <p className="text-xs text-slate-400 mt-1">
                                                        From <span className="text-blue-400">{file.senderId === userInfo?._id ? 'You' : file.senderName}</span>
                                                        {file.isPrivate && <span className="ml-2 text-amber-500">🔒 Private {file.recipientName ? `to ${file.recipientName}` : '(Received)'}</span>}
                                                    </p>
                                                </div>
                                                <span className="text-[10px] text-slate-500 bg-slate-800 px-2 py-1 rounded-md">
                                                    {new Date(file.timestamp).toLocaleTimeString()}
                                                </span>
                                            </div>
                                            <div className="mt-3 flex space-x-3">
                                                <a
                                                    href={`http://localhost:5000${file.downloadUrl}`}
                                                    target="_blank"
                                                    download
                                                    className="text-xs flex items-center space-x-1 bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition-colors shadow-lg shadow-blue-900/20"
                                                >
                                                    <span>Download</span>
                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileShare;
