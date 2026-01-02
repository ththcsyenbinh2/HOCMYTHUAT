import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'md',
    text
}) => {
    return (
        <div className="loading-spinner-container">
            <div className={`loading-spinner loading-spinner-${size}`}></div>
            {text && <p className="loading-text">{text}</p>}
        </div>
    );
};
