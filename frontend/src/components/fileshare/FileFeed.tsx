import { useFileTransfer } from '../../hooks/useFileTransfer';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

const FileFeed = () => {
    const { files } = useFileTransfer();
    const { userInfo } = useSelector((state: RootState) => state.auth);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 min-h-[600px] flex flex-col transition-colors duration-300">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center transition-colors">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Live Feed</h2>
                <span className="text-xs px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full border border-indigo-100 dark:border-indigo-500/20">Real-time</span>
            </div>

            <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[600px] custom-scrollbar">
                {files.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
                        <div className="text-4xl mb-4">📂</div>
                        <p>No files shared yet.</p>
                    </div>
                ) : (
                    files.map((file, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all group flex items-start space-x-4">
                            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg text-2xl shadow-sm">
                                📄
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start gap-3">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-slate-900 dark:text-slate-200 break-all">{file.fileName}</h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                            From <span className="text-indigo-600 dark:text-blue-400 font-medium">{file.senderId === userInfo?._id ? 'You' : file.senderName}</span>
                                            {file.isPrivate && <span className="ml-2 text-amber-600 dark:text-amber-500">🔒 Private {file.recipientName ? `to ${file.recipientName}` : '(Received)'}</span>}
                                        </p>
                                    </div>
                                    <span className="text-[10px] text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-2 py-1 rounded-md shrink-0">
                                        {new Date(file.timestamp).toLocaleTimeString()}
                                    </span>
                                </div>
                                <div className="mt-3 flex space-x-3">
                                    <a
                                        href={`http://localhost:5000${file.downloadUrl}`}
                                        target="_blank"
                                        download
                                        className="text-xs flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg transition-colors shadow-lg shadow-indigo-500/20"
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
    );
};

export default FileFeed;
