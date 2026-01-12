import React from 'react';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    isLoading?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
    children, 
    variant = 'primary', 
    isLoading, 
    className = '',
    ...props 
}) => {
    const baseStyles = "relative inline-flex items-center justify-center font-bold overflow-hidden transition-all duration-300 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed";
    
    const variants = {
        primary: "bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] hover:bg-[position:right_center] text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 rounded-xl hover:-translate-y-0.5",
        secondary: "bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm hover:shadow-md rounded-xl hover:-translate-y-0.5",
        outline: "bg-transparent text-indigo-600 border-2 border-indigo-600/20 hover:border-indigo-600 hover:bg-indigo-50 rounded-xl",
        ghost: "bg-transparent text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-lg",
    };

    const sizes = "px-6 py-3 text-sm sm:text-base";

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes} ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? (
                <>
                    <SpinnerIcon className="w-5 h-5 mr-2 animate-spin" />
                    <span className="opacity-90">Processing...</span>
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
