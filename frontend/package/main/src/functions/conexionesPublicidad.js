/* eslint-disable import/prefer-default-export */
import axios from 'axios';

// Conexiones para Proveedores
export const getPublicidad = async (datos) => {
    try {
        const response = await axios.get('http://localhost:8000/publicidad/', {
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
        return { success: false, message: 'Error al cargar Publicidad' };
    }
};

export const createPublicidad = async (datos) => {
    try {
        const response = await axios.post('http://localhost:8000/publicidad/nuevo/', datos, {
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
        return { success: false, message: 'Error al crear Publicidad' };
    }
};

export const updatePublicidad = async (datos) => {
    try {
        const response = await axios.put(`http://localhost:8000/publicidad/${datos.id}/editar/`, datos, {
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
        return { success: false, message: 'Error al actualizar Publicidad' };
    }
};

export const deletePublicidad = async (datos) => {
    try {
        const response = await axios.delete(`http://localhost:8000/publicidad/${datos.id}/eliminar/`, {
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
        return { success: false, message: 'Error al eliminar Publicidad' };
    }
};