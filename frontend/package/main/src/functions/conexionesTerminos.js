/* eslint-disable import/prefer-default-export */
import axios from 'axios';

// Conexiones para Carreras
export const getTerminos = async (datos) => {
    try {
        const response = await axios.get('http://localhost:8000/terminos/', {
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
        return { success: false, message: 'Error al cargar los Términos y Condiciones' };
    }
};

export const createTerminos = async (datos) => {
    try {
        const response = await axios.post('http://localhost:8000/terminos/nuevo/', datos, {
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
        return { success: false, message: 'Error al crear los Terminos y Condiciones' };
    }
};

export const updateTerminos = async (datos) => {
    try {
        const response = await axios.put(`http://localhost:8000/terminos/${datos.id}/editar/`, datos, {
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
        return { success: false, message: 'Error al actualizar los Terminos y Condiciones' };
    }
};

export const updateTerminosEstado = async (datos) => {
    try {
        const response = await axios.put(`http://localhost:8000/terminos/${datos.id}/editarEstado/`, datos, {
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
        return { success: false, message: 'Error al actualizar el Estado de Terminos y Condiciones' };
    }
};

export const deleteTerminos = async (datos) => {
    try {
        const response = await axios.delete(`http://localhost:8000/terminos/${datos.id}/eliminar/`, {
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
        return { success: false, message: 'Error al eliminar los Terminos y Condiciones' };
    }
};