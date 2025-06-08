import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="bg-white sticky-footer py-3">
      <Container>
        <Row>
          <Col className="text-center">
            <span>Copyright &copy; Your Website 2021</span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
