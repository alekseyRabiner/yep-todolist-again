import { combineReducers } from 'redux';

export const todosList = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_TODOS_SUCCESS':
    case 'TOGGLE_TODO_SUCCESS':
    case 'ADD_TODO_SUCCESS':
    case 'UPDATE_TODO_SUCCESS':
    case 'DELETE_TODO_SUCCESS':
      return action.todos;
    default:
      return state;
  }
};

const initialTodoFormAdd = {
  title: '',
  desc: '',
  importance: 'common',
  timealarm: { date: '', time: '' },
  completed: null
};
const initialTodoFormUpdate = {
  title: '',
  desc: '',
  importance: 'common',
  timealarm: { date: '', time: '' },
  completed: null
};

export const todoDataAddForm = (state = initialTodoFormAdd, action) => {
 switch (action.type) {
   case 'SET_ADD_FORM':
    return action.data;
   case 'ADD_TODO_SUCCESS':
    return initialTodoFormAdd;
   default:
     return state;
 }
};
export const todoDataUpdateForm = (state = initialTodoFormUpdate, action) => {
 switch (action.type) {
   case 'SET_UPDATE_FORM':
    return action.data;
   case 'UPDATE_TODO_SUCCESS':
    return initialTodoFormUpdate;
   default:
     return state;
 }
};

const isFetchingAtrr = [['LOAD', false], ['ADD', false], ['DELETE', false], ['EDIT', false]];
export const isFetching = (state = new Map(isFetchingAtrr), action) => {
  switch (action.type) {
    case 'LOAD_TODOS':
      return new Map([['LOAD', true], ['ADD', false], ['DELETE', false], ['EDIT', false]]);
    case 'ADD_TODO':
      return new Map([['LOAD', false], ['ADD', true], ['DELETE', false], ['EDIT', false]]);
    case 'DELETE_TODOS':
      return new Map([['LOAD', false], ['ADD', false], ['DELETE', true], ['EDIT', false]]);
        case 'EDIT_TODOS':
      return new Map([['LOAD', false], ['ADD', false], ['DELETE', false], ['EDIT', true]]);
    case 'ADD_TODO_SUCCESS':
    case 'ADD_TODO_ERROR':
    case 'DELETE_TODO_SUCCESS':
    case 'DELETE_TODO_ERROR':
    case 'LOAD_TODOS_SUCCESS':
    case 'LOAD_TODOS_ERROR':
    case 'EDIT_TODO_SUCCESS':
    case 'EDIT_TODO_ERROR':
      return new Map([['LOAD', false], ['ADD', false], ['DELETE', false], ['EDIT', false]]);
    default:
      return state;
  }
};
const hideTodoAddAfterAdd = (state = false, action) => {
  switch (action.type) {
    case 'ADD_TODO_SUCCESS':
      return true;
    case 'TODO_ADD_HIDE':
      return false;
    default:
      return state;
  }
};
const hideTodoUpdateAfterUpdate = (state = false, action) => {
  switch (action.type) {
    case 'UPDATE_TODO_SUCCESS':
    case 'DELETE_TODO_SUCCESS':
      return true;
    case 'TODO_UPDATE_HIDE':
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  todosList,
  isFetching,
  todoDataAddForm,
  todoDataUpdateForm,
  hideTodoAddAfterAdd,
  hideTodoUpdateAfterUpdate
});
