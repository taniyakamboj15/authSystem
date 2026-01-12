import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { logout } from '../slices/authSlice';
import api from '../api/axios';
import Button from './Button';
import { LogOutIcon } from './icons/LogOutIcon';
import { ThemeToggle } from './ThemeToggle';

const Navbar = () => {
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
        <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 shadow-sm transition-all duration-300">
            <div className="container flex items-center justify-between h-16 px-4 mx-auto">
                <Link to="/" className="flex items-center gap-2.5 group">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 font-bold text-lg">
                        D
                    </div>
                    <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:to-pink-600 transition-all duration-300">
                        DevDrop
                    </span>
                </Link>

                <div className="flex items-center gap-4">
                    {/* Theme Toggle */}
                    <ThemeToggle />

                    {userInfo ? (
                        <>
                            <Link
                                to="/fileshare"
                                className="group flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-500 hover:text-indigo-600 hover:bg-slate-50 transition-all duration-300"
                            >
                                <span className="hidden sm:inline">File Share</span>
                            </Link>

                            <Link
                                to="/profile"
                                className="group flex items-center gap-3 pl-1 pr-4 py-1.5 rounded-full hover:bg-slate-100/80 transition-all duration-300 border border-transparent hover:border-slate-200"
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-md ring-2 ring-white group-hover:ring-indigo-100 transition-all">
                                    {userInfo.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">
                                        {userInfo.name.split(' ')[0]}
                                    </span>
                                </div>
                            </Link>

                            <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

                            <button
                                onClick={handleLogout}
                                className="group flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all duration-300"
                            >
                                <LogOutIcon className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                                <span className="hidden sm:inline">Sign Out</span>
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link to="/login">
                                <Button variant="ghost" className="!px-4 !py-2 !text-sm font-semibold hover:bg-slate-50 text-slate-600 hover:text-indigo-600 transition-all">
                                    Sign In
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button variant="primary" className="!px-5 !py-2 !text-sm shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 flex items-center gap-2 group">
                                    <span>Get Started</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 transition-transform group-hover:translate-x-1">
                                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
