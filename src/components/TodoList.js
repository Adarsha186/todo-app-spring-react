import React, { useState, useEffect } from 'react';
import { getTodos, updateTodo, deleteTodo, createTodo } from '../services/TodoService';
import { Link } from 'react-router-dom';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({
        title: '',
        description: ''
    });

    useEffect(() => {
        fetchTodos();
    },[]);

    const fetchTodos = async () => {
        const response = await getTodos();
        console.log(response.data);
        setTodos(response.data);
    }

    const handleCheckBoxChange = async (todo) => {
        const updatedTodo = {...todo, completed : !todo.completed}
        await updateTodo(todo.id, updatedTodo);
        fetchTodos();
    }

    const handleDelete = async (todo) => {
        await deleteTodo(todo.id);
        console.log("Deleted : ", todo);
        fetchTodos();
    }

    const handleInputChange = async (event) => {
        setNewTodo({
            ...newTodo,
            [event.target.name] : event.target.value
        })
    }

    const handleAddTodo = async () => {
        if(!newTodo.title.trim()){
            alert("Title cannot be empty");
            return;
        }
        try{
            const response = await createTodo(newTodo);
            fetchTodos();
            setNewTodo({
                title: '',
                description: ''
            });
        }
        catch(error){
            console.error(error);
        }
    }

    return (
        <div>
            <h2>Todo List</h2>
            <ul>
                {todos.map((todo) => (
                    <>
                        <li key={todo.id}> {todo.title} </li>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleCheckBoxChange(todo)}
                            style={{ marginRight: "10px" }}
                        />
                        <Link to={`/view/${todo.id}`}>
                            <button>Task Details</button>
                        </Link>
                        
                        <Link to={`/edit/${todo.id}`}>
                            <button>Edit</button>
                        </Link>

                        <button
                            style={{ marginLeft: "10px" }}
                                onClick={() => handleDelete(todo)}
                        >
                            Delete
                        </button>
                    </>
                ))}
            </ul>
            <h2>Add New Task</h2>
            
            <input 
                type="text" 
                placeholder="Task Title"
                name="title"
                value={newTodo.title}
                onChange={handleInputChange}
            />
            <input 
                type="text" 
                placeholder="Task Description"
                name="description"
                value={newTodo.description}
                onChange={handleInputChange} 
            />
            <button onClick={handleAddTodo}>Add Task</button>
        </div>
    )
}

export default TodoList
