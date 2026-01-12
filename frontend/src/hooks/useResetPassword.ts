import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api/axios';

export const useResetPassword = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const emailParam = queryParams.get('email') || '';

    const [email, setEmail] = useState(emailParam);
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);

        try {
            await api.post('/auth/reset-password', { email, otp, password });
            setMessage('Password Reset Successfully! Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err: any) {
            setError(err.response?.data?.message || err.message);
            setIsLoading(false);
        }
    };

    return {
        email,
        setEmail,
        otp,
        setOtp,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        isLoading,
        message,
        error,
        submitHandler,
        isEmailReadOnly: !!emailParam
    };
};
