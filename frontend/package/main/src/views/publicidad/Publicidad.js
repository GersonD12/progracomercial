import React, { useState, useEffect, useRef } from 'react';
import { Col, FormGroup, Label, Button, InputGroupText, InputGroup, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { Field, ErrorMessage, Formik, Form } from 'formik'; // Importa Formik y Form
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import ComponentCard from '../../components/ComponentCard';
//
import { getPublicidad, createPublicidad, updatePublicidad, deletePublicidad } from '../../functions/conexionesPublicidad';
import { getProveedores } from '../../functions/conexionesProveedor';

const Publicidad = () => {
  // Inicialización de variables
  const initialValues = {
    nombre_anuncio: '',
    imagen: '',
    descripcion: '',
    link: '',
    idProveedor_id: '',
    fechaInicio: '',
    fechaFin: '',
  };

  // Estado para almacenar la lista de publicidad
  const [publicidad, setPublicidad] = useState([]);
  const [publicidadEdit, setPublicidadEdit] = useState(null);
  const [proveedores, setProveedores] = useState([]);
  const authToken = Cookies.get('authToken');
  const navigate = useNavigate();

  // Validaciones
  const validationSchema = Yup.object().shape({
    nombre_anuncio: Yup.string().required('Nombre del anuncio es requerido'),
    imagen: Yup.string().required('Imagen es requerida'),
    descripcion: Yup.string().required('Descripción es requerida'),
    link: Yup.string().required('Link es requerido'),
    idProveedor_id: Yup.number()
      .test('is-valid-proveedor', 'Selecciona un proveedor válido', (value) => {
        return proveedores.some((proveedor) => proveedor.id === value);
      })
      .required('Proveedor es requerido'),
    fechaFin: Yup.string().required('Fecha final es requerida'),
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
          nombre_usuario: nombreUsuario,
          id_User: idUser,
        };
        // Extraemos los datos
        const PublicidadResponse = await getPublicidad(dataFields);
        const ProveedoresResponse = await getProveedores(dataFields);

        //
        if (PublicidadResponse.success) {
          if (ProveedoresResponse.success) {
            const { data } = PublicidadResponse;
            const dataProveedores = ProveedoresResponse.data;
            //
            const ProveedorMap = {};
            dataProveedores.forEach((item2) => {
              ProveedorMap[item2.id] = item2.nombre_proveedor;
            });

            data.forEach((item) => {
              const proveedorId = item.idProveedor_id;
              if (proveedorId in ProveedorMap) {
                item.nombreProveedor = ProveedorMap[proveedorId];
              }
            });
            // Seteamos los valores
            setPublicidad(data);
            setProveedores(dataProveedores);
          }
          else {
            alert(ProveedoresResponse.message);
          }
        } else {
          alert(PublicidadResponse.message);
        }
      } catch (error) {
        console.error(error);
        alert('Error al cargar los datos.');
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
    if (window.confirm('¿Seguro que desea eliminar esta Publicidad?')) {
      try {
        const nombreUsuario = Cookies.get('username');
        const idUser = Cookies.get('userId');
        const dataFields = {
          id,
          token: authToken,
          nombre_usuario: nombreUsuario,
          id_User: idUser,
        };

        const response = await deletePublicidad(dataFields);

        if (response && response.success) {
          alert('Publicidad eliminada con éxito');
          // Elimina el perfil de la tabla
          setPublicidad((prevPublicidad) => prevPublicidad.filter((term) => term.id !== id));
        } else {
          alert(response.message);
          console.error(response.message);
        }
      } catch (error) {
        alert('Error al eliminar Publicidad');
        console.error(error);
      }
    }
  };

  const handleEditarClick = (index, setFieldValue) => {
    const elementoEncontrado = publicidad.find((publi) => publi.id === index);
    if (elementoEncontrado) {
      // Convierte la fecha al formato adecuado (AAAA-MM-DD)
      const fechaFormateada = new Date(elementoEncontrado.fechaInicio)
        .toISOString()
        .split('T')[0];
      //
      setFieldValue('nombre_anuncio', elementoEncontrado.nombre_anuncio);
      setFieldValue('imagen', elementoEncontrado.imagen);
      setFieldValue('descripcion', elementoEncontrado.descripcion);
      setFieldValue('link', elementoEncontrado.link);
      setFieldValue('idProveedor_id', elementoEncontrado.idProveedor_id);
      setFieldValue('fechaInicio', fechaFormateada);
      setFieldValue('fechaFin', elementoEncontrado.fechaFin);
    }
    setPublicidadEdit(index);
  };

  const maxWords = 5;
  const [expanded, setExpanded] = useState([]);

  const toggleExpand = (index) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  const tableRef = useRef();
  return (
    <div>
      <Col md="12">
        <ComponentCard title="Publicidad">
          {/* Agrega el componente Formik y envuelve el formulario */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (fields, actions) => {
              try {
                const dataFields = {
                  nombre_anuncio: fields.nombre_anuncio,
                  imagen: fields.imagen,
                  descripcion: fields.descripcion,
                  link: fields.link,
                  idProveedor_id: fields.idProveedor_id,
                  fechaFin: fields.fechaFin,
                  token: Cookies.get('authToken'),
                  nombre_usuario: Cookies.get('username'),
                  id_User: Cookies.get('userId')
                }
                // Crear
                if (publicidadEdit === null) {
                  const response = await createPublicidad(dataFields);
                  if (response && response.success) {
                    alert('Publicidad creada exitosamente');
                    actions.resetForm();
                    // Recarga la página
                    window.location.reload();
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
                  const elementoEncontrado = publicidad.find(elemento => elemento.id === publicidadEdit);
                  const dataFields2 = {
                    id: elementoEncontrado.id,
                    nombre_anuncio: fields.nombre_anuncio,
                    imagen: fields.imagen,
                    descripcion: fields.descripcion,
                    link: fields.link,
                    idProveedor_id: fields.idProveedor_id,
                    fechaFin: fields.fechaFin,
                    token: Cookies.get('authToken'),
                    nombre_usuario: Cookies.get('username'),
                    id_User: Cookies.get('userId')
                  };
                  const response = await updatePublicidad(dataFields2);
                  if (response && response.success) {
                    alert('Actualización de Publicidad con éxito');
                    actions.resetForm();
                    // Recarga la página
                    window.location.reload();
                    setPublicidadEdit(null);
                  } else {
                    alert(response.message); // Mensaje de error
                    console.error(response.message);
                  }
                }
              } catch (error) {
                alert('Error al crear la Publicidad');
                console.error(error);
              }
              actions.resetForm();
            }}
          >
            {({ errors, touched, handleSubmit, setFieldValue, resetForm }) => (
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="nombre_anuncio">Nombre anuncio:</Label>
                  <InputGroup>
                    <InputGroupText>
                      <i className="bi-collection-play-fill"></i>
                    </InputGroupText>
                    <Field
                      name="nombre_anuncio"
                      type="text"
                      placeholder="Ingrese nombre del anuncio"
                      className={`form-control ${errors.nombre_anuncio && touched.nombre_anuncio ? ' is-invalid' : ''
                        }`}
                    />
                    <ErrorMessage name="nombre_anuncio" component="div" className="invalid-feedback" />
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="imagen">Imagen:</Label>
                  <InputGroup>
                    <InputGroupText>
                      <i className="bi-image"></i>
                    </InputGroupText>
                    <Field
                      name="imagen"
                      type="text"
                      placeholder="Ingrese imagen"
                      className={`form-control ${errors.imagen && touched.imagen ? ' is-invalid' : ''
                        }`}
                    />
                    <ErrorMessage name="imagen" component="div" className="invalid-feedback" />
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="descripcion">Descripción:</Label>
                  <InputGroup>
                    <InputGroupText>
                      <i className="bi-card-list"></i>
                    </InputGroupText>
                    <Field
                      name="descripcion"
                      type="text"
                      placeholder="Ingrese descripción"
                      className={`form-control ${errors.descripcion && touched.descripcion ? ' is-invalid' : ''
                        }`}
                    />
                    <ErrorMessage name="descripcion" component="div" className="invalid-feedback" />
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="link">Link:</Label>
                  <InputGroup>
                    <InputGroupText>
                      <i className="bi-file-earmark-font-fill"></i>
                    </InputGroupText>
                    <Field
                      name="link"
                      type="text"
                      placeholder="Ingrese link"
                      className={`form-control ${errors.link && touched.link ? ' is-invalid' : ''}`}
                    />
                    <ErrorMessage name="link" component="div" className="invalid-feedback" />
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="idProveedor_id">Proveedor</Label>
                  <InputGroup>
                    <InputGroupText>
                      <i className="bi-globe2"></i>
                    </InputGroupText>
                    <Field
                      as="select" // Usa el componente "Field" para manejar el campo "select"
                      name="idProveedor_id" // Asegúrate de que el nombre_anuncio coincida con el del objeto Yup
                      className={`form-control ${errors.idProveedor_id && touched.idProveedor_id ? ' is-invalid' : ''
                        }`}
                    >
                      <option value="">Selecciona un Proveedor</option>
                      {proveedores.map((proveedor) => (
                        <option key={proveedor.id} value={proveedor.id}>
                          {proveedor.nombre_proveedor}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="idProveedor_id"
                      component="div"
                      className="invalid-feedback"
                    />
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <Label>Fecha fin:</Label>
                  <InputGroup>
                    <InputGroupText>
                      <i className="bi-calendar-fill"></i>
                    </InputGroupText>
                    <Col sm="11">
                      <Field
                        name="fechaFin"
                        type="date"
                        className={`form-control ${errors.fechaFin && touched.fechaFin ? ' is-invalid' : ''
                          }`}
                      />
                      <ErrorMessage name="fechaFin" component="div" className="invalid-feedback" />
                    </Col>
                  </InputGroup>
                </FormGroup>
                <div className="border-top pt-3 mt-3 d-flex align-items-center gap-2">
                  <Button type="submit" className="btn btn-info mr-2">
                    {publicidadEdit !== null ? 'Guardar Cambios' : 'Ingresar'}
                  </Button>
                  <Button type="reset" className="btn btn-dark" onClick={() => { setPublicidadEdit(null); resetForm(); }}>
                    Cancelar
                  </Button>
                </div>

                <Col md="12">
                  <ComponentCard title="Tabla de Publicidad">
                    <FormGroup>
                      <div className="table-responsive" style={{ maxHeight: '400px' }}>
                        <Table>
                          <thead>
                            <tr>
                              <th style={{ maxWidth: '120px' }}>Nombre anuncio</th>
                              <th style={{ maxWidth: '250px' }}>Descripción</th>
                              <th style={{ maxWidth: '100px' }}>Proveedor</th>
                              <th style={{ maxWidth: '80px' }}>Fecha inicio</th>
                              <th style={{ maxWidth: '80px' }}>Fecha final</th>
                              <th style={{ maxWidth: '100px' }}>Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {publicidad.map((publi, index) => (
                              <tr key={publi.id}>
                                <td style={{ maxWidth: '120px' }}>{publi.nombre_anuncio}</td>
                                <td style={{
                                  maxWidth: '250px',
                                  textAlign: 'justify', // Añade esta línea
                                  textJustify: 'inter-word' // Esto ayuda a justificar palabras individualmente
                                }}>
                                  {expanded[index]
                                    ? publi.descripcion
                                    : publi.descripcion
                                      .split(' ')
                                      .slice(0, maxWords)
                                      .join(' ')}
                                  {publi.descripcion.split(' ').length > maxWords && (
                                    <span
                                      style={{ cursor: 'pointer', color: 'purple' }}
                                      onClick={() => toggleExpand(index)}
                                    >
                                      {expanded[index] ? <><br />Mostrar menos</> : ' ...más'}
                                    </span>
                                  )}
                                </td>
                                <td style={{ maxWidth: '100px' }}>{publi.nombreProveedor}</td>
                                <td style={{ maxWidth: '80px' }}>{formatearFecha(publi.fechaInicio)}</td>
                                <td style={{ maxWidth: '80px' }}>{formatearFecha(publi.fechaFin)}</td>
                                <td style={{ maxWidth: '100px' }}>
                                  <Button
                                    className="btn btn-info btn-sm mr-2"
                                    onClick={() => handleEditarClick(publi.id, setFieldValue)}
                                  >
                                    Editar
                                  </Button>{" "}
                                  <Button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleEliminarClick(publi.id)}
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

export default Publicidad
