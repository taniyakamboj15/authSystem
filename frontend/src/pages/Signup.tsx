
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { ExclamationCircleIcon } from '../components/icons/ExclamationCircleIcon';
import { UserIcon } from '../components/icons/UserIcon';
import { MailIcon } from '../components/icons/MailIcon';
import { LockClosedIcon } from '../components/icons/LockClosedIcon';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
    const {
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        isLoading,
        error,
        submitHandler
    } = useSignup();

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4 transition-colors duration-300">
            <div className="w-full max-w-5xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse fade-in animate-slide-up transition-colors duration-300">

                {/* Visual Side (Right) */}
                <div className="w-full md:w-1/2 bg-gradient-to-br from-purple-600 to-pink-600 p-12 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-10 left-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 flex justify-end">
                        <div className="text-3xl font-bold mb-2 tracking-tight">DevDrop</div>
                    </div>

                    <div className="relative z-10 my-10">
                        <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                            Start Sharing Now
                        </h2>
                        <p className="text-pink-100 text-lg leading-relaxed">
                            Join DevDrop to share code, binaries, and assets securely with your team.
                        </p>
                    </div>

                    <div className="relative z-10 text-sm text-pink-200">
                        Join over 10,000+ users today.
                    </div>
                </div>

                {/* Form Side (Left) */}
                <div className="w-full md:w-1/2 p-8 sm:p-12 md:p-16 flex flex-col justify-center bg-white dark:bg-slate-800 relative transition-colors duration-300">
                    <div className="max-w-md mx-auto w-full">
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Create Account</h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-8">Start your journey with us</p>

                        {error && (
                            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm flex items-start gap-3 animate-fade-in break-words">
                                <ExclamationCircleIcon className="w-5 h-5 shrink-0 mt-0.5" />
                                <span className="flex-1">{error}</span>
                            </div>
                        )}

                        <form onSubmit={submitHandler} className="space-y-4">
                            <Input
                                label="Full Name"
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                startIcon={<UserIcon className="w-5 h-5" />}
                            />
                            <Input
                                label="Email Address"
                                type="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                startIcon={<MailIcon className="w-5 h-5" />}
                            />
                            <Input
                                label="Password"
                                type="password"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                startIcon={<LockClosedIcon className="w-5 h-5" />}
                            />
                            <Input
                                label="Confirm Password"
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                startIcon={<LockClosedIcon className="w-5 h-5" />}
                            />

                            <div className="pt-4">
                                <Button type="submit" isLoading={isLoading} className="shadow-xl shadow-pink-500/30 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500">
                                    Create Account
                                </Button>
                            </div>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                Already have an account?{' '}
                                <Link to="/login" className="text-purple-600 hover:text-purple-500 font-bold transition-colors">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
