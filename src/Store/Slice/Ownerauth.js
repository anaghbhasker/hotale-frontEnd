import { createSlice } from '@reduxjs/toolkit'

const initialState={
    owner:null,
    name:null,
    token:null
}

export const ownerLoginSlice=createSlice({
    name:"ownerLogin",
    initialState,
    reducers:{
        setLogin:(state,action)=>{
            state.owner = action.payload.owner;
            state.name = action.payload.name;
            state.token = action.payload.token;
        },
        setLogout:(state,action)=>{
            state.owner = null;
            state.name = null;
            state.token = null;
        }
    }
})

export const { setLogin,setLogout }=ownerLoginSlice.actions;
export default ownerLoginSlice.reducer;
