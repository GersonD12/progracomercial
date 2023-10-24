import React, { useState, useEffect } from 'react';
import { Col, FormGroup, Table } from 'reactstrap';
//import { Field, ErrorMessage, Formik, Form } from 'formik'; // Importa Formik y Form
//import * as Yup from 'yup';
import Cookies from 'js-cookie';
import ComponentCard from '../../components/ComponentCard';
import { getEstudiantes } from '../../functions/conexionesUsuarios';
import { getCarreras } from '../../functions/conexionesCarreras';

const Usuarios = () => {

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
        const response = await getEstudiantes(dataFields);
        const responseCarreras = await getCarreras(dataFields);

        if (response.success) {
          setEstudiantes(response.data);
          if (responseCarreras.success) {
            setCarreras(responseCarreras.data)
          }
          else {
            alert(responseCarreras.message);
          }
        } else {
          alert(response.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


  return (
    <div>
      <Col md="12">
        <ComponentCard title="Estudiantes registrados">
          <FormGroup>
            {/* <div className="table-responsive" style={{ maxHeight: '400px' }}> */}
            <div className="table-responsive">
              <Table>
                <thead>
                  <tr>
                    <th style={{ maxWidth: '200px' }}>Nombre</th>
                    <th style={{ maxWidth: '200px' }}>Correo</th>
                    <th style={{ maxWidth: '200px' }}>Carrera</th>
                    <th style={{ maxWidth: '200px' }}>Género</th>
                  </tr>
                </thead>
                <tbody>
                  {estudiantes.map((estudiante) => (
                    <tr key={estudiante.id}>
                      <td style={{ maxWidth: '200px' }}>{estudiante.nickname}</td>
                      <td style={{ maxWidth: '200px' }}>{estudiante.correo}</td>
                      <td style={{ maxWidth: '200px' }}>
                        {carreras.find((carrera) => carrera.id === estudiante.idCarrera_id)?.nombre_carrera}
                      </td>
                      <td style={{ maxWidth: '200px' }}>{estudiante.genero}</td>
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

export default Usuarios
