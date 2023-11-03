import { Row, Col } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

import ProgressCards from '../../components/dashboard/modernDashboard/ProgressCards';
import Top3CarrerasProductos from '../../components/dashboard/modernDashboard/Top3ProductosCarrera';
import GeneralCarrerasProductos from '../../components/dashboard/modernDashboard/ProductosCarrera';
import GeneralCarrerasEstudiantes from '../../components/dashboard/modernDashboard/EstudiantesCarrera';

const Classic = () => {
  return (
    <>
    <h1>Estadísticas Generales</h1><br/>
    <BreadCrumbs />
      <ProgressCards />
      <Row>
        <Col lg="4">
          <GeneralCarrerasProductos />          
        </Col>
        <Col lg="4">
          <Top3CarrerasProductos />
        </Col>
        <Col lg="4">
          <GeneralCarrerasEstudiantes />
        </Col>
      </Row>     
    </>
  );
};

export default Classic;
