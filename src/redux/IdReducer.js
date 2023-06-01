import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    id: null
}

const idReducer = createReducer(initialState,{
    'SET_ID' : (state,action) => {
        state.id = action.payload
    }
})

export default idReducer;                                                                        