import { configureStore } from '@reduxjs/toolkit'
import  todos  from '../Slice/todoSlice'


const store = configureStore({
    reducer : {
        todo : todos
    },
})

export default store