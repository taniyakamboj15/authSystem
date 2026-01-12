import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import type { RootState } from '../store';
import api from '../api/axios';

export const useProfile = () => {
    const { userInfo } = useSelector((state: RootState) => state.auth);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (password && password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password && !oldPassword) {
            setError('Please enter your old password to change it');
            return;
        }

        setIsLoading(true);

        try {
            const res = await api.put('/auth/profile', {
                name,
                email,
                password: password || undefined,
                oldPassword: oldPassword || undefined
            });
            dispatch(setCredentials(res.data));
            setMessage('Profile Updated Successfully');
            // Clear password fields
            setPassword('');
            setOldPassword('');
            setConfirmPassword('');
        } catch (err: any) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        oldPassword,
        setOldPassword,
        confirmPassword,
        setConfirmPassword,
        isLoading,
        message,
        error,
        submitHandler
    };
};
