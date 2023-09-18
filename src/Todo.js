import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Todoitem from './Todoitem'
import { addTodo } from './Slice/todoSlice'
import { useDispatch } from 'react-redux'
import './Todo.scss'



function Todo() {

    const todos = useSelector((state) => state.todo)
    console.log(todos);
    const dispatch = useDispatch();
    const reference = useRef()
    const [date,setDate] = useState("")
    const [text,setText] = useState("")

    const handleSubmit = (e) =>{
        e.preventDefault()
        let newtodo = reference.current.text.value
        let newdate = reference.current.date.value
        console.log('type=',typeof(Date(newdate)));
        console.log('type=',typeof(Date.now()));
        if (newdate === "" | newtodo === ""){
            alert("dont be over smart")
        }else{
        console.log('kona',newdate,newtodo);
        dispatch(addTodo({text:newtodo,date:newdate}));
        setDate("");
        setText("");
        }
    }


  return (
      <div>
        <div>
            <h1>mytodo</h1>
            <form ref={reference} onSubmit={handleSubmit}>
            <input value={text} onChange={(e)=>setText(e.target.value)} name='text' type='text'/>
            <input value={date} onChange={(e)=>setDate(e.target.value)} name='date' type='date'/>
            <input type='submit'/>
            </form>
              {todos.map((todo)=>{
                  return(
                      <Todoitem key={todo.id} todo={todo}/>
                      )
              })}
        </div>
    </div>
  )
}

export default Todo