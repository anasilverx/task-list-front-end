import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList.js';
import './App.css';

const TASK_URL = 'https://task-list-api-302r.onrender.com/tasks';
const INITIAL_TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
//tasks defined in useState is passed as prop to TaskList
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const updateComplete = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        task.isComplete = !task.isComplete;
      }
      return { ...task };
    });
    
    setTasks(updatedTasks);
  };

  const updateDelete = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id !== taskId) {
        return {...task};
      }
    });

    const filteredUpdatedData = updatedTasks.filter(function (element) {
      return element !== undefined;
    });

    setTasks(filteredUpdatedData);
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
            'is_complete': task.is_complete,
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
