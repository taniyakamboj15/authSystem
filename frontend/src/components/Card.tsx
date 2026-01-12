import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    description?: string;
}

const Card = ({ children, className = '', title, description }: CardProps) => {
    return (
        <div className={`bg-background-paper rounded-3xl shadow-xl shadow-primary/5 border border-white/50 p-6 sm:p-8 backdrop-blur-xl ${className}`}>
            {(title || description) && (
                <div className="mb-6">
                    {title && <h3 className="text-2xl font-bold text-text mb-2">{title}</h3>}
                    {description && <p className="text-text-muted text-sm">{description}</p>}
                </div>
            )}
            {children}
        </div>
    );
};

export default Card;
