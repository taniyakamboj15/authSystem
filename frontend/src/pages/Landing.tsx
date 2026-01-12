import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import Button from '../components/Button';

const Landing = () => {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) {

        }
    }, [userInfo, navigate]);

    return (
        <div className="container min-h-[90vh] flex flex-col justify-center items-center text-center">
            {/* Decorative background glow */}
            <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none -z-10 animate-[float_8s_ease-in-out_infinite]"></div>
            <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none -z-10 animate-[float_10s_ease-in-out_infinite_reverse]"></div>

            <div className="glass-panel w-full max-w-3xl p-12 relative overflow-hidden animate-slide-up">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent animate-pulse-glow"></div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-sm pb-2">
                    Welcome to AuthSys
                </h1>

                {userInfo ? (
                    <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        <p className="text-xl text-slate-600">
                            Hello, <span className="font-semibold text-slate-900">{userInfo.name}</span>! You have successfully authenticated.
                        </p>
                        <p className="text-slate-500 text-lg">
                            Explore your profile settings or manage your security preferences with our advanced dashboard.
                        </p>
                        <div className="flex justify-center gap-4 pt-4">
                            <div className="w-48">
                                <Button onClick={() => navigate('/profile')}>Go to Profile</Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            Secure, fast, and beautiful authentication for modern applications. Experience the next generation of user identity management.
                        </p>

                        <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4 max-w-md mx-auto backdrop-blur-sm">
                            <p className="text-red-500 text-sm font-medium flex items-center justify-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                You need to login to continue to the dashboard.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
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
