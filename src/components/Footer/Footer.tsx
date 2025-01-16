import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { getActiveTodos, getCompletedTodos, getTodos } from '../../api/todos';

interface FooterProps {
  visibleTodos: Todo[];
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
  setVisibleTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const Footer: React.FC<FooterProps> = ({
  visibleTodos,
  selectedFilter,
  setSelectedFilter,
  setVisibleTodos,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {visibleTodos.filter(todo => !todo.completed).length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: selectedFilter === 'all',
          })}
          data-cy="FilterLinkAll"
          onClick={() => {
            if (selectedFilter === 'all') {
              return;
            }

            setSelectedFilter('all');
            getTodos().then(allTodos => setVisibleTodos(allTodos));
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: selectedFilter === 'active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => {
            if (selectedFilter === 'active') {
              return;
            }

            setSelectedFilter('active');
            getActiveTodos().then(activeTodos => setVisibleTodos(activeTodos));
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: selectedFilter === 'completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => {
            if (selectedFilter === 'completed') {
              return;
            }

            setSelectedFilter('completed');
            getCompletedTodos().then(completedTodos =>
              setVisibleTodos(completedTodos),
            );
          }}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!visibleTodos.some(todo => todo.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
};
