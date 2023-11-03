import React from 'react';
import PropTypes from 'prop-types';

import { Col, Card, CardBody, CardTitle } from 'reactstrap';

const ProgressCardsData = ({ title, icon, pColor, income }) => {
  return (
    <>
      <Col lg={3} md={6}>
        <Card>
          <CardBody>
            <CardTitle tag="h4" style={{ textAlign: 'left' }}>{title}</CardTitle>
            <div className="text-end">
              <h2 className="fw-light mb-0" style={{ textAlign: 'left' }}>
                <i className={`bi bi-${icon} text-${pColor}`}></i> ${income}
              </h2>
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
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

export default ProgressCardsData;
