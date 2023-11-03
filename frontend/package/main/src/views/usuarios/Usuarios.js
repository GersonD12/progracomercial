import React, { useState, useEffect } from 'react';
import { Col, FormGroup, Table, InputGroup, Button, Row, Form } from 'reactstrap';
import { useNavigate  } from 'react-router-dom';
import { Field, ErrorMessage, Formik } from 'formik'; // Importa Formik y Form
//import * as Yup from 'yup';
import Cookies from 'js-cookie';
import ComponentCard from '../../components/ComponentCard';
import { getEstudiantes, getUsuariosCarrera } from '../../functions/conexionesUsuarios';
import { getCarreras } from '../../functions/conexionesCarreras'; 

const Usuarios = () => {
  // Inicialización de variables
  const initialValues = {
    nomCarrera: ''
  };

  const [estudiantes, setEstudiantes] = useState([]);
  const [carreras, setCarreras] = useState([]);
  const authToken = Cookies.get('authToken');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!authToken) {
        navigate('/auth/loginformik');
        return;
      }
      
      try {
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

  // Función para buscar por carrera
  const searchByCarreraName = async (carreraName) => {
    try {
      const response = await getUsuariosCarrera(carreraName);
      if (response.success) {
        if (response.data.results) {
          setEstudiantes(response.data.results);
        } else {
          alert('No se encontraron carreras que coincidan con la búsqueda');
          const nombreUsuario = Cookies.get('username');
          const idUser = parseInt(Cookies.get('userId'), 10);
          const dataFields = {
            token: authToken,
            nombre_usuario: nombreUsuario,
            id_User: idUser,
          };
          const responseProductos = await getEstudiantes(dataFields);
          setEstudiantes(responseProductos.data);
        }
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Col md="12">
        <ComponentCard title="Estudiantes registrados">
        <Row>
            <Col>
              <Formik
                initialValues={initialValues}
                onSubmit={async (fields) => {
                  const dataFields = {
                    nombre_carrera: fields.nomCarrera,
                    token: Cookies.get('authToken'),
                    nombre_usuario: Cookies.get('username'),
                    id_User: Cookies.get('userId')
                  }
                  searchByCarreraName(dataFields);
                }}
              >
                {({ handleSubmit, errors, touched }) => (
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <InputGroup>
                        <Field
                          name="nomCarrera"
                          type="text"
                          placeholder="Ingrese nombre de la carrera"
                          className={`form-control ${errors.nomCarrera && touched.nomCarrera ? 'is-invalid' : ''
                            }`}
                        />
                        <ErrorMessage
                          name="nomCarrera"
                          component="div"
                          className="invalid-feedback"
                        />
                        <Button color="info" type='submit'>
                          <i className="bi bi-search"></i>
                        </Button>
                      </InputGroup>
                    </FormGroup>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
          <br />

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
