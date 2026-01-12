import UserSearch from './UserSearch';
import { useFileUpload } from '../../hooks/useFileUpload';

const UploadPanel = () => {
    const { 
        dragActive, 
        selectedFile, 
        uploadProgress, 
        recipientId, 
        setRecipientId, 
        inputRef, 
        handleDrag, 
        handleDrop, 
        handleChange, 
        uploadFile 
    } = useFileUpload();

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 transition-colors duration-300">
            <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Share File</h2>

            {/* Recipient Selector */}
            <div className="mb-4">
                <UserSearch 
                    selectedUserId={recipientId}
                    onSelect={setRecipientId}
                />
            </div>

            {/* Drop Zone */}
            <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${dragActive ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10' : 'border-slate-200 dark:border-slate-600 hover:border-indigo-300 dark:hover:border-slate-500 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
            >
                <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    onChange={handleChange}
                />

                {selectedFile ? (
                    <div className="space-y-2">
                        <div className="text-indigo-600 dark:text-indigo-400 font-medium truncate">{selectedFile.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</div>
                    </div>
                ) : (
                    <div className="text-slate-400 dark:text-slate-500 pointer-events-none">
                        <p className="mb-2 text-xl">☁️</p>
                        <p className="text-sm">Drag & Drop or Click to Upload</p>
                    </div>
                )}
            </div>

            {/* Progress Bar */}
            {uploadProgress > 0 && (
                <div className="mt-4">
                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                        ></div>
                    </div>
                    <div className="text-right text-xs text-slate-500 dark:text-slate-400 mt-1">{Math.round(uploadProgress)}%</div>
                </div>
            )}

            {/* Upload Button */}
            <button
                disabled={!selectedFile || uploadProgress > 0}
                onClick={uploadFile}
                className={`mt-4 w-full py-2.5 px-4 rounded-xl font-semibold transition-all shadow-lg ${!selectedFile || uploadProgress > 0
                    ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed shadow-none'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-500/25'
                    }`}
            >
                {uploadProgress > 0 ? 'Uploading...' : 'Send File'}
            </button>
        </div>
    );
};

export default UploadPanel;
