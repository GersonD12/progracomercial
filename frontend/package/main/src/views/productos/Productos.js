import React, { useState, useEffect } from 'react';
import { Col, FormGroup, Table, InputGroup, Button, Row, Form } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { Field, ErrorMessage, Formik } from 'formik';
//import * as Yup from 'yup';
import Cookies from 'js-cookie';
import ComponentCard from '../../components/ComponentCard';
import { getEstudiantes } from '../../functions/conexionesUsuarios';
import { getCarreras } from '../../functions/conexionesCarreras';
import { getProductos, getProductosNombre, getProductosCarrera } from '../../functions/conexionesProductos';

const Productos = () => {
  // Inicialización de variables
  const initialValues = {
    nomProducto: '',
    nomCarrera: ''
  };

  const [productos, setProductos] = useState([]);
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
        //const authToken = Cookies.get('authToken');
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
  }, [authToken]);

  const maxWords = 8;
  const [expanded, setExpanded] = useState([]);

  const toggleExpand = (index) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  // Función para buscar por nombre
  const searchByProductName = async (productName) => {
    try {
      const response = await getProductosNombre(productName);
      if (response.success) {
        if (response.data.results) {
          setProductos(response.data.results);
        } else {
          alert('No se encontraron productos que coincidan con la búsqueda');
          const nombreUsuario = Cookies.get('username');
          const idUser = parseInt(Cookies.get('userId'), 10);
          const dataFields = {
            token: authToken,
            nombre_usuario: nombreUsuario,
            id_User: idUser,
          };
          const responseProductos = await getProductos(dataFields);
          setProductos(responseProductos.data);
        }
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Función para buscar por carrera
  const searchByCarreraName = async (carreraName) => {
    try {
      const response = await getProductosCarrera(carreraName);
      if (response.success) {
        if (response.data.results) {
          setProductos(response.data.results);
        } else {
          alert('No se encontraron carreras que coincidan con la búsqueda');
          const nombreUsuario = Cookies.get('username');
          const idUser = parseInt(Cookies.get('userId'), 10);
          const dataFields = {
            token: authToken,
            nombre_usuario: nombreUsuario,
            id_User: idUser,
          };
          const responseProductos = await getProductos(dataFields);
          setProductos(responseProductos.data);
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
        <ComponentCard title="Productos">
          <Row>
            <Col>
              <Formik
                initialValues={initialValues}
                onSubmit={async (fields) => {
                  const dataFields = {
                    nombre_producto: fields.nomProducto,
                    token: Cookies.get('authToken'),
                    nombre_usuario: Cookies.get('username'),
                    id_User: Cookies.get('userId')
                  }
                  searchByProductName(dataFields);
                }}
              >
                {({ handleSubmit, errors, touched }) => (
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <InputGroup>
                        <Field
                          name="nomProducto"
                          type="text"
                          placeholder="Ingrese nombre del producto"
                          className={`form-control ${errors.nomProducto && touched.nomProducto ? 'is-invalid' : ''
                            }`}
                        />
                        <ErrorMessage
                          name="nomProducto"
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
                    <th style={{ maxWidth: '150px' }}>Nombre</th>
                    <th style={{ maxWidth: '240px' }}>Descripción</th>
                    <th style={{ maxWidth: '100px' }}>Precio</th>
                    <th style={{ maxWidth: '100px' }}>Usuario</th>
                    <th style={{ maxWidth: '150px' }}>Carrera</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((producto, index) => (
                    <tr key={producto.id}>
                      <td style={{ maxWidth: '150px' }}>{producto.nombre_producto}</td>
                      <td style={{
                        maxWidth: '240px',
                        textAlign: 'justify', // Añade esta línea
                        textJustify: 'inter-word' // Esto ayuda a justificar palabras individualmente
                      }}>
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
                      <td style={{ maxWidth: '100px' }}>{`Q. ${producto.precio}`}</td>
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
