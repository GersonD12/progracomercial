import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import { TotalEstudiantes, TotalPublicaciones, TotalCarreras, TotalPublicidad} from '../../../functions/conexionesGraficas';

const ProgressCardsData = ({ title, icon, pColor, income }) => {
  return (
    <Col lg={3} md={6}>
      <Card>
        <CardBody>
          <CardTitle tag="h4" style={{ textAlign: 'left' }}>{title}</CardTitle>
          <div className="text-end">
            <h2 className="fw-light mb-0" style={{ textAlign: 'left' }}>
              <i className={`bi bi-${icon} text-${pColor}`}></i> {income}
            </h2>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

ProgressCardsData.defaultProps = {
  pColor: 'default',
};

ProgressCardsData.propTypes = {
  pColor: PropTypes.oneOf(['primary', 'info', 'success', 'danger', 'default']),
  title: PropTypes.string,
  income: PropTypes.string,
  icon: PropTypes.string,
};

const ProgressCards = () => {
  const [usuariosData, setUsuariosData] = useState([]);
  const [publicacionesData, setPublicidadData] = useState([]);
  const [carrerasData, setCarrerasData] = useState([]);
  const [proveedoresData, setProveedoresData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Llamar a la función que obtiene los datos de las 3 carreras con la mayor cantidad de productos
      const authToken = Cookies.get('authToken');
      const nombreUsuario = Cookies.get('username');
      const idUser = parseInt(Cookies.get('userId'), 10);
      const dataFields = {
        token: authToken,
        nombre_usuario: nombreUsuario,
        id_User: idUser,
      };
      const responseCarreras = await TotalEstudiantes(dataFields);
      const responsePublicaciones = await TotalPublicaciones(dataFields);
      const responseCarrera = await TotalCarreras(dataFields);
      const responsePublicidad = await TotalPublicidad(dataFields);
      setUsuariosData(responseCarreras.data);
      setPublicidadData(responsePublicaciones.data);
      setCarrerasData(responseCarrera.data);
      setProveedoresData(responsePublicidad.data);
    };
    fetchData();
  }, []);

  return (
    <Row>
      <ProgressCardsData
        title="Total de usuarios"
        income={usuariosData.total_usuarios}
        icon="person-fill"
        pColor="info"
      />
      <ProgressCardsData
        title="Total de publicaciones"
        income={publicacionesData.total_publicaciones}
        icon="person-badge"
        pColor="info"
      />
      <ProgressCardsData
        title="Total de carreras"
        income={carrerasData.total_carreras}
        icon="award-fill"
        pColor="info"
      />
      <ProgressCardsData
        title="Total de asociados"
        income={proveedoresData.total_proveedores}
        icon="megaphone-fill"
        pColor="info"
      />
    </Row>
  );
};

export default ProgressCards;
