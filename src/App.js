import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList.js';
import './App.css';

const TASK_URL = 'https://task-list-api-302r.onrender.com/tasks';

const App = () => {
// tasks defined in useState is passed as prop to TaskList
  const [tasks, setTasks] = useState([]);

  const updateComplete = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        task.isComplete = !task.isComplete;
      }
      return { ...task };
    });
    
    setTasks(updatedTasks);
  };

  const getTasks = () => {
    axios
      .get(TASK_URL)
      .then((response) => {
        const newTasks = response.data.map((task) => {
          return {
            'description': task.description,
            'id': task.id,
            'title': task.title,
            'isComplete': task.is_complete,
          };
        });
        setTasks(newTasks);
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

  const updateDelete = (taskId) => {
    axios
      .delete(`${TASK_URL}/${taskId}`)
      .then((response) => {
        console.log(response);

        const newTasks = [];
        for (let task of tasks) {
          if (task.id !== taskId) {
            newTasks.push(task);
        }}
      
        setTasks(newTasks);
      })
      .catch((error) => {
        console.log(error.response.status);
        console.log(error.response.data);
      });
  };
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList 
                tasks={ tasks } 
                updateComplete={updateComplete} 
                updateDelete={updateDelete} 
              />}
        </div>
      </main>
    </div>
  );
};

export default App;
