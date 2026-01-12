import UploadPanel from '../components/fileshare/UploadPanel';
import UserList from '../components/fileshare/UserList';
import FileFeed from '../components/fileshare/FileFeed';

const FileShare = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-8 transition-colors duration-300">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Panel: Upload & User Selection */}
                <div className="md:col-span-1 space-y-6">
                    <UploadPanel />
                    <UserList />
                </div>

                {/* Right Panel: File Feed */}
                <div className="md:col-span-2">
                    <FileFeed />
                </div>
            </div>
        </div>
    );
};

export default FileShare;
