import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import MdDateTimePicker from 'md-date-time-picker/src/js/mdDateTimePicker';
import { addTodo, setDataTodoAddForm, hideTodoAdd } from '../actions';
import { getFetching } from '../reducers/rootReducer';
import { checkEmptyInput } from '../util';

const timePickerConfig = {
  date: {
    type: 'date',
    init: moment().locale('ru'),
    orientation: 'PORTRAIT',
    past: moment().subtract(),
    future: moment().add(20, 'years')
  },
  time: {
    type: 'time',
    init: moment().locale('ru')
  }
};

const hideTodo = () => {
  const todoAddStyle = document.getElementById('todo-add').style;
  todoAddStyle.transform = 'scale(0, 0)';
  todoAddStyle.backgroundColor = 'rgba(223,231,228, 0)';
};

class TodoAdd extends React.Component {
  componentDidMount() {
    const { setDataTodoAddForm } = this.props;
    const DialogDataAdd = new MdDateTimePicker(timePickerConfig.date); //Выбор даты
    const DialogTimeAdd = new MdDateTimePicker(timePickerConfig.time); //Выбор времени
    const inputDate = document.querySelector('#input-todo-date');
    const inputTime = document.querySelector('#input-todo-time');
    DialogDataAdd.trigger = inputDate;
    DialogTimeAdd.trigger = inputTime;
    inputDate.addEventListener('onOk', () => {
      this.props.todoDataAddForm.timealarm.date = moment(DialogDataAdd.time).format('YYYY-MM-DD');
      setDataTodoAddForm(this.props.todoDataAddForm);
    });
    inputDate.addEventListener('focus', () => {
      DialogDataAdd.toggle();
    });
    inputTime.addEventListener('onOk', () => {
      this.props.todoDataAddForm.timealarm.time = moment(DialogTimeAdd.time).format('HH:mm');
      setDataTodoAddForm(this.props.todoDataAddForm);
    });
    inputTime.addEventListener('focus', () => {
      DialogTimeAdd.toggle();
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.hideTodoAddAfterAdd !== prevProps.hideTodoAddAfterAdd) {
      if (this.props.hideTodoAddAfterAdd) {
        hideTodo();
      }
    }
  }
  render() {
    const { todoDataAddForm, setDataTodoAddForm, addTodo } = this.props;
    return (
      <div id="todo-add">
        <nav className="todo-nav">
          <div
            className="todo-back"
            onClick={() => hideTodo()}>
            &#8678;
          </div>
          <div className="todo-add-title">Новая задача</div>
          <div className="empty" />
        </nav>
        <div className="todo-form">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (checkEmptyInput(this.props.todoDataAddForm, event)) {
                addTodo(todoDataAddForm);
              }
            }} >
            <label htmlFor="input-todo-title">Название задачи</label>
            <input
              type="text"
              name="title"
              id="input-todo-title"
              value={`${todoDataAddForm.title}`}
              onInput={(event) => {
                event.target.classList.remove('has-danger');
                todoDataAddForm.title = event.target.value;
                setDataTodoAddForm(todoDataAddForm);
              }}
            />
            <label htmlFor="textarea-todo-desc">Описание задачи</label>
            <textarea
              name="desc"
              id="textarea-todo-desc"
              rows="4"
              value={`${todoDataAddForm.desc}`}
              onInput={(event) => {
                event.target.classList.remove('has-danger');
                todoDataAddForm.desc = event.target.value;
                setDataTodoAddForm(todoDataAddForm);
              }}
            />
            <label htmlFor="select-todo-importancy">Важность задачи</label>
            <select
              name="importancy"
              id="select-todo-importancy"
              onChange={(event) => {
                todoDataAddForm.importance = event.target.value;
                setDataTodoAddForm(todoDataAddForm);
              }}
            >
              <option value="common">Обычная</option>
              <option value="important">Важно</option>
              <option value="very-important">Очень важно</option>
            </select>
            <label htmlFor="input-todo-date">Дата</label>
            <input
              id="input-todo-date"
              value={`${todoDataAddForm.timealarm.date}`}
              onChange={(event) => {
                todoDataAddForm.timealarm.date = event.target.value;
                setDataTodoAddForm(todoDataAddForm);
              }} />
            <label htmlFor="input-todo-time">Время</label>
            <input
              id="input-todo-time"
              value={`${todoDataAddForm.timealarm.time}`}
              onChange={(event) => {
                todoDataAddForm.timealarm.time = event.target.value;
                setDataTodoAddForm(todoDataAddForm);
              }}
            />
            <div className="button-wrapper">
              {this.props.isFetchingAdd ? <div className="spinner" /> : <button type="submit">&#10003;</button>}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todoDataAddForm: state.todos.todoDataAddForm,
  isFetchingAdd: getFetching(state, 'ADD'),
  hideTodoAddAfterAdd: state.todos.hideTodoAddAfterAdd
});

const mapActionCreatorsToProps = (dispatch) => {
  return bindActionCreators({ setDataTodoAddForm, addTodo, hideTodoAdd }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapActionCreatorsToProps)(TodoAdd));
