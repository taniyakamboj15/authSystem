import React, { ReactNode } from 'react';
import { ExclamationCircleIcon } from './icons/ExclamationCircleIcon';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    startIcon?: ReactNode;
}

const Input: React.FC<InputProps> = ({ label, error, startIcon, ...props }) => {
    return (
        <div className="mb-6 w-full group">
            <label className="block mb-2 text-sm font-medium text-slate-600 group-focus-within:text-indigo-600 transition-colors duration-300">
                {label}
            </label>
            <div className="relative">
                {startIcon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-300">
                        {startIcon}
                    </div>
                )}
                <input
                    className={`input-field ${startIcon ? '!pl-10' : ''} ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                    {...props}
                />
            </div>
            {error && (
                <span className="text-red-500 text-xs mt-1.5 ml-1 animate-fade-in flex items-center gap-1">
                    <ExclamationCircleIcon className="w-3 h-3" />
                    {error}
                </span>
            )}
        </div>
    );
};

export default Input;
