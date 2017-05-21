import { put, take, fork, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import uuid from 'uuid';
import localStorage from '../api/localStorage';

function* delayReq() {
  yield call(delay, parseInt((Math.random() * 2000), 10));
}

function* loadTodos() {
  try {
    const { todos } = yield localStorage('LOAD');
    yield* delayReq();
    yield put({ type: 'LOAD_TODOS_SUCCESS', todos});
  } catch (error) {
    yield put({ type: 'LOAD_TODOS_ERROR', error });
  }
}

function* addTodo(data) {
 try {
   const dataToStorage = {
     id: uuid(),
     ...data
  };
   const { todos } = yield localStorage('ADD', dataToStorage);
   yield* delayReq();
   yield put({type: 'ADD_TODO_SUCCESS', todos});
 } catch (error) {
   yield put({type: 'ADD_TODO_ERROR', error});
 }
}

function* toggleTodo(todoId) {
  try {
    const { todos } = yield localStorage('TOGGLE', todoId);
    yield put({ type: 'TOGGLE_TODO_SUCCESS', todos });
  } catch (error) {
    yield put({ type: 'TOGGLE_TODO_ERROR', error });
  }
}
function* updateTodo(data, id) {
  try {
    const { todos } = yield localStorage('UPDATE', {id, ...data});
    yield put({ type: 'UPDATE_TODO_SUCCESS', todos });
  } catch (error) {
    yield put({ type: 'UPDATE_TODO_ERROR', error });
  }
}
function* deleteTodo(id) {
    try {
    const { todos } = yield localStorage('DELETE', {id});
    yield put({ type: 'DELETE_TODO_SUCCESS', todos });
  } catch (error) {
    yield put({ type: 'DELETE_TODO_ERROR', error });
  }
}
function* watchLoadTodos() {
  while (true) {
    yield take('LOAD_TODOS');
    yield fork(loadTodos);
  }
}

function* watchAddTodo() {
  while (true) {
    const { data } = yield take('ADD_TODO');
    yield fork(addTodo, data);
  }
}
function* watchToggleTodo() {
  while (true) {
    const { id } = yield take('TOGGLE_TODO');
    yield fork(toggleTodo, id);
  }
}
function* watchUpdateTodo() {
  while (true) {
    const { data, id } = yield take('UPDATE_TODO');
    yield fork(updateTodo, data, id);
  }
}
function* watchDeleteTodo() {
  while (true) {
    const { id } = yield take('DELETE_TODO');
    yield fork(deleteTodo, id);
  }
}

export default function* todoSagas() {
  yield [
    watchLoadTodos(),
    watchAddTodo(),
    watchToggleTodo(),
    watchUpdateTodo(),
    watchDeleteTodo()
  ];
}
