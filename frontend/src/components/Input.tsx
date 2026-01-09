import React from 'react';


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
    return (
        <div className="mb-6 w-full group">
            <label className="block mb-2 text-sm font-medium text-slate-600 group-focus-within:text-indigo-600 transition-colors duration-300">
                {label}
            </label>
            <input
                className={`input-field ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                {...props}
            />
            {error && (
                <span className="text-red-500 text-xs mt-1.5 ml-1 animate-fade-in flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </span>
            )}
        </div>
    );
};

export default Input;
