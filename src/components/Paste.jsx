import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes, resetAllPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Paste = () => {
    const pastes = useSelector((state) => state.paste.pastes);

    const [searchTerm, setSearchTerm] = React.useState("");
    const dispatch = useDispatch();
    const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()));

    function handleDelete(pasteId){
        dispatch(removeFromPastes(pasteId));
    }
  return (
    <div>
        <input 
        className='p-2 rounded-xl min-w-150  bg-black text-white'
        type="search"
        placeholder='Search Pastes by Title'
        value={searchTerm}
        onChange={(e)=> setSearchTerm(e.target.value)}
         />
         <div className='flex flex-col gap-5 mt-5'>
            {
                filteredData.length > 0 ? 
                filteredData.map ((paste) => {
                    return (
                        <div key={paste._id} className='p-4 bg-gray-800 rounded-lg border border-gray-700'>
                            <h3 className='text-white font-bold mb-2'>{paste.title}</h3>
                            <p className='text-gray-300 text-sm mb-3'>{paste.content}</p>
                            <div className='flex flex-row place-content-evenly'>
                            <button>
                                <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                                </button>
                            <button > 
                                <a href={`/pastes/${paste?._id}`}> View </a>
                            </button>
                            <button onClick={()=> handleDelete(paste._id)}>Delete</button>
                            <button onClick={()=> {
                                navigator.clipboard.writeText
                                (paste?.content)
                                toast.success("copied")
                            }}>Copy</button>
                            <button>Share</button>
                            </div>
                            <p className='text-gray-500 text-xs'>{new Date(paste.createdAt).toLocaleDateString()}</p>
                        </div>
                    )
                })
                : <p className='text-white'>No pastes found</p>
            }
         </div>
    </div>
  )
}

export default Paste
