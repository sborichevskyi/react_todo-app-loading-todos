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
) => {
  try {
    const todos = await client.get<Todo[]>(`/todos?userId=${USER_ID}`);

    const newId =
      todos.length === 0 ? 1 : Math.max(...todos.map(todo => todo.id)) + 1;

    const newTodo: Todo = {
      id: newId,
      userId: 2248,
      title: inputText,
      completed: false,
    };

    client.post(`/todos?userId=${USER_ID}`, newTodo);
  } catch (error) {
    setError(true);
    setErrorMessage('Unable to load todos');

    return;
  }
};
