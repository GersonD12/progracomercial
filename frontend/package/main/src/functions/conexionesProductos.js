/* eslint-disable import/prefer-default-export */
import axios from 'axios';

// Conexiones para Estudiantes
export const getProductos = async (datos) => {
    try {
        const response = await axios.get('http://localhost:8000/productos/', {
            headers: {
                'Authorization': datos.token,
                'nombre_usuario': datos.nombre_usuario,
                'id_user': datos.id_User,
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