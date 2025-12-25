import React from 'react'
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ViewPaste = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const allPastes = useSelector(state => state.paste.pastes);
    const paste = allPastes.find(p => p._id === id);

    if (!paste) {
        return (
            <div className='w-full min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4'>
                <div className='text-center'>
                    <div className='text-6xl sm:text-8xl mb-4'>😕</div>
                    <h2 className='text-2xl sm:text-3xl font-bold text-white mb-2'>Paste Not Found</h2>
                    <p className='text-gray-400 text-sm sm:text-base mb-6'>The paste you're looking for doesn't exist</p>
                    <button 
                        onClick={() => navigate('/pastes')}
                        className='px-4 sm:px-6 py-2 sm:py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 text-sm sm:text-base'
                    >
                        ← Back to All Pastes
                    </button>
                </div>
            </div>
        );
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(paste.content);
        toast.success("Content copied to clipboard!");
    };

    return (
        <div className='w-full min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black py-6 sm:py-8 px-4 sm:px-6 lg:px-8'>
            <div className='w-full max-w-6xl mx-auto'>
                {/* Header Section */}
                <div className='text-center mb-6 sm:mb-8'>
                    <h2 className='text-3xl sm:text-4xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2'>
                        👁️ View Paste
                    </h2>
                    <p className='text-gray-400 text-xs sm:text-sm'>
                        Read-only view of your paste
                    </p>
                </div>

                {/* View Card */}
                <div className='bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden'>
                    <div className='p-4 sm:p-6 lg:p-8'>
                        {/* Title Section */}
                        <div className='mb-4 sm:mb-6'>
                            <label className='block text-gray-400 font-semibold mb-2 text-xs uppercase tracking-wider'>
                                📌 Title
                            </label>
                            <div className='p-3 sm:p-4 rounded-xl bg-gray-900 border-2 border-gray-700'>
                                <h3 className='text-xl sm:text-2xl font-bold text-white wrap-break-word'>{paste.title}</h3>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className='mb-4 sm:mb-6'>
                            <label className='block text-gray-400 font-semibold mb-2 text-xs uppercase tracking-wider'>
                                📝 Content
                            </label>
                            <div className='p-3 sm:p-4 rounded-xl bg-gray-900 border-2 border-gray-700 max-h-100 sm:max-h-100 overflow-y-auto'>
                                <pre className='text-gray-300 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-mono break-words'>
{paste.content}
                                </pre>
                            </div>
                        </div>

                        {/* Metadata */}
                        <div className='mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-900 rounded-xl'>
                            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-gray-400 text-xs sm:text-sm'>
                                <div className='flex items-center gap-2'>
                                    🕒 <span className='font-semibold'>Created:</span> 
                                    <span className='text-xs sm:text-sm'>
                                        {new Date(paste.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    📊 <span className='font-semibold'>Characters:</span> 
                                    {paste.content.length.toLocaleString()}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4'>
                            <button
                                onClick={() => navigate(`/?pasteId=${paste._id}`)}
                                className='w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 text-sm sm:text-base'
                            >
                                ✏️ Edit Paste
                            </button>
                            <button
                                onClick={handleCopy}
                                className='w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 text-sm sm:text-base'
                            >
                                📋 Copy Content
                            </button>
                            <button
                                onClick={() => navigate('/pastes')}
                                className='w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-700 text-white font-bold rounded-xl hover:bg-gray-600 transform hover:scale-105 transition-all duration-300 shadow-lg text-sm sm:text-base'
                            >
                                ← Back to All
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewPaste