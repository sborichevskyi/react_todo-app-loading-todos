import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 2248;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const getCompletedTodos = () => {
  return client
    .get<Todo[]>(`/todos?userId=${USER_ID}`)
    .then(allTodos => allTodos.filter(todo => todo.completed));
};

export const getActiveTodos = () => {
  return client
    .get<Todo[]>(`/todos?userId=${USER_ID}`)
    .then(allTodos => allTodos.filter(todo => !todo.completed));
};

export const createNewTodo = async (
  inputText: string,
  setError: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  setVisibleTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
) => {
  try {
    const todos = await getTodos();

    const newId =
      todos.length === 0 ? 1 : Math.max(...todos.map(todo => todo.id)) + 1;

    const newTodo: Todo = {
      id: newId,
      userId: 2248,
      title: inputText.trim(),
      completed: false,
    };

    await client.post(`/todos?userId=${USER_ID}`, newTodo);
    setVisibleTodos(prevTodos => [...prevTodos, newTodo]);
  } catch (error) {
    setError(true);
    setErrorMessage('Unable to create a new todo');
  }
};

export enum FilterEnum {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const addTodo = (
  inputText: string,
  setError: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  setVisibleTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
) => {
  if (inputText.trim() === '') {
    setError(true);
    setErrorMessage('Title should not be empty');
  } else {
    createNewTodo(inputText, setError, setErrorMessage, setVisibleTodos);
  }
};
