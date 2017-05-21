import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import todosReducer from './todosReducer';

export default combineReducers({
 todos: todosReducer,
 routing: routerReducer
});

export const getTodos = (state, importance) => {
  if (!importance) {
    return state.todos.todosList.filter(todo => !todo.completed);
  }
  if (importance === 'ended') {
    return state.todos.todosList.filter(todo => todo.completed);
  }
  return state.todos.todosList.filter(todo => importance === todo.importance && !todo.completed);
};
export const getFetching = (state, type) => state.todos.isFetching.get(type);
