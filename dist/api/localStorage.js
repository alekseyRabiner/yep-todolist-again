import moment from 'moment';

export default (type, data = {}) => {
  const localStore = JSON.parse(window.localStorage.getItem('todos')) || [];
  let pushedToStore;
  switch (type) {
    case 'LOAD':
      return {
        todos: localStore
      };
    case 'ADD':
      pushedToStore = JSON.stringify([...localStore, data]);
      window.localStorage.setItem('todos', pushedToStore);
      return {
        todos: JSON.parse(window.localStorage.getItem('todos'))
      };
    case 'TOGGLE':
      pushedToStore = localStore.map((todo) => {
        if (todo.id === data) {
          todo.timealarm = null;
          todo.completed = todo.completed ? null : moment().format('YYYY-MM-DD HH:mm');
          return todo;
        }
        return todo;
      });
      window.localStorage.setItem('todos', JSON.stringify(pushedToStore));
      return {
        todos: JSON.parse(window.localStorage.getItem('todos'))
      };
    case 'UPDATE':
      pushedToStore = localStore.map((todo) => {
        if (todo.id === data.id) {
          return data;
        }
        return todo;
      });
      window.localStorage.setItem('todos', JSON.stringify(pushedToStore));
      return {
        todos: JSON.parse(window.localStorage.getItem('todos'))
      };
    case 'DELETE':
      pushedToStore = localStore.filter(todo => todo.id !== data.id);
      window.localStorage.setItem('todos', JSON.stringify(pushedToStore));
      return {
        todos: JSON.parse(window.localStorage.getItem('todos'))
      };
    default:
      throw Error('Unknown type');
  }
};
