import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { CheckCircleIcon } from '../components/icons/CheckCircleIcon';
import { ExclamationCircleIcon } from '../components/icons/ExclamationCircleIcon';
import { useForgotPassword } from '../hooks/useForgotPassword';

const ForgotPassword: React.FC = () => {
    const {
        email,
        setEmail,
        isLoading,
        message,
        error,
        submitHandler
    } = useForgotPassword();

    return (
        <div className="container min-h-[90vh] flex justify-center items-center py-12">
            <div className="glass-panel w-full max-w-md p-8 sm:p-10 fade-in animate-slide-up relative overflow-hidden">
                {/* Decorative background glow */}
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-pink-500/20 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Forgot Password</h2>
                    <p className="text-center text-slate-500 mb-8 text-sm">Enter your email to receive an OTP</p>

                    {message && (
                        <div className="bg-green-500/10 border border-green-500/20 text-green-600 px-4 py-3 rounded-xl mb-6 text-sm text-center flex items-center justify-center gap-2 animate-fade-in">
                            <CheckCircleIcon />
                            {message}
                        </div>
                    )}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm text-center flex items-center justify-center gap-2 animate-fade-in">
                            <ExclamationCircleIcon />
                            {error}
                        </div>
                    )}

                    <form onSubmit={submitHandler} className="space-y-4">
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <div className="pt-2">
                            <Button type="submit" isLoading={isLoading}>
                                Send OTP
                            </Button>
                        </div>
                    </form>

                    <div className="text-center mt-8 pt-6 border-t border-slate-200">
                        <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-semibold text-sm transition-colors flex items-center justify-center gap-2">
                            <ArrowLeftIcon />
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
