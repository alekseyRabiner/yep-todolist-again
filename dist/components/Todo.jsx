import React from 'react';
import moment from 'moment';

const colorImportance = (importance) => {
  switch (importance) {
    case 'common':
      return '#898E8C';
    case 'important':
      return '#F68A7C';
    case 'very-important':
      return '#B93A32';
    default:
      return 'black';
  }
};

const setBorderAlert = (timealarm) => {
  if (!timealarm) {
    return 'none';
  }
  const current = moment().diff(`${timealarm.date} ${timealarm.time}`);
  return current > 0 ? '3px solid #B93A32' : 'none';
};

const showTodo = () => {
  const todoAddStyle = document.getElementById('todo-update').style;
  todoAddStyle.left = '0';
};

let touchTime = 0; //time for dobleclick imit

const Todo = ({ todo, toggleTodo, setDataTodoUpdateForm }) => {
  const style = {
    color: colorImportance(todo.importance)
  };
  const styleBorderAlert = {
    border: setBorderAlert(todo.timealarm)
  };

  return (
    <div
      className="todo-item"
      title="Кликните 2 раза, чтобы открыть окно редактирования"
      style={styleBorderAlert}
      onClick={() => { //imit doubleclick
        if (touchTime === 0) {
          touchTime = new Date().getTime();
        } else if (((new Date().getTime()) - touchTime) < 800) {
          touchTime = 0;
          setDataTodoUpdateForm(todo);
          showTodo();
        } else {
          touchTime = new Date().getTime();
        }
      }}>
      <input type="checkbox" onChange={() => toggleTodo(todo.id)} checked={!!todo.completed} />
      <div className="todo-info">
        <div className="todo-title">{todo.title}</div>
        <div className="todo-desc">{todo.desc}</div>
        {todo.timealarm ? <div className="todo-timealarm">{`${todo.timealarm.date} ${todo.timealarm.time}`}</div> : null}
        <div className="todo-importance" style={style}>{todo.importance}</div>
        {todo.completed ? <div className="todo-completed">{`Завершено в ${todo.completed}`}</div> : null}
      </div>
    </div>
  );
};

export default Todo;
