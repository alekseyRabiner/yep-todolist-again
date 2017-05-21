import React from 'react';

const CallTodoAddButton = () => (
  <div id="call-todo-add-button">
    <button
      onClick={() => {
        const todoAddStyle = document.getElementById('todo-add').style;
        todoAddStyle.transform = 'scale(1, 1)';
        todoAddStyle.backgroundColor = 'rgba(223,231,228, 1)';
      }}>&#10010;</button>
  </div>
);

export default CallTodoAddButton;
