import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import MdDateTimePicker from 'md-date-time-picker/src/js/mdDateTimePicker';
import { updateTodo, setDataTodoUpdateForm, hideTodoUpdate, deleteTodo } from '../actions';
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
  const todoAddStyle = document.getElementById('todo-update').style;
  todoAddStyle.left = '-4000px';
};
const setTimeAlarmInput = (timealarm) => {
  return timealarm ?
    <div>
      <label htmlFor="input-todo-date-update">Дата</label>
      <input
        id="input-todo-date-update"
        value={`${timealarm.date}`}
      />
      <label htmlFor="input-todo-time-update">Время</label>
      <input
        id="input-todo-time-update"
        value={`${timealarm.time}`}
      />
    </div> :
    <div>
      <label htmlFor="input-todo-date-update">Дата</label>
      <input
        id="input-todo-date-update"
        value=""
      />
      <label htmlFor="input-todo-time-update">Время</label>
      <input
        id="input-todo-time-update"
        value=""
      />
    </div>;
};

class TodoUpdateDelete extends React.Component {
  componentDidMount() {
    const { setDataTodoUpdateForm } = this.props;
    const DialogDataUpdate = new MdDateTimePicker(timePickerConfig.date); //Выбор даты
    const DialogTimeUpdate = new MdDateTimePicker(timePickerConfig.time); //Выбор времени
    const inputDate = document.querySelector('#input-todo-date-update');
    const inputTime = document.querySelector('#input-todo-time-update');
    DialogDataUpdate.trigger = inputDate;
    DialogTimeUpdate.trigger = inputTime;
    inputDate.addEventListener('onOk', () => {
      this.props.todoDataUpdateForm.timealarm.date = moment(DialogDataUpdate.time).format('YYYY-MM-DD');
      setDataTodoUpdateForm(this.props.todoDataUpdateForm);
    });
    inputDate.addEventListener('focus', () => {
      DialogDataUpdate.toggle();
    });
    inputTime.addEventListener('onOk', () => {
      this.props.todoDataUpdateForm.timealarm.time = moment(DialogTimeUpdate.time).format('HH:mm');
      setDataTodoUpdateForm(this.props.todoDataUpdateForm);
    });
    inputTime.addEventListener('focus', () => {
      DialogTimeUpdate.toggle();
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.hideTodoUpdateAfterUpdate !== prevProps.hideTodoUpdateAfterUpdate) {
      if (this.props.hideTodoUpdateAfterUpdate) {
        hideTodo();
      }
    }
  }
  render() {
    const { todoDataUpdateForm, setDataTodoUpdateForm } = this.props;
    return (
      <div id="todo-update">
        <nav className="todo-nav">
          <div
            className="todo-back"
            onClick={() => hideTodo()}>
            &#8678;
          </div>
          <div className="todo-update-title">Редактирование</div>
          <div
            className="todo-delete"
            title="Удаление записи"
            onClick={() => {
              this.props.deleteTodo(todoDataUpdateForm.id);
            }}>&times;</div>
        </nav>
        <div className="todo-form">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              //if inputs empty not update todo
              if (checkEmptyInput(this.props.todoDataUpdateForm, event)) {
                this.props.updateTodo(this.props.todoDataUpdateForm);
              }
            }}>
            <label htmlFor="input-todo-title-update">Название задачи</label>
            <input
              type="text"
              name="title"
              id="input-todo-title-update"
              value={`${todoDataUpdateForm.title}`}
              onInput={(event) => {
                event.target.classList.remove('has-danger');
                todoDataUpdateForm.title = event.target.value;
                setDataTodoUpdateForm(this.props.todoDataUpdateForm);
              }}
            />
            <label htmlFor="textarea-todo-desc-update">Описание задачи</label>
            <textarea
              name="desc"
              id="textarea-todo-desc-update"
              rows="4"
              value={`${todoDataUpdateForm.desc}`}
              onInput={(event) => {
                event.target.classList.remove('has-danger');
                todoDataUpdateForm.desc = event.target.value;
                setDataTodoUpdateForm(this.props.todoDataUpdateForm);
              }}
            />
            <label htmlFor="select-todo-importancy">Важность задачи</label>
            <select
              name="importancy"
              id="select-todo-importancy-update"
              onChange={(event) => {
                todoDataUpdateForm.importance = event.target.value;
                setDataTodoUpdateForm(this.props.todoDataUpdateForm);
              }}>
              <option value="common">Обычная</option>
              <option value="important">Важно</option>
              <option value="very-important">Очень важно</option>
            </select>
            {setTimeAlarmInput(todoDataUpdateForm.timealarm)}
            <div className="button-wrapper">
              {this.props.isFetchingUpdate ? <div className="spinner" /> : <button type="submit">&#10003;</button>}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todoDataUpdateForm: state.todos.todoDataUpdateForm,
  hideTodoUpdateAfterUpdate: state.todos.hideTodoUpdateAfterUpdate
});

const mapActionCreatorsToProps = (dispatch) => {
  return bindActionCreators({ setDataTodoUpdateForm, updateTodo, hideTodoUpdate, deleteTodo }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapActionCreatorsToProps)(TodoUpdateDelete));
