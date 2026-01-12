
import Input from '../components/Input';
import Button from '../components/Button';
import { CheckCircleIcon } from '../components/icons/CheckCircleIcon';
import { ExclamationCircleIcon } from '../components/icons/ExclamationCircleIcon';
import { useProfile } from '../hooks/useProfile';

const Profile = () => {
    const {
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
    } = useProfile();

    return (
        <div className="container min-h-[90vh] flex justify-center items-center py-12 transition-colors duration-300">
            <div className="glass-panel w-full max-w-2xl p-8 sm:p-10 fade-in animate-slide-up relative overflow-hidden dark:bg-slate-800/80 dark:border-slate-700">

                <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-text to-text-muted dark:from-white dark:to-slate-400 bg-clip-text text-transparent">User Profile settings</h2>

                    {message && (
                        <div className="bg-success-bg border border-success/20 text-success px-4 py-3 rounded-xl mb-6 text-sm text-center flex items-center justify-center gap-2 animate-fade-in">
                            <CheckCircleIcon />
                            {message}
                        </div>
                    )}
                    {error && (
                        <div className="bg-danger-bg border border-danger/20 text-danger px-4 py-3 rounded-xl mb-6 text-sm text-center flex items-center justify-center gap-2 animate-fade-in">
                            <ExclamationCircleIcon />
                            {error}
                        </div>
                    )}

                    <form onSubmit={submitHandler} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Name"
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Input
                                label="Email Address"
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-slate-100 dark:bg-slate-800 px-4 text-sm text-slate-500 dark:text-slate-400">Security</span>
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold text-text dark:text-white mb-4">Change Password</h3>

                        <div className="space-y-4">
                            <Input
                                label="Old Password"
                                type="password"
                                placeholder="Verify current password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="New Password"
                                    type="password"
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Input
                                    label="Confirm New Password"
                                    type="password"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button type="submit" isLoading={isLoading}>
                                Update Profile
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
