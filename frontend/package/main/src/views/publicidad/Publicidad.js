import React from 'react';
import { Col, FormGroup, Label, Button, InputGroupText, InputGroup, Table } from 'reactstrap';
import { Field, ErrorMessage, Formik, Form } from 'formik'; // Importa Formik y Form
import * as Yup from 'yup';
import ComponentCard from '../../components/ComponentCard';


const Publicidad = () => {

    // Inicialización de variables
  const initialValues = {
    nombre: '',
    imagen: '',
    descripcion: '',
    link: '',
    proveedor: '',
    inicio: '',
    final: '',

  };
  // Validaciones
  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('Nombre es requerido'),
    imagen: Yup.string().required('Imagen es requerida'),
    descripcion: Yup.string().required('Descripçión es requerida'),
    link: Yup.string().required('Link es requerido'),
    proveedor: Yup.string()
      .oneOf(['Spirit', 'Unitronic'], 'Selecciona un proveedor válido')
      .required('Proveedor es requerido'),
    inicio: Yup.date()
    .min(new Date(), 'La inicio no puede ser anterior a la inicio actual')
    .required('inicio de inicio es requerida'),
    final: Yup.string().required('inicio final es requerida'),



 
  });
  return (
    <div>
    <Col md="12">
      <ComponentCard title="Publicidad">
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
                    <i className="bi-collection-play-fill"></i>
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
                <Label htmlFor="imagen">imagen:</Label>
                <InputGroup>
                  <InputGroupText>
                    <i className="bi-image"></i>
                  </InputGroupText>
                  <Field
                    name="imagen"
                    type="text"
                    placeholder="Ingrese imagen"
                    className={`form-control ${
                      errors.imagen && touched.imagen ? ' is-invalid' : ''
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
                    className={`form-control ${
                      errors.descripcion && touched.descripcion ? ' is-invalid' : ''
                    }`}
                  />
                  <ErrorMessage name="descripcion" component="div" className="invalid-feedback" />
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="link">link:</Label>
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
                  <Label htmlFor="proveedor">Proveedor</Label>
                  <InputGroup>
                    <InputGroupText>
                      <i className="bi-globe2"></i>
                    </InputGroupText>
                    <Field
                      as="select" // Usa el componente "Field" para manejar el campo "select"
                      name="proveedor" // Asegúrate de que el nombre coincida con el del objeto Yup
                      className={`form-control ${
                        errors.proveedor && touched.proveedor ? ' is-invalid' : ''
                      }`}
                    >
                      <option value="">Selecciona un proveedor</option>
                      <option value="Spirit">Spirit</option>
                      <option value="Unitronic">Unitronic</option>
                    </Field>
                    <ErrorMessage
                      name="proveedor"
                      component="div"
                      className="invalid-feedback"
                    />
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <Label>final de inicio:</Label>
                  <InputGroup>
                    <InputGroupText>
                      <i className="bi-calendar-event"></i>
                    </InputGroupText>
                    <Col sm="11">
                      <Field
                        name="inicio"
                        type="date"
                        className={`form-control ${
                          errors.inicio && touched.inicio ? ' is-invalid' : ''
                        }`}
                      />
                      <ErrorMessage name="inicio" component="div" className="invalid-feedback" />
                    </Col>
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
                        name="final"
                        type="date"
                        className={`form-control ${
                          errors.final && touched.final ? ' is-invalid' : ''
                        }`}
                      />
                      <ErrorMessage name="final" component="div" className="invalid-feedback" />
                    </Col>
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
      <ComponentCard title="Tabla de Publicidad">
        <FormGroup>
          <div className="table-responsive" style={{ maxHeight: '400px' }}>
            <Table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Imagen</th>
                  <th>Descripción</th>
                  <th>Link</th>
                  <th>Proveedor</th>
                  <th>Fecha inicio</th>
                  <th>Fecha fin</th>
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
  )
}

export default Publicidad
