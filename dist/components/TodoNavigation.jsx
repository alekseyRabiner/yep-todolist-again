import React from 'react';
import { Link, withRouter } from 'react-router';

const hideDropdown = (event) => {
  const dropdownImportance = document.querySelector('.dropdown-importance');
  if (dropdownImportance.classList.contains('show') && !event.target.classList.contains('dropbtn-nav')) {
    if (event.target.classList.contains('link-todo') || !event.target.classList.contains('dropdown-importance')) {
      dropdownImportance.classList.remove('show');
    }
  }
};

const setButtonValue = (location) => {
  const locationName = location.pathname.slice(1);
  switch (locationName) {
    case 'common':
      return 'Обычные';
    case 'important':
      return 'Срочные';
    case 'very-important':
      return 'Очень срочные';
    case 'ended':
      return 'Законченные';
    default:
      return 'Все списки';
  }
};

class TodoNavigation extends React.Component {
  componentDidMount() {
    document.addEventListener('click', event => hideDropdown(event));
  }
  componentWillUnmount() {
    document.removeEventListener('click', event => hideDropdown(event));
  }
  render() {
    return (
      <div id="navigation-container">
        <nav className="todo-navigation">
          <button
            className="dropbtn-nav"
            onClick={() => {
              document.querySelector('.dropdown-importance').classList.toggle('show');
            }}>{setButtonValue(this.props.location)} <span /></button>
          <div className="dropdown-importance">
            <ul>
              <li>
                <Link to="/" className="link-todo" activeClassName="link-todo-active">Все списки</Link>
              </li>
              <li>
                <Link to="/very-important" className="link-todo" activeClassName="link-todo-active">Очень срочные</Link>
              </li>
              <li>
                <Link to="/important" className="link-todo" activeClassName="link-todo-active">Срочные</Link>
              </li>
              <li>
                <Link to="/common" className="link-todo" activeClassName="link-todo-active">Обычные</Link>
              </li>
              <li>
                <Link to="/ended" className="link-todo" activeClassName="link-todo-active">Законченные</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(TodoNavigation);
