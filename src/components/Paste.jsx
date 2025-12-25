import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Paste = () => {
    const pastes = useSelector((state) => state.paste.pastes);
    const [searchTerm, setSearchTerm] = React.useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const filteredData = pastes.filter((paste) =>
        paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleDelete(pasteId) {
        dispatch(removeFromPastes(pasteId));
    }

    function handleShare(pasteId) {
        const url = `${window.location.origin}/pastes/${pasteId}`;
        navigator.clipboard.writeText(url)
            .then(() => {
                toast.success("Link copied to clipboard!");
            })
            .catch(() => {
                toast.error("Failed to copy link");
            });
    }

    return (
        <div className='w-full min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black py-6 sm:py-8 px-4 sm:px-6 lg:px-8'>
            <div className='w-full max-w-7xl mx-auto'>
                {/* Header Section */}
                <div className='text-center mb-6 sm:mb-8'>
                    <h2 className='text-3xl sm:text-4xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2'>
                        📚 All Pastes
                    </h2>
                    <p className='text-gray-400 text-xs sm:text-sm'>
                        Browse, edit, and manage your saved pastes
                    </p>
                </div>

                {/* Search Bar */}
                <div className='mb-6 sm:mb-8'>
                    <div className='relative w-full'>
                        <span className='absolute inset-y-0 left-4 flex items-center text-gray-400 text-lg'>
                            🔍
                        </span>
                        <input
                            className='w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl bg-gray-800 text-white border-2 border-gray-700 focus:border-blue-500 focus:outline-none transition-all duration-300 placeholder-gray-500 text-sm sm:text-base'
                            type="search"
                            placeholder='Search pastes by title...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Pastes Grid */}
                <div className='grid gap-4 sm:gap-6'>
                    {
                        filteredData.length > 0 ?
                            filteredData.map((paste) => {
                                return (
                                    <div 
                                        key={paste._id} 
                                        className='bg-linear-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 overflow-hidden transform hover:scale-[1.01] transition-all duration-300 hover:shadow-blue-500/20'
                                    >
                                        <div className='p-4 sm:p-6'>
                                            {/* Title */}
                                            <h3 className='text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2 wrap-break-word'>
                                                📄 {paste.title}
                                            </h3>
                                            
                                            {/* Content Preview */}
                                            <div className='bg-gray-950 rounded-lg p-3 sm:p-4 mb-4 max-h-24 sm:max-h-32 overflow-y-auto'>
                                                <p className='text-gray-300 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap wrap-break-word'>
                                                    {paste.content.length > 200 
                                                        ? paste.content.substring(0, 200) + '...' 
                                                        : paste.content
                                                    }
                                                </p>
                                            </div>

                                            {/* Date */}
                                            <p className='text-gray-500 text-xs mb-4 flex items-center gap-2'>
                                                🕒 Created: {new Date(paste.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>

                                            {/* Action Buttons */}
                                            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3'>
                                                <button
                                                    onClick={() => navigate(`/?pasteId=${paste._id}`)}
                                                    className='px-3 sm:px-4 py-2 sm:py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 text-xs sm:text-sm'
                                                >
                                                    ✏️ Edit
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/pastes/${paste._id}`)}
                                                    className='px-3 sm:px-4 py-2 sm:py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/50 text-xs sm:text-sm'
                                                >
                                                    👁️ View
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(paste._id)}
                                                    className='px-3 sm:px-4 py-2 sm:py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-red-500/50 text-xs sm:text-sm'
                                                >
                                                    🗑️ Delete
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(paste.content);
                                                        toast.success("Copied!")
                                                    }}
                                                    className='px-3 sm:px-4 py-2 sm:py-2.5 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 text-xs sm:text-sm'
                                                >
                                                    📋 Copy
                                                </button>
                                                <button
                                                    onClick={() => handleShare(paste._id)}
                                                    className='px-3 sm:px-4 py-2 sm:py-2.5 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 text-xs sm:text-sm col-span-2 sm:col-span-1'
                                                >
                                                    🔗 Share
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            : 
                            <div className='text-center py-12 sm:py-20'>
                                <div className='text-5xl sm:text-6xl mb-4'>📭</div>
                                <p className='text-gray-400 text-lg sm:text-xl font-semibold'>No pastes found</p>
                                <p className='text-gray-500 text-xs sm:text-sm mt-2'>
                                    {searchTerm ? 'Try a different search term' : 'Create your first paste to get started'}
                                </p>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Paste