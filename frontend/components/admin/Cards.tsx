import React from 'react';
import { Container, Row, Col, Card, ProgressBar, Button } from 'react-bootstrap';

export default function Cards() {
  return (
    <Container fluid>
      {/* Content Row - Dashboard Cards */}
      <Row>
        {/* Monthly Earnings */}
        <Col xl={3} md={6} className="mb-4">
          <Card className="border-start border-primary shadow h-100 py-2">
            <Card.Body>
              <Row className="align-items-center g-0">
                <Col className="me-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Earnings (Monthly)
                  </div>
                  <div className="h5 mb-0 fw-bold text-gray-800">$40,000</div>
                </Col>
                <Col xs="auto">
                  <i className="fas fa-calendar fa-2x text-gray-300"></i>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* Annual Earnings */}
        <Col xl={3} md={6} className="mb-4">
          <Card className="border-start border-success shadow h-100 py-2">
            <Card.Body>
              <Row className="align-items-center g-0">
                <Col className="me-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Earnings (Annual)
                  </div>
                  <div className="h5 mb-0 fw-bold text-gray-800">$215,000</div>
                </Col>
                <Col xs="auto">
                  <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* Tasks */}
        <Col xl={3} md={6} className="mb-4">
          <Card className="border-start border-info shadow h-100 py-2">
            <Card.Body>
              <Row className="align-items-center g-0">
                <Col className="me-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Tasks</div>
                  <Row className="align-items-center g-0">
                    <Col xs="auto">
                      <div className="h5 mb-0 me-3 fw-bold text-gray-800">50%</div>
                    </Col>
                    <Col>
                      <ProgressBar now={50} variant="info" style={{ height: '10px' }} />
                    </Col>
                  </Row>
                </Col>
                <Col xs="auto">
                  <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* Pending Requests */}
        <Col xl={3} md={6} className="mb-4">
          <Card className="border-start border-warning shadow h-100 py-2">
            <Card.Body>
              <Row className="align-items-center g-0">
                <Col className="me-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Pending Requests
                  </div>
                  <div className="h5 mb-0 fw-bold text-gray-800">18</div>
                </Col>
                <Col xs="auto">
                  <i className="fas fa-comments fa-2x text-gray-300"></i>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
