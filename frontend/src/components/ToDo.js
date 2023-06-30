import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import Card from "./Card";

function Navbar() {
  return (
    <nav className="navbar">
      <h3 className="text-center m-auto">My To-Do List</h3>
      <Link to="/" className="nav-link">
         Home
       </Link>
    </nav>
  );
}

function Header({ handleSubmit }) {
  return (
    <div className="header">
      <button onClick={handleSubmit} className="addButton mt-">
        Add Task
      </button>
      <p>Planning</p>
      <p>In Progress</p>
      <p>Done</p>
    </div>
  );
}

function AddTaskForm({ setAddItem, addItem, tasks, setTasks }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [option, setOption] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let newTask = {
      id: uuidv4(),
      name: name,
      description: description,
      timeline: option,
    };

    setTasks([...tasks, newTask]);

    setAddItem(!addItem);
  };

  return (
    <div className="addForm">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          name="timeline"
          id="timeline"
          onChange={(e) => {
            setOption(e.target.value);
          }}
        >
          <option value=""></option>
          <option value="planning">Planning</option>
          <option value="inprogress">In-Progress</option>
          <option value="done">Done</option>
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

function Planning({ tasks, addTask }) {
  return (
    <>
      {tasks
        .filter((item) => item.timeline === "planning")
        .map((e) => (
          <Card currentTask={e} tasks={tasks} addTask={addTask} />
        ))}
    </>
  );
}

function InProgress({ tasks, addTask }) {
  return (
    <>
      {tasks
        .filter((item) => item.timeline === "inprogress")
        .map((e) => (
          <Card currentTask={e} tasks={tasks} addTask={addTask} />
        ))}
    </>
  );
}

function Done({ tasks, addTask }) {
  return (
    <>
      {tasks
        .filter((item) => item.timeline === "done")
        .map((e) => (
          <Card currentTask={e} tasks={tasks} addTask={addTask} />
        ))}
    </>
  );
}

function ToDo() {
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
      <Navbar />
      <Header handleSubmit={handleSubmit} />
      <div className="mainGrid">
        <div className="column">
          <Planning tasks={tasks} addTask={addTask} />
        </div>
        <div className="column">
          <InProgress tasks={tasks} addTask={addTask} />
        </div>
        <div className="column">
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

export default ToDo;
