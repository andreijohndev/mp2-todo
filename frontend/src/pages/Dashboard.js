import React, { useState, useEffect } from 'react';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('authToken') === null && sessionStorage.getItem('authToken') === null) {
      navigate(-1);
    }
  }, []);

  const authToken = localStorage.getItem("authToken") === null ? sessionStorage.getItem("authToken") : localStorage.getItem("authToken");
  const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 1000,
    headers: {'Authorization': `Bearer ${authToken}`}
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    await instance.get('/items')
      .then(function (response) {
        setTodos(response.data);
      }).catch(function (response) {
        setTodos([]);
      })
  };

  const handleAddTodo = async () => {
    // Create a new todo object
    const newTodoObj = {
      task: newTodo
    };

    // Make API call to create a new todo
    await instance.post('/items', JSON.stringify(newTodoObj))
      .then(function (response) {
        // Add the new todo to the existing list
        setTodos(prevTodos => [...prevTodos, response.data]);
      }).catch(function (response) {
        console.log(response.data.message);
      });
    
    // Clear the input field
    setNewTodo('');
  };

  const handleDeleteTodo = async (id) => {
    // Make API call to delete the selected todo
    await instance.delete(`/items/${id}`)
      .then(function (response) {
        // Filter out the deleted todo from the list
        const updatedTodos = todos.filter((todo) => todo.id !== id);

        // Update the todos state
        setTodos(updatedTodos);
      }).catch(function (response) {
        console.log(response.data.message);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <Container fluid>
      <NavigationBar/>
      <Container>
      <Form.Group className="mt-3 mb-3">
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
            {todo.task}
            <Button variant="danger" size="sm" className="float-end" onClick={() => handleDeleteTodo(todo.id)}>
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      </Container>
    </Container>
  );
}

export default Dashboard;