import React from 'react';
import { Col, FormGroup, Label, Button, InputGroupText, InputGroup, Table } from 'reactstrap';
import { Field, ErrorMessage, Formik, Form } from 'formik'; // Importa Formik y Form
import * as Yup from 'yup';
import ComponentCard from '../../components/ComponentCard';

const Perfil = () => {
      // Inicialización de variables
  const initialValues = {
    usuario: '',
    contra: '',
    confirmContra: '',

  };

  const validationSchema = Yup.object().shape({
    usuario: Yup.string().required('Usuario es requerido'),
    contra: Yup.string()
      .min(6, 'Contraseña mínima de 6 caracteres')
      .required('Contraseña es requerida'),
    confirmContra: Yup.string()
      .oneOf([Yup.ref('contra'), null], 'Las contraseñas no coinciden')
      .required('Confirmar contraseña es requerida'),
  });

  return (
    <div>
      <Col md="12">
        <ComponentCard title="Perfiles">
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
                  <Label htmlFor="usuario">Nombre de usuario:</Label>
                  <InputGroup>
                    <InputGroupText>
                      <i className="bi-person-circle"></i>
                    </InputGroupText>
                    <Field
                      name="usuario"
                      type="text"
                      placeholder="Ingrese nombre de usuario"
                      className={`form-control ${
                        errors.usuario && touched.usuario ? ' is-invalid' : ''
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
                      className={`form-control ${
                        errors.contra && touched.contra ? ' is-invalid' : ''
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
                      className={`form-control ${
                        errors.confirmContra && touched.confirmContra ? ' is-invalid' : ''
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
        <ComponentCard title="Tabla de Perfiles">
          <FormGroup>
            <div className="table-responsive" style={{ maxHeight: '400px' }}>
              <Table>
                <thead>
                  <tr>
                    <th>Nombre Usuario</th>
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

export default Perfil
