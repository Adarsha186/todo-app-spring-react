import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTodoById } from '../services/TodoService';
import { Box, Typography, Button, List, ListItem, ListItemText } from '@mui/material';

const TodoView = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [todo, setTodo] = useState({});

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

    const goBack = () => {
        navigate(-1);
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Todo Details
            </Typography>
            <List>
                <ListItem>
                    <ListItemText primary="ID" secondary={todo.id || 'N/A'} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Title" secondary={todo.title || 'N/A'} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Description" secondary={todo.description || 'N/A'} />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="Status"
                        secondary={todo.completed ? 'Completed' : 'Pending'}
                    />
                </ListItem>
            </List>
            <Button
                variant="contained"
                color="primary"
                onClick={goBack}
                sx={{ mt: 2 }}
            >
                Go Back
            </Button>
        </Box>
    );
};

export default TodoView;
