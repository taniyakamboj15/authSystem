import React, { type ReactNode, useState } from 'react';
import { ExclamationCircleIcon } from './icons/ExclamationCircleIcon';
import { EyeIcon } from './icons/EyeIcon';
import { EyeOffIcon } from './icons/EyeOffIcon';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    startIcon?: ReactNode;
}

const Input = ({ label, error, startIcon, type, ...props }: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className="mb-6 w-full group">
            <label className="block mb-2 text-sm font-medium text-text-muted dark:text-slate-400 group-focus-within:text-primary dark:group-focus-within:text-indigo-400 transition-colors duration-300">
                {label}
            </label>
            <div className="relative">
                {startIcon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted dark:text-slate-500 group-focus-within:text-primary dark:group-focus-within:text-indigo-400 transition-colors duration-300">
                        {startIcon}
                    </div>
                )}
                <input
                    type={inputType}
                    className={`input-field dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:focus:border-indigo-500 ${startIcon ? '!pl-10' : ''} ${isPassword ? '!pr-10' : ''} ${error ? 'border-danger focus:border-danger focus:ring-danger/20' : ''}`}
                    {...props}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted dark:text-slate-500 hover:text-primary dark:hover:text-indigo-400 transition-colors focus:outline-none"
                    >
                        {showPassword ? (
                            <EyeOffIcon className="w-5 h-5" />
                        ) : (
                            <EyeIcon className="w-5 h-5" />
                        )}
                    </button>
                )}
            </div>
            {error && (
                <span className="text-danger text-xs mt-1.5 ml-1 animate-fade-in flex items-center gap-1">
                    <ExclamationCircleIcon className="w-3 h-3" />
                    {error}
                </span>
            )}
        </div>
    );
};

export default Input;
