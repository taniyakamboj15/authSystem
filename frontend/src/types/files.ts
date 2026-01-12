export interface SharedFile {
    fileId: string;
    fileName: string;
    downloadUrl: string;
    senderId: string;
    senderName: string;
    timestamp: string;
    isPrivate: boolean;
    recipientName?: string;
}
