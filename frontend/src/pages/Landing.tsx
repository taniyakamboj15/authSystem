import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import Button from '../components/Button';

const Landing: React.FC = () => {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) {
            
        }
    }, [userInfo, navigate]);

    return (
        <div className="container min-h-[90vh] flex flex-col justify-center items-center text-center fade-in">
            {/* Decorative background glow */}
            <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
            <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

            <div className="glass-panel w-full max-w-3xl p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-sm">
                    Welcome to AuthSys
                </h1>

                {userInfo ? (
                    <div className="space-y-8">
                        <p className="text-xl text-slate-600">
                            Hello, <span className="font-semibold text-slate-900">{userInfo.name}</span>! You have successfully authenticated.
                        </p>
                        <p className="text-slate-500 text-lg">
                            Explore your profile settings or manage your security preferences with our advanced dashboard.
                        </p>
                        <div className="flex justify-center gap-4">
                            <div className="w-48">
                                <Button onClick={() => navigate('/profile')}>Go to Profile</Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            Secure, fast, and beautiful authentication for modern applications. Experience the next generation of user identity management.
                        </p>

                        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 max-w-md mx-auto">
                            <p className="text-red-600 text-sm font-medium">
                                You need to login to continue to the dashboard.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <div className="w-40">
                                <Button onClick={() => navigate('/login')}>Login</Button>
                            </div>
                            <div className="w-40">
                                <Button variant="outline" onClick={() => navigate('/signup')}>Sign Up</Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Landing;
