import { createSlice } from "@reduxjs/toolkit";


const todoSlice = createSlice({
    name : 'todo',
    initialState : [],
    reducers : {
        addTodo : (state,action) => {
            state.push({
                id : Date.now(),
                text : action.payload.text,
                completed : false,
                date : action.payload.date
            });
            console.log(state,'staaaaaaaaaaaaaaaate');
        },
        editTodo : (state,action) => {
            const todo = state.find((todo) => todo.id === action.payload.id);
            if (todo){
                todo.text = action.payload.text;
                todo.date = action.payload.date;
            }
        },
        deleteTodo : (state,action) => {
            return state.filter((todo)=> todo.id!==action.payload.id);
        },
        doneTodo : (state,action) => {
            const todo = state.find((todo) => todo.id === action.payload.id);
            if (todo.completed){
                todo.completed = false ;
            }else{
                todo.completed = true ;
            }
        }
    }
});

export const { addTodo,editTodo,deleteTodo,doneTodo } = todoSlice.actions
export default todoSlice.reducer