import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTodoById } from '../services/TodoService';
const TodoView = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [todo, setTodo] = useState({});

    useEffect(() => {
        fetchTodo();
    },[]);

    const fetchTodo = async () => {
        const response = await getTodoById(id);
        console.log(response.data);
        setTodo(response.data);
    }

    const goBack = () => {
        navigate(-1);
    }

    return (
        <div>
            <ul>
                <li>ID: {todo.id}</li>
                <li>Title: {todo.title}</li>
                <li>Description: {todo.description}</li>
                <li>Status: {(todo.completed)? 'Completed':'Pending'}</li>
            </ul>
            <button onClick={goBack}>Go Back</button>
        </div>
    )
}

export default TodoView
