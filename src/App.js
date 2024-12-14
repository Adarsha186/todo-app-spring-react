import React, { useState } from "react";
import TodoList from "./components/TodoList";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoEdit from "./components/TodoEdit";
import TodoView from "./components/TodoView";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoList/>}/>
        <Route path="/view/:id" element={<TodoView/>}/>
        <Route path="/edit/:id" element={<TodoEdit/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
