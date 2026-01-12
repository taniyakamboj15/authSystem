import { useToast } from '../context/ToastContext';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { ExclamationCircleIcon } from './icons/ExclamationCircleIcon';

const ToastContainer = () => {
    const { toasts, removeToast } = useToast();

    return (
        <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`pointer-events-auto min-w-[300px] max-w-md p-4 rounded-xl shadow-xl flex items-start gap-3 transform transition-all duration-300 animate-slide-up ${
                        toast.type === 'success' ? 'bg-white border-l-4 border-green-500 text-slate-800' :
                        toast.type === 'error' ? 'bg-white border-l-4 border-red-500 text-slate-800' :
                        toast.type === 'info' ? 'bg-white border-l-4 border-blue-500 text-slate-800' :
                        'bg-white border-l-4 border-yellow-500 text-slate-800'
                    }`}
                >
                    <div className="shrink-0 mt-0.5">
                        {toast.type === 'success' && <CheckCircleIcon className="w-5 h-5 text-green-500" />}
                        {toast.type === 'error' && <ExclamationCircleIcon className="w-5 h-5 text-red-500" />}
                        {toast.type === 'info' && <span className="text-xl">ℹ️</span>}
                        {toast.type === 'warning' && <span className="text-xl">⚠️</span>}
                    </div>
                    <div className="flex-1">
                        <p className="font-medium text-sm">{toast.message}</p>
                    </div>
                    <button
                        onClick={() => removeToast(toast.id)}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        ×
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ToastContainer;
