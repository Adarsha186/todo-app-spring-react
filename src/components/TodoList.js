import React, { useState, useEffect } from 'react';
import { searchTodo, getTodos, createTodo } from '../services/TodoService';
import TodoItem from './TodoItem';
import {
    Box,
    Typography,
    TextField,
    Button,
    Select,
    MenuItem,
    Pagination,
    Grid,
} from '@mui/material';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [newTodo, setNewTodo] = useState({
        title: '',
        description: '',
    });
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async () => {
        const response = await searchTodo(searchTerm);
        console.log(response);
        setTodos(response.data);
    }

    useEffect(() => {
        fetchTodos();
    }, [page, pageSize, fetchTodos]);

    const fetchTodos = async () => {
        try {
            const response = await getTodos(page, pageSize);
            setTodos(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const handlePageChange = (event, value) => {
        setPage(value - 1);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setPage(0);
    };

    const handleInputChange = (event) => {
        setNewTodo({
            ...newTodo,
            [event.target.name]: event.target.value,
        });
    };

    const handleAddTodo = async () => {
        if (!newTodo.title.trim()) {
            alert('Title cannot be empty');
            return;
        }
        try {
            await createTodo(newTodo);
            fetchTodos();
            setNewTodo({
                title: '',
                description: '',
            });
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    return (
        <Box sx={{ padding: 4 }}>
            {/* Header */}
            <Typography variant="h4" gutterBottom>
                Todo List
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                <TextField 
                    label="Search"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    fullWidth
                />
                <Button onClick={handleSearch} color='primary' variant='contained'>
                    Search
                </Button>
            </Box>

            {/* Add New Task Section */}
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                <TextField
                    label="Task Title"
                    name="title"
                    value={newTodo.title}
                    onChange={handleInputChange}
                    fullWidth
                />
                <TextField
                    label="Task Description"
                    name="description"
                    value={newTodo.description}
                    onChange={handleInputChange}
                    fullWidth
                />
                <Button variant="contained" color="primary" onClick={handleAddTodo}>
                    Add Task
                </Button>
            </Box>

            {/* Todo List */}
            <Grid container spacing={2}>
                {todos.map((todo) => (
                    <Grid item xs={12} key={todo.id}>
                        <TodoItem todo={todo} refresh={fetchTodos} />
                    </Grid>
                ))}
            </Grid>

            {/* Pagination and Page Size Controls */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 4,
                }}
            >
                {/* Page Size Selector */}
                <Box>
                    <Typography variant="body1" component="label" htmlFor="pageSize">
                        Page Size:
                    </Typography>
                    <Select
                        id="pageSize"
                        value={pageSize}
                        onChange={handlePageSizeChange}
                        sx={{ ml: 2 }}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                    </Select>
                </Box>

                <Pagination
                    count={totalPages}
                    page={page + 1}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </Box>
    );
};

export default TodoList;
