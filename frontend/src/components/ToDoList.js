

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const location = useLocation();
  const username = new URLSearchParams(location.search).get('username');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setTodos([]);
  };

  const handleAddTodo = async () => {
    // Create a new todo object
    const newTodoObj = {
      title: newTodo,
      completed: false,
    };

    // Make API call to create a new todo
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodoObj),
    });

    const data = await response.json();

    // Add the new todo to the existing list
    setTodos(prevTodos => [...prevTodos, data]);

    // Clear the input field
    setNewTodo('');
  };

  const handleDeleteTodo = async (id) => {
    // Make API call to delete the selected todo
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    });

    // Filter out the deleted todo from the list
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    // Update the todos state
    setTodos(updatedTodos);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <Container>
      <div className="text-end text-secondary">
        <h6>Welcome, {username}!</h6>
      </div>
      <h1 className="text-center text-secondary">To-Do List</h1>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button variant="primary" onClick={handleAddTodo} className="mt-2">
          Add
        </Button>
      </Form.Group>
      <ListGroup>
        {todos.map((todo) => (
          <ListGroup.Item key={todo.id}>
            {todo.title}
            <Button variant="danger" size="sm" className="float-end" onClick={() => handleDeleteTodo(todo.id)}>
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default ToDoList;
