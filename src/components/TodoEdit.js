import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateTodo, getTodoById } from '../services/TodoService';
import {
    Box,
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
    Typography,
} from '@mui/material';

const TodoEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [todo, setTodo] = useState({
        title: '',
        description: '',
        completed: false,
    });

    useEffect(() => {
        fetchTodo();
    }, []);

    const fetchTodo = async () => {
        try {
            const response = await getTodoById(id);
            setTodo(response.data);
        } catch (error) {
            console.error('Error fetching todo:', error);
        }
    };

    const handleInputChange = (event) => {
        setTodo({
            ...todo,
            [event.target.name]: event.target.value,
        });
    };

    const handleCheckBoxChange = (event) => {
        setTodo({
            ...todo,
            completed: event.target.checked,
        });
    };

    const handleUpdate = async () => {
        try {
            await updateTodo(id, todo);
            navigate('/');
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const goBack = () => {
        navigate(-1);
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Edit Todo
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <TextField
                    label="Task Title"
                    name="title"
                    value={todo.title}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    label="Task Description"
                    name="description"
                    value={todo.description}
                    onChange={handleInputChange}
                    fullWidth
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={todo.completed}
                            onChange={handleCheckBoxChange}
                            color="primary"
                        />
                    }
                    label="Completed"
                />
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpdate}
                    >
                        Update Task
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={goBack}
                    >
                        Go Back
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default TodoEdit;
