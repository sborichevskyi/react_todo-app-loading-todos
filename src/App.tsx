/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { client } from './utils/fetchClient';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotifications } from './components/ErrorNotifications';

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  const [, setLoading] = useState(false);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [inputText, setInputText] = useState('');

  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    setLoading(true);
    client
      .get<Todo[]>(`/todos?userId=${USER_ID}`)
      .then(todosFromServer => {
        setVisibleTodos(todosFromServer);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setErrorMessage('Unable to load todos');
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          visibleTodos={visibleTodos}
          inputText={inputText}
          error={error}
          setInputText={setInputText}
          setError={setError}
          setErrorMessage={setErrorMessage}
        />
        <TodoList visibleTodos={visibleTodos} />

        {/* Hide the footer if there are no todos */}
        {visibleTodos.length > 0 && (
          <Footer
            visibleTodos={visibleTodos}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            setVisibleTodos={setVisibleTodos}
          />
        )}
      </div>

      <ErrorNotifications
        error={error}
        errorMessage={errorMessage}
        setError={setError}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
