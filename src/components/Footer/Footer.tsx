import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { getActiveTodos, getCompletedTodos, getTodos } from '../../api/todos';
import { FilterEnum } from '../../api/todos';

interface FooterProps {
  visibleTodos: Todo[];
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<FilterEnum>>;
  setVisibleTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedLentgh: number;
}

export const Footer: React.FC<FooterProps> = ({
  visibleTodos,
  selectedFilter,
  setSelectedFilter,
  setVisibleTodos,
  completedLentgh,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {completedLentgh} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(FilterEnum).map((curFilter, index) => {
          return (
            <a
              key={index}
              href={`#/${curFilter}`}
              className={classNames('filter__link', {
                selected: selectedFilter === curFilter,
              })}
              data-cy={`FilterLink${curFilter.charAt(0).toUpperCase() + curFilter.slice(1)}`}
              onClick={() => {
                if (selectedFilter === curFilter) {
                  return;
                }

                setSelectedFilter(curFilter);
                switch (curFilter) {
                  case FilterEnum.ALL:
                    getTodos().then(allTodos => setVisibleTodos(allTodos));
                    break;
                  case FilterEnum.ACTIVE:
                    getActiveTodos().then(activeTodos =>
                      setVisibleTodos(activeTodos),
                    );
                    break;
                  case FilterEnum.COMPLETED:
                    getCompletedTodos().then(completedTodos =>
                      setVisibleTodos(completedTodos),
                    );
                    break;
                  default:
                    break;
                }
              }}
            >
              {curFilter.charAt(0).toUpperCase() + curFilter.slice(1)}
            </a>
          );
        })}
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
