import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export const useForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        setError('');

        try {
            await api.post('/auth/forgot-password', { email });
            setMessage('OTP sent to your email. Redirecting...');
            setTimeout(() => {
                navigate(`/reset-password?email=${encodeURIComponent(email)}`);
            }, 2000);
        } catch (err: any) {
            setError(err.response?.data?.message || err.message);
            setIsLoading(false);
        }
    };

    return {
        email,
        setEmail,
        isLoading,
        message,
        error,
        submitHandler
    };
};
