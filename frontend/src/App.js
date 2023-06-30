

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
import LandingPage from './pages/LandingPage';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/app" element={<Dashboard/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
