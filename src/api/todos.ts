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
