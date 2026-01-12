
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { ExclamationCircleIcon } from '../components/icons/ExclamationCircleIcon';
import { MailIcon } from '../components/icons/MailIcon';
import { LockClosedIcon } from '../components/icons/LockClosedIcon';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        isLoading,
        error,
        submitHandler
    } = useLogin();

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4 transition-colors duration-300">
            <div className="w-full max-w-5xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row fade-in animate-slide-up transition-colors duration-300">

                {/* Visual Side (Left) */}
                <div className="w-full md:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 p-12 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl"></div>
                        {/* Abstract wave pattern or shapes could go here */}
                    </div>

                    <div className="relative z-10">
                        <div className="text-3xl font-bold mb-2 tracking-tight">DevDrop</div>
                        <div className="h-1 w-12 bg-pink-500 rounded-full"></div>
                    </div>

                    <div className="relative z-10 my-10">
                        <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                            Share with Confidence
                        </h2>
                        <p className="text-indigo-100 text-lg leading-relaxed">
                            Secure, encrypted file sharing for developers. Log in to access your personal dashboard.
                        </p>
                    </div>

                    <div className="relative z-10 text-sm text-indigo-200">
                        © 2026 AuthSys Inc. All rights reserved.
                    </div>
                </div>

                {/* Form Side (Right) */}
                <div className="w-full md:w-1/2 p-8 sm:p-12 md:p-16 flex flex-col justify-center bg-white dark:bg-slate-800 relative transition-colors duration-300">
                    <div className="max-w-md mx-auto w-full">
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Sign In</h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-8">Please enter your details to continue</p>

                        {error && (
                            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm flex items-start gap-3 animate-fade-in break-words">
                                <ExclamationCircleIcon className="w-5 h-5 shrink-0 mt-0.5" />
                                <span className="flex-1">{error}</span>
                            </div>
                        )}

                        <form onSubmit={submitHandler} className="space-y-5">
                            <Input
                                label="Email Address"
                                type="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                startIcon={<MailIcon className="w-5 h-5" />}
                            />
                            <div>
                                <Input
                                    label="Password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    startIcon={<LockClosedIcon className="w-5 h-5" />}
                                />
                                <div className="flex justify-end -mt-4 mb-2">
                                    <Link to="/forgot-password" className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                                        Forgot Password?
                                    </Link>
                                </div>
                            </div>

                            <div className="pt-2">
                                <Button type="submit" isLoading={isLoading} className="shadow-xl shadow-indigo-500/30">
                                    Sign In
                                </Button>
                            </div>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                Don't have an account?{' '}
                                <Link to="/signup" className="text-indigo-600 hover:text-indigo-500 font-bold transition-colors">
                                    Create Account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
