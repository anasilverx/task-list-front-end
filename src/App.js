import React, { useState } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';

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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList tasks={ tasks } updateComplete={updateComplete} />}</div>
      </main>
    </div>
  );
};

export default App;
