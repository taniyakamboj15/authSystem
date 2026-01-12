import { useState, useEffect, useRef } from 'react';
import api from '../../api/axios';
import { useSocket } from '../../context/SocketContext';

interface User {
    _id: string;
    name: string;
    email: string;
}

interface UserSearchProps {
    onSelect: (userId: string) => void;
    selectedUserId: string;
}

const UserSearch = ({ onSelect, selectedUserId }: UserSearchProps) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<User[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const { onlineUsers } = useSocket();

    // Debounce search
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (query.length >= 2) {
                setIsSearching(true);
                try {
                    const res = await api.get(`/auth/search?query=${query}`);
                    setResults(res.data);
                    setShowDropdown(true);
                } catch (err) {
                    console.error('Search failed', err);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setResults([]);
                setShowDropdown(false);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (user: User | null) => {
        if (user) {
            onSelect(user._id);
            setQuery(user.name); // Set input to selected user name
            setShowDropdown(false);
        } else {
            onSelect(''); // Public
            setQuery('');
        }
    };
    
    // Find selected user name if ID is provided but query is empty (initial state)
    // Note: This is tricky if we don't have the user object. 
    // For now, if selectedUserId is empty, we show 'Everyone (Public)' in UI logic logic below.

    const isOnline = (userId: string) => onlineUsers.some(u => u.userId === userId);

    return (
        <div className="relative" ref={searchRef}>
            <label className="block text-sm text-slate-500 dark:text-slate-400 mb-2">Send to:</label>
            
            <div className="relative">
                <input
                    type="text"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-xl p-2.5 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none transition-colors"
                    placeholder="Search by name or email..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        if (e.target.value === '') onSelect('');
                    }}
                    onFocus={() => {
                        if (query.length >= 2) setShowDropdown(true);
                    }}
                />
                
                {query === '' && selectedUserId === '' && (
                     <div className="absolute right-3 top-2.5 text-xs text-slate-400 pointer-events-none">
                        Public (Everyone)
                     </div>
                )}
                
                 {isSearching && (
                    <div className="absolute right-3 top-3">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-500"></div>
                    </div>
                )}
            </div>

            {/* Dropdown Results */}
            {showDropdown && results.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-xl max-h-60 overflow-y-auto custom-scrollbar">
                    <div 
                        className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer text-slate-700 dark:text-slate-200"
                        onClick={() => handleSelect(null)}
                    >
                        <span className="font-bold">🌍 Everyone (Public)</span>
                    </div>
                    
                    {results.map(user => (
                        <div 
                            key={user._id}
                            className={`p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer flex justify-between items-center ${selectedUserId === user._id ? 'bg-indigo-50 dark:bg-indigo-500/10' : ''}`}
                            onClick={() => handleSelect(user)}
                        >
                            <div className="space-y-0.5">
                                <div className="font-medium text-slate-900 dark:text-slate-100">{user.name}</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">{user.email}</div>
                            </div>
                            {isOnline(user._id) && (
                                <span className="text-xs text-green-500 font-medium px-2 py-0.5 bg-green-100 dark:bg-green-500/20 rounded-full">
                                    Online
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            )}
            
            {showDropdown && results.length === 0 && query.length >= 2 && !isSearching && (
                 <div className="absolute z-10 w-full mt-1 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-xl p-4 text-center text-slate-500">
                    No users found.
                 </div>
            )}
        </div>
    );
};

export default UserSearch;
