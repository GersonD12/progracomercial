import React from 'react';
import Cookies from 'js-cookie';
import { Button, Label, FormGroup, Container, Row, Col, Card, CardBody, Input } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import miImagen from '../../assets/images/logos/Meshop3.png';
import { ReactComponent as LeftBg } from '../../assets/images/bg/login-bgleft.svg';
import { ReactComponent as RightBg } from '../../assets/images/bg/login-bg-right.svg';
//
import { Login } from '../../functions/conexionesLogin';

const LoginFormik = () => {
  const navigate = useNavigate();

  const initialValues = {
    nombre_usuario: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    nombre_usuario: Yup.string('Nombre de usuario es invalido').required('Nombre de usuario es requerido'),
    password: Yup.string()
      .min(6, 'Password debe tener al menos 6 caracteres')
      .required('Password es requerido'),
  });

  return (
    <div className="loginBox">
      <LeftBg className="position-absolute left bottom-0" />
      <RightBg className="position-absolute end-0 top" />
      <Container fluid className="h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="12" className="loginContainer">
            <Card>
              <CardBody className="p-4 m-1">
                <div className="text-center mb-4">
                  <img src={miImagen} alt="" width="100" height="100" />
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={async (fields, actions) => {
                    try {
                      const response = await Login(fields);                                        
                      if (response && response.success) {
                        // Almacenar el token, nombre de usuario y ID en Cookies
                        Cookies.set('authToken', response.data.token, { expires: 2/24 })
                        Cookies.set('username', fields.nombre_usuario); // Almacena el nombre de usuario
                        Cookies.set('userId', response.data.id); // Almacena el ID del usuario
                        console.log(response)
                        //alert('Inicio de sesión exitoso'); // Mensaje de éxito
                        navigate('/dashboards/modern');
                      } else {
                        alert(response.message); // Mensaje de error
                        console.error(response.message);
                        actions.resetForm();   
                      }
                    } catch (error) {
                      console.error(error);
                      alert('Error al iniciar sesión');                 
                    }
                  }}
                  render={({ errors, touched }) => (
                    <Form>
                      <FormGroup>
                        <Label htmlFor="nombre_usuario">Usuario:</Label>
                        <Field
                          name="nombre_usuario"
                          type="text"
                          className={`form-control${
                            errors.nombre_usuario && touched.nombre_usuario ? ' is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage name="nombre_usuario" component="div" className="invalid-feedback" />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="password">Contraseña:</Label>
                        <Field
                          name="password"
                          type="password"
                          className={`form-control${
                            errors.password && touched.password ? ' is-invalid' : ''
                          }`}
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                      <FormGroup className="form-check d-flex" inline>
                        <Label check>
                          <Input type="checkbox" />
                          Remember me
                        </Label>
                        <Link className="ms-auto text-decoration-none" to="/auth/forgotPwd">
                          <small>Forgot Pwd?</small>
                        </Link>
                      </FormGroup>
                      <FormGroup>
                        <Button type="submit" color="info" className="me-2">
                          Login
                        </Button>
                      </FormGroup>
                    </Form>
                  )}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginFormik;
