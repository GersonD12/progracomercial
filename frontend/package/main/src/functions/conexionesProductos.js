/* eslint-disable import/prefer-default-export */
import axios from 'axios';

// Conexiones para Estudiantes
export const getProductos = async (datos) => {
    try {
        const response = await axios.get('http://localhost:8000/productos/', {
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
        return { success: false, message: 'Error al listar productos' };
    }
};

export const getProductosNombre = async (datos) => {
    try {
        const response = await axios.post('http://localhost:8000/busquedaProductos/', datos, {
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
        return { success: false, message: 'Error al buscar productos' };
    }
};

export const getProductosCarrera = async (datos) => {
    try {
        const response = await axios.post('http://localhost:8000/busquedaCarreras/', datos, {
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
        return { success: false, message: 'Error al buscar carreras' };
    }
};
