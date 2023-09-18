import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editTodo, deleteTodo, doneTodo } from './Slice/todoSlice';

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
    if (newText === "" | newDate === ""){
      setIsEditing(false);
      setNewText(todo.text);
      setNewDate(todo.date);
    }else{
      dispatch(editTodo({ id: todo.id, text: newText, date: newDate }));
      setIsEditing(false);
    }
  };

  const handleDone = () => {
    dispatch(doneTodo({id:todo.id}))
  }

  return (
    <div>
      {isEditing ? (
        <div>
          <input type="text" value={newText} onChange={(e) => setNewText(e.target.value)} ref={inputRef}/>
          <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)}/>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>{todo.text}</p>
          <p>{todo.date}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={() => dispatch(deleteTodo({ id: todo.id }))}>Delete</button>
          {todo.completed ? <p onClick={handleDone}>done</p> : <p onClick={handleDone}>pending</p>}
        </div>
      )}
    </div>
  );
}

export default Todoitem;
