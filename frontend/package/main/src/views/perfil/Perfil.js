import React, { useState, useEffect, useRef } from 'react';
import { Col, FormGroup, Label, Button, InputGroupText, InputGroup, Table } from 'reactstrap';
import { Field, ErrorMessage, Formik, Form } from 'formik'; // Importa Formik y Form
import { useNavigate  } from 'react-router-dom';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import ComponentCard from '../../components/ComponentCard';
//
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from '../../functions/conexionesPerfil';

const Perfil = () => {
  // Inicialización de variables
  const initialValues = {
    usuario: '',
    contra: '',
    confirmContra: '',
  };

  // Estado para almacenar la lista de usuarios
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosEdit, setUsuariosEdit] = useState(null);
  const authToken = Cookies.get('authToken');
  const navigate = useNavigate();

  // Validaciones
  const validationSchema = Yup.object().shape({
    usuario: Yup.string().required('Usuario es requerido'),
    contra: !usuariosEdit
      ? Yup.string()
          .min(6, 'Contraseña mínima de 6 caracteres')
          .required('Contraseña es requerida')
      : Yup.string(),
    confirmContra: !usuariosEdit
      ? Yup.string()
          .oneOf([Yup.ref('contra'), null], 'Las contraseñas no coinciden')
          .required('Confirmar contraseña es requerida')
      : Yup.string(),
  });

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
          nombreUser: nombreUsuario,
          id_User: idUser,
        };
        const response = await getUsuarios(dataFields);

        if (response.success) {
          setUsuarios(response.data);
        } else {
          alert(response.message);
        }
      } catch (error) {
        console.error(error);
        alert('Error al cargar los Usuarios');
      }
    };
    fetchData();
  }, []);

  const handleEliminarClick = async (id) => {
    if (window.confirm('¿Seguro que desea eliminar este Usuario?')) {
      try {
        const nombreUsuario = Cookies.get('username');
        const idUser = Cookies.get('userId');
        const dataFields = {
          id,
          token: authToken,
          nombreUser: nombreUsuario,
          id_User: idUser,
        };

        const response = await deleteUsuario(dataFields);

        if (response && response.success) {
          alert('Usuario eliminado con éxito');
          // Elimina el perfil de la tabla
          setUsuarios((prevUsuarios) => prevUsuarios.filter((term) => term.id !== id));
        } else {
          alert(response.message);
          console.error(response.message);
        }
      } catch (error) {
        alert('Error al eliminar Usuario');
        console.error(error);
      }
    }
  };

  const handleEditarClick = (index, setFieldValue) => {
    const elementoEncontrado = usuarios.find((usuario) => usuario.id === index);
    if (elementoEncontrado) {
      //
      setFieldValue('usuario', elementoEncontrado.nombre_usuario);
    }
    setUsuariosEdit(index);
  };

  const tableRef = useRef();
  return (
    <div>
      <Col md="12">
        <ComponentCard title="Perfiles">
          {/* Agrega el componente Formik y envuelve el formulario */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (fields, actions) => {
              try {
                const dataFields = {
                  nombre_usuario: fields.usuario,
                  password: fields.contra,
                  token: Cookies.get('authToken'),
                  nombreUser: Cookies.get('username'),
                  id_User: Cookies.get('userId')
                }
                // Crear
                if (usuariosEdit === null) {
                  const response = await createUsuario(dataFields);
                  if (response && response.success) {
                    alert('Usuario creado exitosamente');
                    actions.resetForm();
                    // Actualiza la tabla para mostrar las preguntas actualizadas
                    setUsuarios((prevProveedores) => [...prevProveedores, dataFields]);
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
                  const elementoEncontrado = usuarios.find(elemento => elemento.id === usuariosEdit);
                  const dataFields2 = {
                    id: elementoEncontrado.id,
                    nombre_usuario: fields.usuario,
                    password: fields.contra,
                    token: Cookies.get('authToken'),
                    nombreUser: Cookies.get('username'),
                    id_User: Cookies.get('userId')
                  };
                  const response = await updateUsuario(dataFields2);
                  if (response && response.success) {
                    alert('Actualización de Usuario con éxito');
                    actions.resetForm();
                    // Actualiza la tabla para mostrar las preguntas actualizadas
                    setUsuarios((prevUsuarios) =>
                      prevUsuarios.map((usuario) =>
                        usuario.id === elementoEncontrado.id
                          ? {
                            ...usuario,
                            nombre_usuario: fields.usuario,
                          }
                          : usuario
                      )
                    );
                    setUsuariosEdit(null);
                  } else {
                    alert(response.message); // Mensaje de error
                    console.error(response.message);
                  }
                }
              } catch (error) {
                alert('Error al crear Usuario');
                console.error(error);
              }
              actions.resetForm();
            }}
          >
            {({ errors, touched, handleSubmit, setFieldValue, resetForm }) => (
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="usuario">Nombre de usuario:</Label>
                  <InputGroup>
                    <InputGroupText>
                      <i className="bi-person-circle"></i>
                    </InputGroupText>
                    <Field
                      name="usuario"
                      type="text"
                      placeholder="Ingrese nombre de usuario"                      
                      className={`form-control ${errors.usuario && touched.usuario ? ' is-invalid' : ''
                        }`}
                    />
                    <ErrorMessage name="usuario" component="div" className="invalid-feedback" />
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="contra">Contraseña:</Label>
                  <InputGroup>
                    <InputGroupText>
                      <i className="bi bi-lock"></i>
                    </InputGroupText>
                    <Field
                      name="contra"
                      type="password"
                      placeholder="Ingrese contraseña"
                      disabled={usuariosEdit !== null}
                      className={`form-control ${errors.contra && touched.contra ? ' is-invalid' : ''
                        }`}
                    />
                    <ErrorMessage name="contra" component="div" className="invalid-feedback" />
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="confirmContra">Confirmar contraseña:</Label>
                  <InputGroup>
                    <InputGroupText>
                      <i className="bi bi-lock"></i>
                    </InputGroupText>
                    <Field
                      name="confirmContra"
                      type="password"
                      placeholder="Confirmar contraseña"
                      disabled={usuariosEdit !== null}
                      className={`form-control ${errors.confirmContra && touched.confirmContra ? ' is-invalid' : ''
                        }`}
                    />
                    <ErrorMessage
                      name="confirmContra"
                      component="div"
                      className="invalid-feedback"
                    />
                  </InputGroup>
                </FormGroup>

                <div className="border-top pt-3 mt-3 d-flex align-items-center gap-2">
                  <Button type="submit" className="btn btn-info mr-2">
                    {usuariosEdit !== null ? 'Guardar Cambios' : 'Ingresar'}
                  </Button>
                  <Button type="reset" className="btn btn-dark" onClick={() => { setUsuariosEdit(null); resetForm(); }}>
                    Cancelar
                  </Button>
                </div>

                <Col md="12">
                  <ComponentCard title="Tabla de Perfiles">
                    <FormGroup>
                      <div className="table-responsive" style={{ maxHeight: '400px' }} ref={tableRef}>
                        <Table>
                          <thead>
                            <tr>
                              <th>Nombre Usuario</th>
                              <th>Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {usuarios.map((usuario) => (
                              <tr key={usuario.id}>
                                <td>{usuario.nombre_usuario}</td>
                                <td>
                                  <Button
                                    className="btn btn-info btn-sm mr-2"
                                    onClick={() => handleEditarClick(usuario.id, setFieldValue)}
                                  >
                                    Editar
                                  </Button>{" "}
                                  <Button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleEliminarClick(usuario.id)}
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

export default Perfil
