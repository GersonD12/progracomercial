import React, { useState, useEffect, useRef } from 'react';
import {
  Col,
  FormGroup,
  Label,
  Button,
  InputGroupText,
  InputGroup,
  Table,
} from 'reactstrap';
import { Field, ErrorMessage, Formik, Form } from 'formik'; // Importa Formik y Form
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import ComponentCard from '../../components/ComponentCard';
//
import { getTerminos, createTerminos, updateTerminos, deleteTerminos } from '../../functions/conexionesTerminos';

const Termino = () => {
  // Inicialización de variables
  const initialValues = {
    fecha_creacion: '',
    texto: '',
  };

  // Validaciones
  const validationSchema = Yup.object().shape({
    fecha_creacion: Yup.date()
      .min(new Date(), 'La fecha no puede ser anterior a la fecha actual')
      .required('Fecha es requerida'),
    texto: Yup.string().required('Texto es requerido'),
  });

  // Estado para almacenar la lista de terminos
  const [terminos, setTerminos] = useState([]);
  const [terminosEdit, setTerminosEdit] = useState(null);

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
        const response = await getTerminos(dataFields);

        if (response.success) {
          setTerminos(response.data);
        } else {
          alert(response.message);
        }
      } catch (error) {
        console.error(error);
        alert('Error al cargar los Terminos y Condiciones.');
      }
    };
    fetchData();
  }, []);

  function formatearFecha(fecha) {
    const fechaFormateada = new Date(fecha).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return fechaFormateada;
  }

  const handleEliminarClick = async (id) => {
    if (window.confirm('¿Seguro que desea eliminar estos Terminos y Condiciones?')) {
      try {
        const authToken = Cookies.get('authToken');
        const nombreUsuario = Cookies.get('username');
        const idUser = Cookies.get('userId');
        const dataFields = {
          id,
          token: authToken,
          nombre_usuario: nombreUsuario,
          id_User: idUser,
        };

        const response = await deleteTerminos(dataFields);

        if (response && response.success) {
          alert('Terminos y Condiciones eliminados con éxito');
          // Elimina el perfil de la tabla
          setTerminos((prevTerminos) => prevTerminos.filter((term) => term.id !== id));
        } else {
          alert(response.message);
          console.error(response.message);
        }
      } catch (error) {
        alert('Error al eliminar los Terminos y Condiciones');
        console.error(error);
      }
    }
  };

  const handleEditarClick = (index, setFieldValue) => {
    const elementoEncontrado = terminos.find((elemento) => elemento.id === index);
    if (elementoEncontrado) {
      // Convierte la fecha al formato adecuado (AAAA-MM-DD)
      const fechaFormateada = new Date(elementoEncontrado.fecha_creacion)
      .toISOString()
      .split('T')[0];
      //
      setFieldValue('fecha_creacion', fechaFormateada);
      setFieldValue('texto', elementoEncontrado.texto);
    }
    setTerminosEdit(index);
  };
  
  const tableRef = useRef();
  return (
    <div>
      <Col md="12">
        <ComponentCard title="Terminos y Condiciones">
          {/* Agrega el componente Formik y envuelve el formulario */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (fields, actions) => {
              try {
                const dataFields = {
                  fecha_creacion: fields.fecha_creacion,
                  texto: fields.texto,
                  token: Cookies.get('authToken'),
                  nombre_usuario: Cookies.get('username'),
                  id_User: Cookies.get('userId')
                }
                // Crear
                if (terminosEdit === null) {
                  const response = await createTerminos(dataFields);
                  if (response && response.success) {
                    alert('Terminos y Condiciones creados exitosamente');
                    actions.resetForm();
                    // Actualiza la tabla para mostrar las preguntas actualizadas
                    setTerminos((prevTerminos) => [...prevTerminos, dataFields]);
                    // Enfoca la última pregunta
                    setTimeout(() => {
                      if (tableRef.current) {
                        tableRef.current.scrollTop = tableRef.current.scrollHeight;
                      }
                    }, 100);
                  } else {
                    alert(response.message);
                  }
                } else { // Actualizar una carrera
                  const elementoEncontrado = terminos.find(elemento => elemento.id === terminosEdit);
                  const dataFields2 = {
                    id: elementoEncontrado.id,
                    fecha_creacion: fields.fecha_creacion,
                    texto: fields.texto,
                    token: Cookies.get('authToken'),
                    nombre_usuario: Cookies.get('username'),
                    id_User: Cookies.get('userId')
                  };
                  const response = await updateTerminos(dataFields2);
                  if (response && response.success) {
                    alert('Actualización de Terminos y Condiciones con éxito');
                    actions.resetForm();
                    // Actualiza la tabla para mostrar las preguntas actualizadas
                    setTerminos((prevTerminos) =>
                      prevTerminos.map((term) =>
                        term.id === elementoEncontrado.id
                          ? {
                            ...term,
                            fecha_creacion: fields.fecha_creacion,
                            texto: fields.texto
                          }
                          : term
                      )
                    );
                    setTerminosEdit(null);
                  } else {
                    alert(response.message); // Mensaje de error
                    console.error(response.message);
                  }
                }
              } catch (error) {
                alert('Error al crear los Terminos y Condiciones');
                console.error(error);
              }
              actions.resetForm();
            }}
          >
            {({ errors, touched, handleSubmit, setFieldValue, resetForm }) => (
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label>Fecha de creación:</Label>
                  <InputGroup>
                    <InputGroupText>
                      <i className="bi-calendar-event"></i>
                    </InputGroupText>
                    <Col sm="11">
                      <Field
                        name="fecha_creacion"
                        type="date"
                        className={`form-control ${errors.fecha_creacion && touched.fecha_creacion ? ' is-invalid' : ''
                          }`}
                      />
                      <ErrorMessage name="fecha_creacion" component="div" className="invalid-feedback" />
                    </Col>
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="texto">Texto:</Label>
                  <InputGroup>
                    <InputGroupText>
                      <i className="bi-card-heading"></i>
                    </InputGroupText>
                    <Field
                      as="textarea"
                      name="texto"
                      placeholder="Ingrese texto"
                      style={{ maxWidth: '92%' }}
                      className={`form-control ${errors.texto && touched.texto ? 'is-invalid' : ''
                        }`}
                    />

                    <ErrorMessage name="texto" component="div" className="invalid-feedback" />
                  </InputGroup>
                </FormGroup>

                <div className="border-top pt-3 mt-3 d-flex align-items-center gap-2">
                  <Button type="submit" className="btn btn-success mr-2">
                    {terminosEdit !== null ? 'Guardar Cambios' : 'Ingresar'}
                  </Button>
                  <Button type="reset" className="btn btn-dark" onClick={() => {setTerminosEdit(null); resetForm();}}>
                    Cancelar
                  </Button>
                </div>

                <Col md="12">
                  <ComponentCard title="Tabla de Terminos y Condiciones">
                    <FormGroup>
                      <div className="table-responsive" style={{ maxHeight: '400px' }} ref={tableRef}>
                        <Table>
                          <thead>
                            <tr>
                              <th style={{ maxWidth: '80px' }}>Fecha</th>
                              <th style={{ maxWidth: '500px' }}>Texto</th>
                              <th style={{ maxWidth: '100px' }}>Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {terminos.map((termino) => (
                              <tr key={termino.id}>
                                <td style={{ maxWidth: '80px' }}>{formatearFecha(termino.fecha_creacion)}</td>
                                <td style={{ maxWidth: '500px', textAlign: 'justify' }}>{termino.texto}</td>
                                <td style={{ maxWidth: '100px' }}>
                                  <Button
                                    className="btn btn-info btn-sm mr-2"
                                    onClick={() => handleEditarClick(termino.id, setFieldValue)}
                                  >
                                    Editar
                                  </Button>{" "}
                                  <Button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleEliminarClick(termino.id)}
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
  );
};

export default Termino;
