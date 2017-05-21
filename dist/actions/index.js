export const loadTodos = () => ({
  type: 'LOAD_TODOS'
});

export const addTodo = data => ({
  type: 'ADD_TODO',
  data
});

export const setDataTodoAddForm = dataTodoAddForm => ({
  type: 'SET_ADD_FORM',
  data: {...dataTodoAddForm}
});
export const setDataTodoUpdateForm = dataTodoUpdateForm => ({
  type: 'SET_UPDATE_FORM',
  data: {...dataTodoUpdateForm}
});
export const updateTodo = (data, id) => ({
  type: 'UPDATE_TODO',
  data,
  id
});
export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
});
export const deleteTodo = id => ({
  type: 'DELETE_TODO',
  id
});
export const hideTodoAdd = () => ({
  type: 'TODO_ADD_HIDE'
});
export const hideTodoUpdate = () => ({
  type: 'TODO_UPDATE_HIDE'
});
