

// import "./App.css";
// import { useState } from "react";
// import Header from "./components/Header";
// import Planning from "./components/Planning";
// import InProgress from "./components/InProgress";
// import Done from "./components/Done";
// import AddTaskForm from "./components/AddTaskForm";


// function App() {
//   const [tasks, setTasks] = useState([]);
//   const [addItem, setAddItem] = useState(false);
//   const handleSubmit = () => {
//     setAddItem(!addItem);
//   };
//   const addTask = (task) => {
//     setTasks(task);
//   };
//   return (
//     <div>
//       <Header handleSubmit={handleSubmit} />
//       <div className='mainGrid'>
//         <div className='column'>
//           <Planning tasks={tasks} addTask={addTask} />
//         </div>
//         <div className='column'>
//           <InProgress tasks={tasks} addTask={addTask} />
//         </div>
//         <div className='column'>
//           <Done tasks={tasks} addTask={addTask} />
//         </div>
//         {addItem && (
//           <AddTaskForm
//             addItem={addItem}
//             setAddItem={setAddItem}
//             tasks={tasks}
//             setTasks={addTask}
//           />
//         )}
//       </div>
//     </div>

//   );
// }

// export default App;


import React, { useState } from 'react';
import './App.css';
import ToDo from './components/ToDo';
import LandingPage from './components/LandingPage';
import LogInPage from './components/LogInPage';
import SignUpPage from './components/SignUpPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/todo" element={<ToDo
            tasks={tasks}
            addTask={addTask}
            addItem={addItem}
            setAddItem={setAddItem}
          />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
