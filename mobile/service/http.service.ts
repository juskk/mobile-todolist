import axios from 'axios';
import ERRORS from './errors';

const CURRENT_URL = 'https://a1cb-78-137-14-58.ngrok.io';

export const getAllTodos = async (createdBy: string, {search, completed, filterByCompleted, filterByPublic, isPublic, page}: any) => {
  try {
    if (!createdBy) return
    const theCompleted = filterByCompleted ? completed : '';
    const thePublic = filterByPublic? isPublic : '';
    const response = await axios.get(`${CURRENT_URL}/api/todos/all/${createdBy}?search=${search}&page=${page}&completed=${theCompleted}&public=${thePublic}`);
    return response;
  } catch (e) {
    throw new Error('getAllTodos response failed');
  }
};

export const getTodo = async (id: string) => {
  const response = await fetch(`${CURRENT_URL}/api/todos/${id}`);

  if (!response.ok) throw new Error(ERRORS.notFound);
  return response.json();
};

export const deleteTodo = async (id: string) => {
  const response = await fetch(`${CURRENT_URL}/api/todos/delete/${id}`, { method: 'DELETE' });

  if (!response.ok) throw new Error(ERRORS.serverError);

  return true;
};

export const addTodo = async (data: any) => {
  try {
    await axios.post(`${CURRENT_URL}/api/todos/add`, data);
    return true;
  } catch (e) {
    throw new Error(`Error: ${e}`);
  }
};

export const updateTodo = async (data: any) => {
  try {
    await axios.post(`${CURRENT_URL}/api/todos/update/${data.id}`, data);
    return true;
  } catch (e) {
    throw new Error(`Error!: ${e}`);
  }
};

export const logIn = async (userData: {email: string, password: string}) => {
  const res = await fetch(`${CURRENT_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!res.ok) {
    if (res.status === 401) throw await res.json();
  }
  return res.json();
};

export const signUp = async (userData: {email: string, password: string}) => {
  const res = await fetch(`${CURRENT_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!res.ok) {
    if (res.status === 401) throw await res.json();
  }
  return res.json();
};