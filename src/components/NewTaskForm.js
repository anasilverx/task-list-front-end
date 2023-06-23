import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

export default function NewTaskForm (props) {
  const INITIAL_FORM_DATA = {
    title: '',
    description: ''
  }
  const [taskFormData, setTaskFormData] = useState(INITIAL_FORM_DATA);
  
  const inputChange = (evt) => {
    const newTaskFormData = {
      ...taskFormData,
      [evt.target.name] : evt.target.value
    };
    setTaskFormData(newTaskFormData);
  }
  
  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    props.createTaskCallback(taskFormData);
    setTaskFormData(INITIAL_FORM_DATA);
  }

  return (
    <div>
      <h2>Create New Task</h2>
      <form onSubmit={ handleFormSubmit }> 
        <label htmlFor="taskTitle">Task Title:</label>
        <input
          name="title"
          type="text"
          value={ taskFormData.title } 
          onChange={ inputChange }
        />
        <label htmlFor="taskTitle">Task Description:</label>
        <input 
        name="description"
        type="text"
        value={taskFormData.description}
        onChange={ inputChange }
        />
        <input type="submit" value="Add New Task"></input>
      </form>
    </div>
  )
}

NewTaskForm.propTypes = {
  //prop for callback function
  createTaskCallback: PropTypes.func.isRequired
};