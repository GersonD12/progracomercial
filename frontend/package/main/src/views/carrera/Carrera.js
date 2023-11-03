import React, { useState, useEffect, useRef } from 'react';
import { Col, Form, FormGroup, Label, Button, InputGroupText, InputGroup, Table } from 'reactstrap';
import { Field, ErrorMessage, Formik } from 'formik'; // Importa Formik y Form
import { useNavigate  } from 'react-router-dom';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import ComponentCard from '../../components/ComponentCard';
//
import { getCarreras, createCarreras, updateCarreras, deleteCarrera } from '../../functions/conexionesCarreras';

const Carrera = () => {
  // Inicialización de variables
  const initialValues = {
    nombre_carrera: '',
  };

  // Validaciones
  const validationSchema = Yup.object().shape({
    nombre_carrera: Yup.string().required('Carrera es requerida'),
  });

  // Estado para almacenar la lista de carreras
  const [carreras, setCarreras] = useState([]);
  const [carrerasEdit, setCarrerasEdit] = useState(null);
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
        const response = await getCarreras(dataFields);

        if (response.success) {
          setCarreras(response.data);
        } else {
          alert(response.message);
        }
      } catch (error) {
        console.error(error);
        alert('Error al cargar las carreras.');
      }
    };
    fetchData();
  }, []);

  const handleEliminarClick = async (id) => {
    if (window.confirm('¿Seguro que desea eliminar esta carrera?')) {
      try {
        const nombreUsuario = Cookies.get('username');
        const idUser = Cookies.get('userId');
        const dataFields = {
          id,
          token: authToken,
          nombre_usuario: nombreUsuario,
          id_User: idUser,
        };

        const response = await deleteCarrera(dataFields);

        if (response && response.success) {
          alert('Carrera eliminada con éxito');
          // Elimina el perfil de la tabla
          setCarreras((prevCarreras) => prevCarreras.filter((carrera) => carrera.id !== id));
        } else {
          alert(response.message);
          console.error(response.message);
        }
      } catch (error) {
        alert('Error al eliminar la carrera');
        console.error(error);
      }
    }
  };

  const handleEditarClick = (index, setFieldValue) => {
    const elementoEncontrado = carreras.find(elemento => elemento.id === index);
    if (elementoEncontrado) {
      setFieldValue('nombre_carrera', elementoEncontrado.nombre_carrera);
    }
    setCarrerasEdit(index);
  };

  const tableRef = useRef();
  return (
    <div>
      {/* Formulario */}
      <Col md="12">
        <ComponentCard title="Carreras">
          {/* Agrega el componente Formik y envuelve el formulario */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (fields, actions) => {
              try {
                const dataFields = {
                  nombre_carrera: fields.nombre_carrera,
                  token: Cookies.get('authToken'),
                  nombre_usuario: Cookies.get('username'),
                  id_User: Cookies.get('userId')
                }
                // Crear una nueva carrera
                if (carrerasEdit === null) {
                  const response = await createCarreras(dataFields);
                  if (response && response.success) {
                    alert('Carrera creada exitosamente');
                    actions.resetForm();
                    // Actualiza la tabla para mostrar las preguntas actualizadas
                    setCarreras((prevCarreras) => [...prevCarreras, dataFields]);
                    // Enfoca la última pregunta
                    setTimeout(() => {
                      if (tableRef.current) {
                        tableRef.current.scrollTop = tableRef.current.scrollHeight;
                      }
                    }, 100);
                  } else {
                    alert(response.message);
                    console.error(response.message);
                  }
                } else { // Actualizar una carrera
                  const elementoEncontrado = carreras.find(elemento => elemento.id === carrerasEdit);
                  const dataFields2 = {
                    id: elementoEncontrado.id,
                    nombre_carrera: fields.nombre_carrera,
                    token: Cookies.get('authToken'),
                    nombre_usuario: Cookies.get('username'),
                    id_User: Cookies.get('userId')
                  };
                  const response = await updateCarreras(dataFields2);
                  if (response && response.success) {
                    alert('Actualización de carrera con éxito');
                    actions.resetForm();
                    // Actualiza la tabla para mostrar las preguntas actualizadas
                    setCarreras((prevCarreras) =>
                      prevCarreras.map((carrera) =>
                        carrera.id === elementoEncontrado.id
                          ? {
                            ...carrera,
                            nombre_carrera: fields.nombre_carrera,
                          }
                          : carrera
                      )
                    );
                    setCarrerasEdit(null);
                  } else {
                    alert(response.message); // Mensaje de error
                    console.error(response.message);
                  }
                }
              } catch (error) {
                alert('Error al crear la carrera');
                console.error(error);
              }
              actions.resetForm();
            }}
          >
            {({ handleSubmit, errors, touched, setFieldValue, resetForm }) => (
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="nombre_carrera">Carrera:</Label>
                  <InputGroup>
                    <InputGroupText>
                      <i className="bi-card-heading"></i>
                    </InputGroupText>
                    <Field
                      name="nombre_carrera"
                      type="text"
                      placeholder="Ingrese carrera"
                      className={`form-control ${errors.nombre_carrera && touched.nombre_carrera ? 'is-invalid' : ''
                        }`}
                    />
                    {/* Agrega el componente ErrorMessage para mostrar mensajes de error */}
                    <ErrorMessage
                      name="nombre_carrera"
                      component="div"
                      className="invalid-feedback"
                    />
                  </InputGroup>
                </FormGroup>
                <div className="border-top pt-3 mt-3 d-flex align-items-center gap-2">
                  <Button type="submit" className="btn btn-info mr-2">
                    {carrerasEdit !== null ? 'Guardar Cambios' : 'Ingresar'}
                  </Button>
                  <Button type="reset" className="btn btn-dark" onClick={() => {setCarrerasEdit(null); resetForm();}}>
                    Cancelar
                  </Button>
                </div>

                <Col md="12">
                  <ComponentCard title="Tabla de carreras">
                    <FormGroup>
                      <div className="table-responsive" style={{ maxHeight: '400px' }} ref={tableRef}>
                        <Table>
                          <thead>
                            <tr>
                              <th>Carrera</th>
                              <th>Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {carreras.map((carrera) => (
                              <tr key={carrera.id}>
                                <td>{carrera.nombre_carrera}</td>
                                <td>
                                  <Button
                                    className="btn btn-info btn-sm mr-2"
                                    onClick={() => handleEditarClick(carrera.id, setFieldValue)}
                                  >
                                    Editar
                                  </Button>{" "}
                                  <Button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleEliminarClick(carrera.id)}
                                  >
                                    Eliminar
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </FormGroup>
                  </ComponentCard>
                </Col>

              </Form>
            )}
          </Formik>
        </ComponentCard>
      </Col>
    </div>
  )
}

export default Carrera
