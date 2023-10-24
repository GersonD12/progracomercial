import React, { useState, useEffect } from 'react';
import { Col, FormGroup, Table } from 'reactstrap';
//import { Field, ErrorMessage, Formik, Form } from 'formik'; // Importa Formik y Form
//import * as Yup from 'yup';
import Cookies from 'js-cookie';
import ComponentCard from '../../components/ComponentCard';
import { getEstudiantes } from '../../functions/conexionesUsuarios';
import { getCarreras } from '../../functions/conexionesCarreras';
import { getProductos } from '../../functions/conexionesProductos';

const Productos = () => {

  const [productos, setProductos] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [carreras, setCarreras] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = Cookies.get('authToken');
        const nombreUsuario = Cookies.get('username');
        const idUser = parseInt(Cookies.get('userId'), 10);
        const dataFields = {
          token: authToken,
          nombre_usuario: nombreUsuario,
          id_User: idUser,
        };
        const responseProductos = await getProductos(dataFields);
        const responseEstudiantes = await getEstudiantes(dataFields);
        const responseCarreras = await getCarreras(dataFields);

        if (responseProductos.success) {
          setProductos(responseProductos.data);
          if (responseEstudiantes.success) {
            setEstudiantes(responseEstudiantes.data)
            if (responseCarreras.success) {
              setCarreras(responseCarreras.data)
            }
          }
          else {
            alert(responseEstudiantes.message);
          }
        } else {
          alert(responseProductos.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const maxWords = 5;
  const [expanded, setExpanded] = useState([]);

  const toggleExpand = (index) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  return (
    <div>
      <Col md="12">
        <ComponentCard title="Productos">
          <FormGroup>
            {/* <div className="table-responsive" style={{ maxHeight: '400px' }}> */}
            <div className="table-responsive">
              <Table>
                <thead>
                  <tr>
                    <th style={{ maxWidth: '150px' }}>Nombre</th>
                    <th style={{ maxWidth: '200px' }}>Descripción</th>
                    <th style={{ maxWidth: '100px' }}>Imagen</th>
                    <th style={{ maxWidth: '500px' }}>Precio</th>
                    <th style={{ maxWidth: '100px' }}>Usuario</th>
                    <th style={{ maxWidth: '150px' }}>Carrera</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((producto, index) => (
                    <tr key={producto.id}>
                      <td style={{ maxWidth: '150px' }}>{producto.nombre_producto}</td>
                      <td style={{ maxWidth: '200px' }}>
                        {expanded[index]
                          ? producto.descripcion
                          : producto.descripcion
                            .split(' ')
                            .slice(0, maxWords)
                            .join(' ')}
                        {producto.descripcion.split(' ').length > maxWords && (
                          <span
                            style={{ cursor: 'pointer', color: 'purple' }}
                            onClick={() => toggleExpand(index)}
                          >
                            {expanded[index] ? <><br />Mostrar menos</> : ' ...más'}
                          </span>
                        )}
                      </td>
                      <td style={{ maxWidth: '100px' }}>{producto.imagen}</td>
                      <td style={{ maxWidth: '50px' }}>{`Q. ${producto.precio}`}</td>
                      <td style={{ maxWidth: '100px' }}>
                        {estudiantes.find((estudiante) => estudiante.id === producto.idUsuario_id)
                          ?.nickname}
                      </td>
                      <td style={{ maxWidth: '150px' }}>
                        {carreras.find((carrera) => carrera.id === producto.idCarrera_id)
                          ?.nombre_carrera}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </FormGroup>
        </ComponentCard>
      </Col>

    </div>
  )
}

export default Productos
