import React from 'react';
import TodoNavigation from 'TodoNavigation';
import TodoList from 'Todolist';
import CallTodoAddButton from 'CallTodoAddButton';
import TodoAdd from 'TodoAdd';
import TodoUpdateDelete from 'TodoUpdateDelete';

const Main = () => (
  <div id="main" className="main-container">
    <TodoNavigation />
    <TodoList />
    <CallTodoAddButton />
    <TodoAdd />
    <TodoUpdateDelete />
  </div>
);

export default Main;
