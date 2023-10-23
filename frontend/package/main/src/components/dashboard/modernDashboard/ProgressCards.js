import React from 'react';
import { Row } from 'reactstrap';

import ProgressCardsData from './ProgressCardsData';

const ProgressCards = () => {
  return (
    /*--------------------------------------------------------------------------------*/
    /* Reviews                                                 */
    /*--------------------------------------------------------------------------------*/
    <Row>
      <ProgressCardsData
        title= "Ventas diarias"
        income="120"
        icon= "arrow-down-short"
        pColor="success"
        subtext="Ingresos de hoy"
        pPercent="80"
      />
      <ProgressCardsData
        title= "Ventas semanales"
        income="5,000"
        icon= "arrow-up-short"
        pColor="primary"
        subtext="Ingresos de hoy"
        pPercent="30"
      />
      <ProgressCardsData
        title= "Ventas mensuales"
        income="8,000"
        icon= "arrow-up-short"
        pColor="info"
        subtext="Ingresos de hoy"
        pPercent="60"
      />
      <ProgressCardsData
        title= "Ventas anuales"
        income="12,000"
        icon= "arrow-down-short"
        pColor="danger"
        subtext="Ventas de hoy"
        pPercent="80"
      />
    </Row>
  );
};

export default ProgressCards;
