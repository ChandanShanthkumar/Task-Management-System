import axios from "axios";

const API_URL = "http://localhost:8080/todos";
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};



export const getTodos = async () => {  
    const headers = getAuthHeader();
  try {
    const response = await axios.get(API_URL, {headers});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCompletedTodos = async () => {
    const headers = getAuthHeader();
    try {
      const response = await axios.get(`${API_URL}/completed`, {headers});
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const updateTodoStatus = async (id, isCompleted) => {
    const headers = getAuthHeader();
  try {
    const response = await axios.put(`${API_URL}/${id}/status`, {isCompleted}, {headers});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAllCompletedTodos = async () => {
    const headers = getAuthHeader();
  try {
    const response = await axios.delete(`${API_URL}/deleteallcompleted`, {headers});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTodoById = async (id) => {
    const headers = getAuthHeader();
  try {
    const response = await axios.get(`${API_URL}/${id}`, {headers});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addTodo = async (todo) => {
    const headers = getAuthHeader();
  try {
    const response = await axios.post(API_URL, todo, {headers});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTodoById = async (id, updatedTodo) => {
    const headers = getAuthHeader();
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedTodo, {headers});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTodoById = async (id) => {
    const headers = getAuthHeader();
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {headers});
    return response.data;
  } catch (error) {
    throw error;
  }
};
