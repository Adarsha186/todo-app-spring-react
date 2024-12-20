import React from 'react';
import { updateTodo, deleteTodo } from '../services/TodoService';
import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    Typography,
    Checkbox,
    Button,
    Stack,
} from '@mui/material';

const TodoItem = ({ todo, refresh }) => {
    const handleCheckBoxChange = async () => {
        try {
            const updatedTodo = {
                id: todo.id,
                title: todo.title,
                description: todo.description,
                completed: !todo.completed,
            };

            await updateTodo(todo.id, updatedTodo);
            refresh();
        } catch (error) {
            console.error('Error updating todo:', error.response?.data || error.message);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteTodo(todo.id);
            refresh();
        } catch (error) {
            console.error('Error deleting todo:', error.response?.data || error.message);
        }
    };

    return (
        <Card variant="outlined">
            <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Checkbox
                        checked={todo.completed}
                        onChange={handleCheckBoxChange}
                        color="primary"
                    />
                    <Typography variant="h6" sx={{ flex: 1 }}>
                        {todo.title}
                    </Typography>
                    <Link to={`/view/${todo.id}`} style={{ textDecoration: 'none' }}>
                        <Button variant="outlined" size="small">
                            View
                        </Button>
                    </Link>
                    <Link to={`/edit/${todo.id}`} style={{ textDecoration: 'none' }}>
                        <Button variant="outlined" size="small" color="secondary">
                            Edit
                        </Button>
                    </Link>
                    <Button
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {todo.description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default TodoItem;
