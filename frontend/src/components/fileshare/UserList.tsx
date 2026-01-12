import { useSocket } from '../../context/SocketContext';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

const UserList = () => {
    const { onlineUsers } = useSocket();
    const { userInfo } = useSelector((state: RootState) => state.auth);

    // Filter out current user
    const otherUsers = onlineUsers.filter(u => u.userId !== userInfo?._id);

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 transition-colors duration-300">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Online Users ({otherUsers.length})</h3>
            <div className="space-y-3 max-h-50 overflow-y-auto custom-scrollbar pr-2">
                {otherUsers.map(user => (
                    <div key={user.userId} className="flex items-center space-x-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-600">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                            {user.username.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-slate-700 dark:text-slate-200 font-medium">{user.username}</span>
                    </div>
                ))}
                {otherUsers.length === 0 && (
                    <p className="text-slate-400 dark:text-slate-500 text-sm italic">No other users online.</p>
                )}
            </div>
        </div>
    );
};

export default UserList;
