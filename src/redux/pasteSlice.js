import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem('pastes')
  ? JSON.parse(localStorage.getItem('pastes'))
  : [],
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
   addtoPastes: (state, action) => {
      const paste = action.payload;
      // Check if paste already exists to avoid duplicates (optional)
      const existingPaste = state.pastes.find((p) => p._id === paste._id);
      
      if (existingPaste) {
        toast.error("Paste already exists!");
        return;
      }

      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste created successfully!");
    },
    updateToPastes: (state, action) =>{
      const paste = action.payload;
      const index = state.pastes.findIndex((p) => p._id === paste._id);
      if (index >= 0){
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste updated successfully!");

      }
      
    },
    removeFromPastes: (state, action) =>{
      state.pastes = [];
      localStorage.removeItem("pastes");

        
    },
    resetAllPastes: (state, action) =>{
      const pasteId = action.payload;
      console.log("Resetting all pastes", pasteId);
      const index = state.pastes.findIndex((p) => p._id === pasteId);

      if(index >= 0){
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Deleted");
      }



    },
  },
})

// Action creators are generated for each case reducer function
export const { addtoPastes, updateToPastes, removeFromPastes, resetAllPastes  } = pasteSlice.actions

export default pasteSlice.reducer