import React from 'react';
import Todo from 'Todo';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { loadTodos, toggleTodo, setDataTodoUpdateForm } from '../actions';
import { getTodos, getFetching } from '../reducers/rootReducer';

class TodoList extends React.Component {
  componentWillMount() {
    this.props.loadTodos();
  }
  render() {
    const { todos, isFetchingLoad, toggleTodo, setDataTodoUpdateForm } = this.props;
    if (isFetchingLoad) {
      return (
        <div id="todo-list">
          <div className="todo-list-wrapper">
            <div className="spinner" />
          </div>
        </div>
      );
    }
    return (
      <div id="todo-list">
        <div className="todo-list-wrapper">
          {todos.length > 0 ?
            todos.map(todo => (
              <Todo
                todo={todo}
                key={todo.id}
                toggleTodo={toggleTodo}
                setDataTodoUpdateForm={setDataTodoUpdateForm}
              />)) :
            <p>Задач нет</p>
          }
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, { location }) => {
  const importance = location.pathname.slice(1);
  return {
    todos: getTodos(state, importance),
    isFetchingLoad: getFetching(state, 'LOAD')
  };
};
const mapActionCreatorsToProps = (dispatch) => {
  return bindActionCreators({ loadTodos, toggleTodo, setDataTodoUpdateForm }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapActionCreatorsToProps)(TodoList));
