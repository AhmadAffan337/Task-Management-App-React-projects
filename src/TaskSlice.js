import { createSlice } from "@reduxjs/toolkit";

const TaskSlice=createSlice({
 name:'task',
 initialState:
 {
    students:[]
 },

 reducers:{
   
add:(state,action)=>{

    state.students.push(action.payload)
},

remove:(state,action)=>
{
    state.students=state.students.filter((e)=>e.id!==action.payload)
      
},

edit_values:(state,action)=>
{
    state.students=state.students.map((e)=>e.id===action.payload.id?{...e,taskname:action.payload.taskname}:e)
}

}

})

export const {add,remove,edit_values}=TaskSlice.actions

export default TaskSlice.reducer

