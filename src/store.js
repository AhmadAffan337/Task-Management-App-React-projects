import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './TaskSlice'

export default configureStore(
    {
       reducer:{
        
        task:taskReducer
    
    }, 
    }
)