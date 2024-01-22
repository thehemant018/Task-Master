import './App.css';
import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './components/About';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AddTask from './components/AddTask';
import Signup from './components/Signup';
import Login from './components/Login';
import Alert from './components/Alert';
import TaskState from './context/task/TaskState';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }
  return (
    <>
    <TaskState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert} />
          <div className='container'>
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/addtask" element={<AddTask showAlert={showAlert} />}></Route>
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />}></Route>
              <Route exact path="/login" element={<Login showAlert={showAlert} />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
        </TaskState>
    </>
  );
}

export default App;
