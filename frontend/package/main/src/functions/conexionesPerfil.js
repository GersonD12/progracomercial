/* eslint-disable import/prefer-default-export */
import axios from 'axios';

// Conexiones para Proveedores
export const getUsuarios = async (datos) => {
    try {
        const response = await axios.get('http://localhost:8000/usuarios_admin/', {
            headers: {
                'Authorization': datos.token,
                'nombre-usuario': datos.nombreUser,
                'id-user': datos.id_User,
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return { success: false, message: error.response.data.message };
        }
        return { success: false, message: 'Error al cargar Usuarios' };
    }
};

export const createUsuario= async (datos) => {
    try {
        const response = await axios.post('http://localhost:8000/usuarios_admin/nuevo/', datos, {
            headers: {
                'Authorization': datos.token,
                'nombre-usuario': datos.nombreUser,
                'id-user': datos.id_User,
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return { success: false, message: error.response.data.message };
        }
        return { success: false, message: 'Error al crear Usuario' };
    }
};

export const updateUsuario = async (datos) => {
    try {
        const response = await axios.put(`http://localhost:8000/usuarios_admin/${datos.id}/editar/`, datos, {
            headers: {
                'Authorization': datos.token,
                'nombre-usuario': datos.nombreUser,
                'id-user': datos.id_User,
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return { success: false, message: error.response.data.message };
        }
        return { success: false, message: 'Error al actualizar Usuario' };
    }
};

export const deleteUsuario = async (datos) => {
    try {
        const response = await axios.delete(`http://localhost:8000/usuarios_admin/${datos.id}/eliminar/`, {
            headers: {
                'Authorization': datos.token,
                'nombre-usuario': datos.nombreUser,
                'id-user': datos.id_User,
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return { success: false, message: error.response.data.message };
        }
        return { success: false, message: 'Error al eliminar Usuario' };
    }
};