import React, { useState, useEffect, useRef } from 'react';
import { Col, FormGroup, Label, Button, InputGroupText, InputGroup, Table } from 'reactstrap';
import { useNavigate  } from 'react-router-dom';
import { Field, ErrorMessage, Formik, Form } from 'formik'; // Importa Formik y Form
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import ComponentCard from '../../components/ComponentCard';
//
import { getProveedores, createProveedor, updateProveedor, deleteProveedor } from '../../functions/conexionesProveedor';

const Proveedor = () => {
  // Inicialización de variables
  const initialValues = {
    nombre_proveedor: '',
    telefono: '',
    correo: '',
  };

  // Validaciones
  const validationSchema = Yup.object().shape({
    nombre_proveedor: Yup.string().required('Nombre es requerido'),
    telefono: Yup.string()
      .matches(/^[0-9]{8}$/, 'El teléfono debe contener 8 dígitos')
      .required('Teléfono es requerido'),
    correo: Yup.string().email('Correo es inválido').required('Correo es requerido'),
  });

  // Estado para almacenar la lista de terminos
  const [proveedores, setProveedores] = useState([]);
  const [proveedoresEdit, setProveedoresEdit] = useState(null);
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
        const response = await getProveedores(dataFields);

        if (response.success) {
          setProveedores(response.data);
        } else {
          alert(response.message);
        }
      } catch (error) {
        console.error(error);
        alert('Error al cargar los Proveedores');
      }
    };
    fetchData();
  }, []);

  const handleEliminarClick = async (id) => {
    if (window.confirm('¿Seguro que desea eliminar este Proveedor?')) {
      try {
        const nombreUsuario = Cookies.get('username');
        const idUser = Cookies.get('userId');
        const dataFields = {
          id,
          token: authToken,
          nombre_usuario: nombreUsuario,
          id_User: idUser,
        };

        const response = await deleteProveedor(dataFields);

        if (response && response.success) {
          alert('Proveedor eliminado con éxito');
          // Elimina el perfil de la tabla
          setProveedores((prevProveedor) => prevProveedor.filter((term) => term.id !== id));
        } else {
          alert(response.message);
          console.error(response.message);
        }
      } catch (error) {
        alert('Error al eliminar Proveedor');
        console.error(error);
      }
    }
  };

  const handleEditarClick = (index, setFieldValue) => {
    const elementoEncontrado = proveedores.find((proveedor) => proveedor.id === index);
    if (elementoEncontrado) {
      //
      setFieldValue('nombre_proveedor', elementoEncontrado.nombre_proveedor);
      setFieldValue('telefono', elementoEncontrado.telefono);
      setFieldValue('correo', elementoEncontrado.correo);
    }
    setProveedoresEdit(index);
  };

  const tableRef = useRef();
  return (
    <div>
      <Col md="12">
        <ComponentCard title="Proveedores">
          {/* Agrega el componente Formik y envuelve el formulario */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (fields, actions) => {
              try {
                const dataFields = {
                  nombre_proveedor: fields.nombre_proveedor,
                  telefono: fields.telefono,
                  correo: fields.correo,
                  token: Cookies.get('authToken'),
                  nombre_usuario: Cookies.get('username'),
                  id_User: Cookies.get('userId')
                }
                // Crear
                if (proveedoresEdit === null) {
                  const response = await createProveedor(dataFields);
                  if (response && response.success) {
                    alert('Proveedor creado exitosamente');
                    actions.resetForm();
                    // Actualiza la tabla para mostrar las preguntas actualizadas
                    setProveedores((prevProveedores) => [...prevProveedores, dataFields]);
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
                  const elementoEncontrado = proveedores.find(elemento => elemento.id === proveedoresEdit);
                  const dataFields2 = {
                    id: elementoEncontrado.id,
                    nombre_proveedor: fields.nombre_proveedor,
                    telefono: fields.telefono,
                    correo: fields.correo,
                    token: Cookies.get('authToken'),
                    nombre_usuario: Cookies.get('username'),
                    id_User: Cookies.get('userId')
                  };
                  const response = await updateProveedor(dataFields2);
                  if (response && response.success) {
                    alert('Actualización de Proveedor con éxito');
                    actions.resetForm();
                    // Actualiza la tabla para mostrar las preguntas actualizadas
                    setProveedores((prevProveedor) =>
                      prevProveedor.map((proveedor) =>
                        proveedor.id === elementoEncontrado.id
                          ? {
                            ...proveedor,
                            nombre_proveedor: fields.nombre_proveedor,
                            telefono: fields.telefono,
                            correo: fields.correo
                          }
                          : proveedor
                      )
                    );
                    setProveedoresEdit(null);
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
                  <Label htmlFor="nombre_proveedor">Nombre proveedor:</Label>
                  <InputGroup>
                    <InputGroupText>
                      <i className="bi-person-fill"></i>
                    </InputGroupText>
                    <Field
                      name="nombre_proveedor"
                      type="text"
                      placeholder="Ingrese nombre proveedor"
                      className={`form-control ${errors.nombre_proveedor && touched.nombre_proveedor ? ' is-invalid' : ''
                        }`}
                    />
                    <ErrorMessage name="nombre_proveedor" component="div" className="invalid-feedback" />
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="telefono">Teléfono:</Label>
                  <InputGroup>
                    <InputGroupText>
                      <i className="bi-phone"></i>
                    </InputGroupText>
                    <Field
                      name="telefono"
                      type="text"
                      placeholder="Ingrese teléfono"
                      className={`form-control ${errors.telefono && touched.telefono ? ' is-invalid' : ''
                        }`}
                    />
                    <ErrorMessage name="telefono" component="div" className="invalid-feedback" />
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="correo">Correo:</Label>
                  <InputGroup>
                    <InputGroupText>
                      <i className="bi bi-envelope"></i>
                    </InputGroupText>
                    <Field
                      name="correo"
                      type="text"
                      placeholder="Ingrese correo"
                      className={`form-control ${errors.correo && touched.correo ? ' is-invalid' : ''
                        }`}
                    />
                    <ErrorMessage name="correo" component="div" className="invalid-feedback" />
                  </InputGroup>
                </FormGroup>


                <div className="border-top pt-3 mt-3 d-flex align-items-center gap-2">
                  <Button type="submit" className="btn btn-info mr-2">
                    {proveedoresEdit !== null ? 'Guardar Cambios' : 'Ingresar'}
                  </Button>
                  <Button type="reset" className="btn btn-dark" onClick={() => { setProveedoresEdit(null); resetForm(); }}>
                    Cancelar
                  </Button>
                </div>

                <Col md="12">
                  <ComponentCard title="Tabla de Proveedores">
                    <FormGroup>
                      <div className="table-responsive" style={{ maxHeight: '400px' }} ref={tableRef}>
                        <Table>
                          <thead>
                            <tr>
                              <th>Nombre Proveedor</th>
                              <th>Teléfono</th>
                              <th>Correo</th>
                              <th>Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {proveedores.map((proveedor) => (
                              <tr key={proveedor.id}>
                                <td>{proveedor.nombre_proveedor}</td>
                                <td>{proveedor.telefono}</td>
                                <td>{proveedor.correo}</td>
                                <td>
                                  <Button
                                    className="btn btn-info btn-sm mr-2"
                                    onClick={() => handleEditarClick(proveedor.id, setFieldValue)}
                                  >
                                    Editar
                                  </Button>{" "}
                                  <Button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleEliminarClick(proveedor.id)}
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

export default Proveedor
