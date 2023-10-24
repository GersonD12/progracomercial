import React from 'react';
import { Col, FormGroup, Label, Button, InputGroupText, InputGroup, Table } from 'reactstrap';
import { Field, ErrorMessage, Formik, Form } from 'formik'; // Importa Formik y Form
import * as Yup from 'yup';
import ComponentCard from '../../components/ComponentCard';

const Proveedor = () => {
      // Inicialización de variables
  const initialValues = {
    nombre: '',
    telefono: '',
    email: '',
  };

  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('Nombre es requerido'),
    telefono: Yup.string()
      .matches(/^[0-9]{8}$/, 'El teléfono debe contener 8 dígitos')
      .required('Teléfono es requerido'),
    email: Yup.string().email('Correo es inválido').required('Correo es requerido'),
  });

  return (
    <div>
    <Col md="12">
      <ComponentCard title="Proveedores">
        {/* Agrega el componente Formik y envuelve el formulario */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            // Aquí puedes manejar la lógica de envío del formulario
            console.log(values);
            actions.resetForm();
          }}
        >
          {({ errors, touched, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="nombre">Nombre:</Label>
                <InputGroup>
                  <InputGroupText>
                    <i className="bi-person-fill"></i>
                  </InputGroupText>
                  <Field
                    name="nombre"
                    type="text"
                    placeholder="Ingrese nombre"
                    className={`form-control ${
                      errors.nombre && touched.nombre ? ' is-invalid' : ''
                    }`}
                  />
                  <ErrorMessage name="nombre" component="div" className="invalid-feedback" />
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
                    className={`form-control ${
                      errors.telefono && touched.telefono ? ' is-invalid' : ''
                    }`}
                  />
                  <ErrorMessage name="telefono" component="div" className="invalid-feedback" />
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Correo:</Label>
                <InputGroup>
                  <InputGroupText>
                    <i className="bi bi-envelope"></i>
                  </InputGroupText>
                  <Field
                    name="email"
                    type="text"
                    placeholder="Ingrese correo"
                    className={`form-control ${
                      errors.email && touched.email ? ' is-invalid' : ''
                    }`}
                  />
                  <ErrorMessage name="email" component="div" className="invalid-feedback" />
                </InputGroup>
              </FormGroup>


              <div className="border-top pt-3 mt-3 d-flex align-items-center gap-2">
                <Button type="submit" className="btn btn-info mr-2">
                  Ingresar
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
      <ComponentCard title="Tabla de Proveedores">
        <FormGroup>
          <div className="table-responsive" style={{ maxHeight: '400px' }}>
            <Table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Teléfono</th>
                  <th>Correo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
        
              </tbody>
            </Table>
          </div>
        </FormGroup>
      </ComponentCard>
    </Col>
  </div>
  )
}

export default Proveedor
