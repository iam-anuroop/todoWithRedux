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
    const [isAdding, setIsAddinng] = useState(false);
    const [ismotion, setIsmotion] = useState(false);

    const handleSubmit = (e) =>{
        e.preventDefault()
        let newtodo = reference.current.text.value
        let newdate = reference.current.date.value
        console.log('type=',typeof(Date(newdate)));
        console.log('type=',typeof(Date.now()));
        if (newdate === "" | newtodo === ""){
            alert("Value error")
            setIsmotion(false)
        }else{
        console.log('kona',newdate,newtodo);
        dispatch(addTodo({text:newtodo.trim(),date:newdate}));
        setDate("");
        setText("");
        setIsAddinng(false)
        setIsmotion(false)

        }
    }
    const AddHandler =()=>{
        setIsmotion(true)
        setTimeout(()=>{
            setIsAddinng(true)
        },1200)
    }


  return (
      <div className='main'>
        <div className='main2'>
            <h3 className='heading'>Mytodo</h3>
            {isAdding?(
                <div className='form-back-f'>
                    <div className='anime'></div>
                <div className='input-form'>
                 <form className='form-form' ref={reference} onSubmit={handleSubmit}>
                  <input className='add-i' value={text} onChange={(e)=>setText(e.target.value)} name='text' type='text'/>
                  <input className='add-i' value={date} onChange={(e)=>setDate(e.target.value)} name='date' type='date'/>
                  <input className='add-b' type='submit'/>
                 </form>
                </div>
                  <div onClick={()=>{
                    setIsAddinng(false)
                    setIsmotion(false)
                    }} className="add-bb"><i  className="fa-solid fa-arrow-left"></i></div>
                </div>
            ):(
            <div className={`${!ismotion ? 'move' : 'move-f'}`}>
            <i onClick={AddHandler} className={`${!ismotion ? 'addicon fa-solid fa-circle-plus' : 'addicon-f fa-solid fa-circle-plus'}`}></i>
            </div>
            )}
            <div className='mapdiv'>
              {todos.map((todo)=>{
                  return(
                      <Todoitem key={todo.id} todo={todo}/>
                      )
              })}
              </div>
        </div>
    </div>
  )
}

export default Todo 