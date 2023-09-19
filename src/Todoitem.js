import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editTodo, deleteTodo, doneTodo } from './Slice/todoSlice';
import './Todoitem.css'

function Todoitem({ todo }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);
  const [newDate, setNewDate] = useState(todo.date);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewText(todo.text);
    setNewDate(todo.date);
  };

  const handleSave = () => {
    if (newText.trim() === "" | newDate === ""){
      setIsEditing(false);
      setNewText(todo.text);
      setNewDate(todo.date);
    }else{
      setNewText(todo.text.trim());
      dispatch(editTodo({ id: todo.id, text: newText, date: newDate }));
      setIsEditing(false);
    }
  };

  return (
    <div className='input-main'>
      {isEditing ? (
        <div className='main-input'>
          <div className='input-div1'>
          <input className='main-input-i' type="text" value={newText} onChange={(e) => setNewText(e.target.value)} ref={inputRef}/>
          <input className='main-input-i' type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)}/>
          </div>
          <div className='savebtn'>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className='main-todo'>
          <p className='main-todo-p'>{todo.text}</p>
          <p className='main-todo-p'>{todo.date}</p>
          <div className='icon-div1'>
          <i onClick={handleEdit} style={{color:'blue'}} className="main-todo-b fa-solid fa-pen-to-square"></i>
          <i onClick={() => dispatch(deleteTodo({ id: todo.id }))} style={{color:"red"}} className="main-todo-b fa-solid fa-trash"></i>
          {todo.completed ? <i style={{color:'green'}} onClick={()=>dispatch(doneTodo({id:todo.id}))} className="fa-solid fa-circle-check"></i>
           : <i style={{color:'grey'}} onClick={()=>dispatch(doneTodo({id:todo.id}))} className="fa-solid fa-circle-xmark"></i>}
           </div>
        </div>
      )}
    </div>
  );
}

export default Todoitem;
