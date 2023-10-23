import React from 'react';
import { Col, FormGroup,  Table } from 'reactstrap';
//import { Field, ErrorMessage, Formik, Form } from 'formik'; // Importa Formik y Form
//import * as Yup from 'yup';
import ComponentCard from '../../components/ComponentCard';

const Productos = () => {
  return (
    <div>
      <Col md="12">
  <ComponentCard title="Productos">
    <FormGroup>
      <div className="table-responsive" style={{ maxHeight: '400px' }}>
        <Table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Imagen</th>
              <th>Precio</th>
              <th>usuario</th>
              <th>carrera</th>
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

export default Productos
