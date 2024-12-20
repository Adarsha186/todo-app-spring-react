import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const getTodoById = (id) => axios.get(`${API_URL}/${id}`);

const getTodos = (page = 0, size = 10) => axios.get(`${API_URL}?page=${page}&size=${size}`);

const createTodo = (todo) => axios.post(API_URL, todo);

const updateTodo = (id, todo) => axios.put(`${API_URL}/${id}`, todo);

const deleteTodo = (id) => axios.delete(`${API_URL}/${id}`);

export { getTodoById, getTodos, createTodo, updateTodo, deleteTodo };
