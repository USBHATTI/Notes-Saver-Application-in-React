import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pastes: localStorage.getItem('pastes')
  ? JSON.parse(localStorage.getItem('pastes'))
  : [],
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addtoPastes: (state, action) =>{
        
    },
    updateToPastes: (state, action) =>{
        
    },
    removeFromPastes: (state, action) =>{
        
    },
    resetAllPastes: (state, action) =>{

    },
  },
})

// Action creators are generated for each case reducer function
export const { addtoPastes, updateToPastes, removeFromPastes, resetAllPastes  } = pasteSlice.actions

export default pasteSlice.reducer