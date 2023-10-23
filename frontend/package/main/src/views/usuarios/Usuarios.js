import React from 'react';
import { Col, FormGroup,  Table } from 'reactstrap';
//import { Field, ErrorMessage, Formik, Form } from 'formik'; // Importa Formik y Form
//import * as Yup from 'yup';
import ComponentCard from '../../components/ComponentCard';

const Usuarios = () => {
  return (
    <div>
          <Col md="12">
  <ComponentCard title="Productos">
    <FormGroup>
      <div className="table-responsive" style={{ maxHeight: '400px' }}>
        <Table>
          <thead>
            <tr>
              <th>Nickname</th>
              <th>Correo</th>
              <th>Carrera</th>
              <th>Imagen</th>
              <th>Genero</th>
            </tr>
          </thead>
          <tbody>
            {/* Tus datos de tabla aquí */}
          </tbody>
        </Table>
      </div>
    </FormGroup>
  </ComponentCard>
</Col>
    </div>
  )
}

export default Usuarios
