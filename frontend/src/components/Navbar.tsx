import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { logout } from '../slices/authSlice';
import api from '../api/axios';
import Button from './Button';

const Navbar: React.FC = () => {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout');
            dispatch(logout());
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-lg">
            <div className="container flex items-center justify-between h-16 px-4 mx-auto">
                <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900 group">
                    <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent group-hover:to-indigo-500 transition-all duration-300">AuthSys</span>
                </Link>

                <div className="flex items-center gap-4">
                    {userInfo ? (
                        <>
                            <Link
                                to="/profile"
                                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-2"
                            >
                                <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-600 font-bold border border-indigo-500/20">
                                    {userInfo.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="hidden sm:inline">{userInfo.name}</span>
                            </Link>
                            <div className="w-24">
                                <Button variant="secondary" onClick={handleLogout} className="!py-2 !text-xs">Logout</Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors hidden sm:inline-block">
                                Sign In
                            </Link>
                            <Link to="/signup">
                                <Button variant="primary" className="!py-2 !px-4 !text-sm">Get Started</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
