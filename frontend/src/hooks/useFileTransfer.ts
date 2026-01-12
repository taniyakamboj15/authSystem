import { useSocket } from '../context/SocketContext';

export const useFileTransfer = () => {
    const { files } = useSocket();
    return { files };
};
