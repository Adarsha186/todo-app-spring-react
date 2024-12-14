import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateTodo, getTodoById } from '../services/TodoService'

const TodoEdit = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [todo, setTodo] = useState({
        title: '',
        description: '',
        completed: false
    })

    useEffect(() => {
        fetchTodo();
    },[]);

    const fetchTodo = async () => {
        const response = await getTodoById(id);
        console.log(response.data);
        setTodo(response.data);
    }

    const handleInputChange = async (event) => {
        setTodo({
            ...todo,
            [event.target.name]: event.target.value
        })
    }

    const handleCheckBoxChange = async(event) => {
        setTodo({
            ...todo,
            completed: event.target.checked
        })
    }

    const handleUpdate = async () => {
        try{
            const response = await updateTodo(id, todo);
            console.log("Updated task : ", response.data);
            navigate('/');
        }
        catch(error){
            console.log("Error updating task : ", error);
        }
        
    }

    const goBack = async () => {
        navigate(-1);
    }

    return (
        <div>
            <h2>Edit Task</h2>
            <input
                type='text'
                placeholder='Task Title'
                name='title'
                value={todo.title}
                onChange={handleInputChange}
            />
            <input
                type='text'
                placeholder='Task Description'
                name='description'
                value={todo.description}
                onChange={handleInputChange}
            />
            <input
                type='checkbox'
                checked={todo.completed}
                onChange={handleCheckBoxChange}
            />
            <button onClick={handleUpdate}>
                Update Task
            </button>
            <button onClick={goBack}>
                Go Back
            </button>
        </div>
    )
}

export default TodoEdit
