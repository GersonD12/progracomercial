/* eslint-disable import/prefer-default-export */
import axios from 'axios';

// Conexiones para Login
export const Login = async (datos) => {
  try {
    const response = await axios.post('http://localhost:8000/login/', datos);
    return { success: true, data: response.data };
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return { success: false, message: error.response.data.message };
    }
    return { success: false, message: 'Error al iniciar sesión' };
  }
};