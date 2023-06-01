import {configureStore} from '@reduxjs/toolkit'
import idReducer from './IdReducer'

const store = configureStore({
    reducer: {
        id : idReducer
    }
})

export default store;