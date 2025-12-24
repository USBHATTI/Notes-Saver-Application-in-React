import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ViewPaste = () => {
    const { id } = useParams();
    const allPastes = useSelector(state => state.paste.pastes);
    const paste = allPastes.find(p => p._id === id);

    if (!paste) {
        return <div className='text-white text-center mt-10'>Paste not found</div>;
    }

    return (
        <div className='flex flex-col items-center justify-center w-full'>
            <div className='flex justify-center gap-2 mt-4 w-full'>
                <input 
                    type="text" 
                    className='p-2 w-[63%] pl-7 rounded-2xl mt-3 bg-black text-white' 
                    disabled 
                    placeholder='Title' 
                    value={paste.title} 
                />
            </div> 
            <div className='mt-7 flex justify-center w-full'>
                <textarea
                    disabled
                    className='mt-4 rounded-2xl w-[90%] max-w-4xl p-4 bg-black text-white'
                    placeholder='Content'
                    value={paste.content}
                    rows={20}
                />
            </div>
            <p className='text-gray-500 text-xs mt-4'>{new Date(paste.createdAt).toLocaleDateString()}</p>
        </div>
    )
}

export default ViewPaste
        </div>
  )
}

export default ViewPaste
