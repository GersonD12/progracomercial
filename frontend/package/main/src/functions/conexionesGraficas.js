/* eslint-disable import/prefer-default-export */
import axios from 'axios';

// Gráficas
export const Top3ProductosCarrera = async (datos) => {
    try {
        const response = await axios.get('http://localhost:8000/productos/top3carreras', {
            headers: {
                'Authorization': datos.token,
                'nombre-usuario': datos.nombre_usuario,
                'id-user': datos.id_User,
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return { success: false, message: error.response.data.message };
        }
        return { success: false, message: 'Error al buscar Top 3 de Productos por Carrera' };
    }
};

export const GeneralProductosCarrera = async (datos) => {
    try {
        const response = await axios.get('http://localhost:8000/productos/generalCarreras', {
            headers: {
                'Authorization': datos.token,
                'nombre-usuario': datos.nombre_usuario,
                'id-user': datos.id_User,
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return { success: false, message: error.response.data.message };
        }
        return { success: false, message: 'Error al buscar Productos por Carrera' };
    }
};

export const GeneralEstudiantesCarrera = async (datos) => {
    try {
        const response = await axios.get('http://localhost:8000/usuarios_estudiantes/generalestudiantes', {
            headers: {
                'Authorization': datos.token,
                'nombre-usuario': datos.nombre_usuario,
                'id-user': datos.id_User,
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return { success: false, message: error.response.data.message };
        }
        return { success: false, message: 'Error al buscar Productos por Carrera' };
    }
};

export const TotalEstudiantes = async (datos) => {
    try {
        const response = await axios.get('http://localhost:8000/productos/totalProductos', {
            headers: {
                'Authorization': datos.token,
                'nombre-usuario': datos.nombre_usuario,
                'id-user': datos.id_User,
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return { success: false, message: error.response.data.message };
        }
        return { success: false, message: 'Error al buscar Productos por Carrera' };
    }
};

export const TotalPublicaciones = async (datos) => {
    try {
        const response = await axios.get('http://localhost:8000/productos/totalPublicaciones', {
            headers: {
                'Authorization': datos.token,
                'nombre-usuario': datos.nombre_usuario,
                'id-user': datos.id_User,
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return { success: false, message: error.response.data.message };
        }
        return { success: false, message: 'Error al buscar Productos por Carrera' };
    }
};

export const TotalCarreras = async (datos) => {
    try {
        const response = await axios.get('http://localhost:8000/productos/totalCarreras', {
            headers: {
                'Authorization': datos.token,
                'nombre-usuario': datos.nombre_usuario,
                'id-user': datos.id_User,
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return { success: false, message: error.response.data.message };
        }
        return { success: false, message: 'Error al buscar Productos por Carrera' };
    }
};

export const TotalPublicidad = async (datos) => {
    try {
        const response = await axios.get('http://localhost:8000/productos/totalPublicidad', {
            headers: {
                'Authorization': datos.token,
                'nombre-usuario': datos.nombre_usuario,
                'id-user': datos.id_User,
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return { success: false, message: error.response.data.message };
        }
        return { success: false, message: 'Error al buscar Productos por Carrera' };
    }
};