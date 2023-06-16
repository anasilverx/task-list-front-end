import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = (props) => {
  
  const [isComplete, setIsComplete] = useState(props.isComplete);

  const toggleComplete = () => {
    setIsComplete(!isComplete);
    props.updateComplete(props.id);
  };

  const toggleDelete = () => {
    props.updateDelete(props.id);
  };

  const buttonClass = props.isComplete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={toggleComplete}
      >
        {props.title}
      </button>
      <button onClick={toggleDelete} className="tasks__item__remove button">x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  updateComplete: PropTypes.func.isRequired,
  updateDelete: PropTypes.func.isRequired
};

export default Task;
