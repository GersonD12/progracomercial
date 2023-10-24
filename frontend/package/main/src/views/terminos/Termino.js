import React from 'react';
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
import ComponentCard from '../../components/ComponentCard';

const Termino = () => {
  // Inicialización de variables
  const initialValues = {
    fecha: '',
    texto: '',
  };

  const validationSchema = Yup.object().shape({
    fecha: Yup.date()
      .min(new Date(), 'La fecha no puede ser anterior a la fecha actual')
      .required('Fecha es requerida'),
    texto: Yup.string().required('Texto es requerido'),
  });

  return (
    <div>
      <Col md="12">
        <ComponentCard title="Códigos">
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
                  <Label>Fecha:</Label>
                  <InputGroup>
                    <InputGroupText>
                      <i className="bi-calendar-event"></i>
                    </InputGroupText>
                    <Col sm="11">
                      <Field
                        name="fecha"
                        type="date"
                        className={`form-control ${
                          errors.fecha && touched.fecha ? ' is-invalid' : ''
                        }`}
                      />
                      <ErrorMessage name="fecha" component="div" className="invalid-feedback" />
                    </Col>
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="texto">Texto:</Label>
                  <InputGroup>
                    <InputGroupText>
                      <i className="bi-card-heading"></i>
                    </InputGroupText>
                    <textarea
                      name="texto"
                      placeholder="Ingrese texto"
                      className={`form-control ${
                        errors.texto && touched.texto ? 'is-invalid' : ''
                      }`}
                    />
                   
                    <ErrorMessage name="texto" component="div" className="invalid-feedback" />
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
        <ComponentCard title="Tabla de Códigos">
          <FormGroup>
            <div className="table-responsive" style={{ maxHeight: '400px' }}>
              <Table>
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Texto</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>{/* Tus datos de tabla aquí */}</tbody>
              </Table>
            </div>
          </FormGroup>
        </ComponentCard>
      </Col>
    </div>
  );
};

export default Termino;
