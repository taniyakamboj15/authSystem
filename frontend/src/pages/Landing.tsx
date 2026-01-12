import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import Button from '../components/Button';

const Landing = () => {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    // Effect to handle navigation if needed, but we'll use conditional rendering
    useEffect(() => {
        // Any specific side effects
    }, [userInfo, navigate]);

    const handleGetStarted = () => {
        if (userInfo) {
            navigate('/fileshare');
        } else {
            navigate('/signup');
        }
    };

    if (userInfo) {
        // --- Logged In View ---
        return (
            <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-6">
                <div className="max-w-4xl w-full">
                    <div className="text-center mb-12 animate-slide-up">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                            Welcome back, {userInfo.name.split(' ')[0]}! 👋
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            Ready to share some code?
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        {/* Send File Card */}
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl shadow-indigo-100 dark:shadow-none border border-slate-100 dark:border-slate-700 hover:shadow-2xl hover:shadow-indigo-200 dark:hover:shadow-indigo-900/20 transition-all duration-300 group cursor-pointer" onClick={() => navigate('/fileshare')}>
                            <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-600 dark:text-indigo-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Send Files</h2>
                            <p className="text-slate-500 dark:text-slate-400 mb-6">Upload and share files securely with your team or globally.</p>
                            <span className="text-indigo-600 dark:text-indigo-400 font-semibold group-hover:translate-x-1 inline-block transition-transform">
                                Go to Dashboard &rarr;
                            </span>
                        </div>

                        {/* Profile Card */}
                        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl shadow-purple-100 dark:shadow-none border border-slate-100 dark:border-slate-700 hover:shadow-2xl hover:shadow-purple-200 dark:hover:shadow-purple-900/20 transition-all duration-300 group cursor-pointer" onClick={() => navigate('/profile')}>
                            <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-purple-600 dark:text-purple-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">My Profile</h2>
                            <p className="text-slate-500 dark:text-slate-400 mb-6">Manage your account settings and security preferences.</p>
                            <span className="text-purple-600 dark:text-purple-400 font-semibold group-hover:translate-x-1 inline-block transition-transform">
                                View Profile &rarr;
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- Guest View ---
    return (
        <div className="relative w-full overflow-hidden">
             {/* Background Effects */}
             <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] animate-float"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="container min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center py-20">
                
                <div className="animate-slide-up max-w-4xl mx-auto px-4">
                    <span className="inline-block px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold text-sm mb-6 border border-indigo-100 dark:border-indigo-800 shadow-sm">
                        🚀 The Future of File Sharing
                    </span>
                    
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 dark:from-white dark:via-slate-200 dark:to-indigo-300 bg-clip-text text-transparent leading-tight tracking-tight">
                        Share Files at <br/>
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Light Speed</span>
                    </h1>
                    
                    <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        DevDrop is the secure, high-speed file sharing platform built for developers. 
                        Encrypted p2p transfers with no size limits.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button 
                            onClick={handleGetStarted}
                            size="lg"
                            className="text-lg w-full sm:w-auto shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40"
                        >
                            Get Started Free
                        </Button>
                        <Button 
                            variant="secondary"
                            size="lg"
                            onClick={() => navigate('/login')}
                            className="text-lg w-full sm:w-auto"
                        >
                            Sign In
                        </Button>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mt-24 text-left">
                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-2xl mb-4">🛡️</div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">End-to-End Secure</h3>
                            <p className="text-slate-500 dark:text-slate-400">Your files are encrypted before they leave your device. Only the recipient can open them.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-2xl mb-4">⚡</div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Blazing Fast</h3>
                            <p className="text-slate-500 dark:text-slate-400">Peer-to-peer technology ensures the fastest possible transfer speeds directly between devices.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-2xl mb-4">∞</div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Limits</h3>
                            <p className="text-slate-500 dark:text-slate-400">Share files of any size. No bandwidth caps or storage restrictions for pro users.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Footer */}
            <footer className="w-full py-8 border-t border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm mt-auto">
                <div className="container text-center text-slate-400 text-sm">
                    © 2026 DevDrop. secure. fast. private.
                </div>
            </footer>
        </div>
    );
};

export default Landing;
