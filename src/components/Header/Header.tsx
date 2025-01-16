import React, { useEffect } from 'react';
import { Todo } from '../../types/Todo';
import { createNewTodo } from '../../api/todos';
import classNames from 'classnames';

interface HeaderProps {
  visibleTodos: Todo[];
  inputText: string;
  error: boolean;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const Header: React.FC<HeaderProps> = ({
  visibleTodos,
  inputText,
  error,
  setInputText,
  setError,
  setErrorMessage,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setError(false);
      setErrorMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [error, setError, setErrorMessage]);

  return (
    <header className="todoapp__header">
      {visibleTodos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: visibleTodos.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
        />
      )}

      {/* Add a todo on form submit */}
      <form
        onSubmit={event => {
          event.preventDefault();
          if (inputText.trim() === '') {
            setError(true);
            setErrorMessage('Title should not be empty');
          } else {
            createNewTodo(inputText, setError, setErrorMessage);
          }
        }}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputText}
          onChange={event => setInputText(event.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};
