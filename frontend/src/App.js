

import "./App.css";
import { useState } from "react";
// import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
// import { Container, Nav, Navbar } from 'react-bootstrap';
import Header from "./components/Header";
import Planning from "./components/Planning";
import InProgress from "./components/InProgress";
import Done from "./components/Done";
import AddTaskForm from "./components/AddTaskForm";
// import LandingPage from "./components/LandingPage";
// import SignUpPage from './components/SignUpPage';
// import LoginPage from './components/LogInPage';


function App() {
  const [tasks, setTasks] = useState([]);
  const [addItem, setAddItem] = useState(false);
  const handleSubmit = () => {
    setAddItem(!addItem);
  };
  const addTask = (task) => {
    setTasks(task);
  };
  return (
    <div>
      <Header handleSubmit={handleSubmit} />
      <div className='mainGrid'>
        <div className='column'>
          <Planning tasks={tasks} addTask={addTask} />
        </div>
        <div className='column'>
          <InProgress tasks={tasks} addTask={addTask} />
        </div>
        <div className='column'>
          <Done tasks={tasks} addTask={addTask} />
        </div>
        {addItem && (
          <AddTaskForm
            addItem={addItem}
            setAddItem={setAddItem}
            tasks={tasks}
            setTasks={addTask}
          />
        )}
      </div>
    </div>

  );
}

export default App;
