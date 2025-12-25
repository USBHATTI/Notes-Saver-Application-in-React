import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addtoPastes, updateToPastes } from '../redux/pasteSlice.js';
import toast from 'react-hot-toast';

const Home = () => {
    const [title, setTitle] = React.useState('');
    const [value, setValue] = React.useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get('pasteId');
    const dispatch = useDispatch();
    const allPaste = useSelector((state) => state.paste.pastes);

    useEffect(() => {
        if(pasteId){
            const existingPaste = allPaste.find((p) => p._id === pasteId);
            if(existingPaste) {
                setTitle(existingPaste.title);
                setValue(existingPaste.content);
            }
        }
    }, [pasteId])

    function createPaste() {
        if (!title.trim()) {
            toast.error("Title cannot be empty!");
            return;
        }

        if (!value.trim()) {
            toast.error("Content cannot be empty!");
            return;
        }

        const paste = {
            title: title.trim(),
            content: value.trim(),
            _id: pasteId || new Date().getTime().toString(36),
            createdAt: new Date().toISOString(),
        }
        
        if (pasteId) {
            dispatch(updateToPastes(paste));
        }
        else {
            dispatch(addtoPastes(paste));
        }

        setTitle('');
        setValue('');
        setSearchParams({});
    }

    return (
        <div className='w-full min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black py-6 sm:py-8 px-4 sm:px-6 lg:px-8'>
            <div className='w-full max-w-6xl mx-auto'>
                {/* Header Section */}
                <div className='text-center mb-6 sm:mb-8'>
                    <h2 className='text-3xl sm:text-4xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2'>
                        {pasteId ? '✏️ Edit Your Paste' : '✨ Create New Paste'}
                    </h2>
                    <p className='text-gray-400 text-xs sm:text-sm'>
                        {pasteId ? 'Update your existing paste' : 'Save and share your text snippets'}
                    </p>
                </div>

                {/* Input Card */}
                <div className='bg-gray-800 rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-gray-700'>
                    {/* Title Input */}
                    <div className='mb-4 sm:mb-6'>
                        <label className='block text-gray-300 font-semibold mb-2 text-xs sm:text-sm'>
                            📌 Title
                        </label>
                        <input 
                            type="text" 
                            className='w-full p-3 sm:p-4 rounded-xl bg-gray-900 text-white border-2 border-gray-700 focus:border-blue-500 focus:outline-none transition-all duration-300 placeholder-gray-500 text-sm sm:text-base' 
                            placeholder='Enter a catchy title...' 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                        />
                    </div>

                    {/* Content Textarea */}
                    <div className='mb-4 sm:mb-6'>
                        <label className='block text-gray-300 font-semibold mb-2 text-xs sm:text-sm'>
                            📝 Content
                        </label>
                        <textarea
                            className='w-full p-3 sm:p-4 rounded-xl bg-gray-900 text-white border-2 border-gray-700 focus:border-blue-500 focus:outline-none transition-all duration-300 placeholder-gray-500 resize-none text-sm sm:text-base'
                            placeholder='Paste your content here...'
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            rows={12}
                        />
                    </div>

                    {/* Action Button */}
                    <div className='flex justify-center'>
                        <button 
                            className='w-full sm:w-auto px-6 sm:px-8 py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl text-sm sm:text-base' 
                            onClick={createPaste}
                        >
                            {pasteId ? '💾 Update Paste' : '🚀 Create Paste'}
                        </button>
                    </div>

                    {/* Info Footer */}
                    <div className='mt-4 sm:mt-6 text-center text-gray-500 text-xs'>
                        {pasteId ? '✨ Your changes will be saved' : '💡 Your paste will be saved locally'}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home