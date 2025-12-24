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
                setTitle(existingPaste.title);
                setValue(existingPaste.content);
            }
        
        }, [pasteId])

    function createPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId || new Date().getTime().toString(36),
            createdAt: new Date().toISOString(), // Fixed typo: 'createAt' -> 'createdAt'
        }
        
        

        if (pasteId) {
            dispatch(updateToPastes(paste));
            toast.success("Paste updated successfully!"); // Trigger toast here
        }
        else {
            dispatch(addtoPastes(paste));
            toast.success("Paste created successfully!"); // Trigger toast here
        }

        setTitle('');
        setValue('');
        setSearchParams({});
    }
    return (
        <div>
            <div>
                <input type="text" className='p-2 w-[63%] pl-7 rounded-2xl mt-3 bg-black text-white' placeholder='Enter Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                <button className='ml-2' onClick={createPaste}>
                    {
                        pasteId ? `Edit Paste` : 'Create New Paste'
                    }
                </button>
            </div>
            <div className='mt-7'>
                <textarea
                    className='mt-4 rounded-2xl min-w-125 p-4 bg-black text-white'
                    placeholder='Enter Content'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    rows={20}
                />


            </div>
        </div>

    )
}

export default Home
