import React, { useState } from 'react';
import { Col, Form, FormGroup, Label, Button, InputGroupText, InputGroup, Table } from 'reactstrap';
import { Field, ErrorMessage, Formik } from 'formik'; // Importa Formik y Form
import * as Yup from 'yup';
import ComponentCard from '../../components/ComponentCard';

const Carrera = () => {
// Inicialización de variables
const initialValues = {
    carrera1: '',
  };
  // Validaciones
  const validationSchema = Yup.object().shape({
    carrera1: Yup.string().required('carrera es requerido'),
  });

  // Estado para almacenar la lista de carreras
  const [carreras, setcarreras] = useState([]);
  // Estado para el valor del campo de entrada
  const [nombrecarrera, setNombrecarrera] = useState('');
  // Estado para el carrera seleccionado para editar
  const [carreraEdit, setcarreraEdit] = useState(null);
  // Función para manejar el envío del formulario
  const handleIngresarClick = (values, actions) => {
    // Verificar si el campo de entrada no está vacío antes de agregarlo a la lista
    if (nombrecarrera.trim() !== '') {
      if (carreraEdit !== null) {
        // Si hay un carrera en edición, actualiza ese carrera
        const nuevoscarreras = [...carreras];
        nuevoscarreras[carreraEdit] = nombrecarrera;
        setcarreras(nuevoscarreras);
        setcarreraEdit(null); // Limpia el estado de edición
      } else {
        // Agregar el nombre del carrera a la lista
        setcarreras([...carreras, nombrecarrera]);
      }
      // Restablecer el campo de entrada
      setNombrecarrera('');
    }
    actions.resetForm(); // Restablece el formulario
  };
  // Función para eliminar un carrera
  const handleEliminarClick = (index) => {
    const nuevoscarreras = [...carreras];
    nuevoscarreras.splice(index, 1);
    setcarreras(nuevoscarreras);
  };
  // Función para editar un carrera
  const handleEditarClick = (index) => {
    setcarreraEdit(index);
    setNombrecarrera(carreras[index]);
  };

  return (
    <div>
    {/* Formulario */}
    <Col md="12">
      <ComponentCard title="Carreras">
        {/* Agrega el componente Formik y envuelve el formulario */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleIngresarClick}
        >
          {({ handleSubmit, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="carrera1">Carrera:</Label>
                <InputGroup>
                  <InputGroupText>
                    <i className="bi-card-heading"></i>
                  </InputGroupText>
                  <Field
                    name="carrera1"
                    type="text"
                    placeholder="Ingrese carrera"
                    className={`form-control ${
                      errors.carrera1 && touched.carrera1 ? 'is-invalid' : ''
                    }`}
                  />
                  {/* Agrega el componente ErrorMessage para mostrar mensajes de error */}
                  <ErrorMessage
                    name="carrera1"
                    component="div"
                    className="invalid-feedback"
                  />
                </InputGroup>
              </FormGroup>
              <div className="border-top pt-3 mt-3 d-flex align-items-center gap-2">
                <Button type="submit" className="btn btn-info mr-2">
                  {carreraEdit !== null ? 'Guardar Cambios' : 'Ingresar'}
                </Button>
                <Button type="reset" className="btn btn-dark">
                  Cancelar
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </ComponentCard>
    </Col>

    <Col md="12">
      <ComponentCard title="Tabla de carreras">
        <FormGroup>
          <div className="table-responsive" style={{ maxHeight: '400px' }}>
            <Table>
              <thead>
                <tr>
                  <th>Carrera</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tbody>
                  {carreras.map((carrera, index) => (
                    <tr key={carrera}>
                      <td>{carrera}</td>
                      <td>
                        <Button
                          className="btn btn-info btn-sm mr-2"
                          onClick={() => handleEditarClick(index)}
                        >
                          Editar
                        </Button>{' '}
                        <Button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleEliminarClick(index)}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </tbody>
            </Table>
          </div>
        </FormGroup>
      </ComponentCard>
    </Col>
  </div>
  )
}

export default Carrera
