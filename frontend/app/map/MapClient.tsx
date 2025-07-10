"use client";
import React from 'react';
import { Container, Row, Col, Navbar, Nav, Form, FormControl, Button, Card } from 'react-bootstrap';
import { Search, Heart, Map, List, ThreeDots, CompassFill } from 'react-bootstrap-icons'; // İkonlar için

const RealEstateList = () => {
  return (
    <Container fluid className="p-0">

      {/* Ana Navigasyon ve Arama */}
      <Container className="my-3">
        

        <h4 className="mt-4 mb-3">Emlak İlanları</h4>

        <Row className="align-items-center mb-3">
          <Col xs={12} md={6} lg={8}>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="İlan ara..."
                className="me-2 rounded-pill"
                aria-label="Search"
              />
              <Button variant="outline-secondary" className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }}>
                <Search size={18} />
              </Button>
            </Form>
          </Col>
          <Col xs={12} md={6} lg={4} className="d-flex justify-content-md-end mt-2 mt-md-0">
            <Button variant="outline-secondary" className="me-2 active">Tümü</Button>
            <Button variant="outline-secondary" className="me-2">Ev</Button>
            <Button variant="outline-secondary" className="me-2">Arsa</Button>
            <Button variant="outline-secondary">Araba</Button>
          </Col>
        </Row>
      </Container>

      {/* Harita Görünümü Bölümü */}
      <Container className="my-4">
        <Card className="text-center p-5 border-0 shadow-sm" style={{ height: '500px', backgroundColor: '#f8f9fa' }}>
          <Card.Body className="d-flex flex-column align-items-center justify-content-center">
            <CompassFill size={48} className="text-muted mb-3" />
            <Card.Title className="text-muted">İnteraktif Harita</Card.Title>
            <Card.Text className="text-muted">
              Harita henüz görüntülenmedi.
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>

      {/* Alt Kartlar */}
      <Container className="my-4">
        <Row className="justify-content-center">
          <Col xs={12} md={4} lg={3} className="mb-3">
            <Card className="text-center p-3">
              <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center mb-2 mx-auto" style={{ width: '30px', height: '30px' }}>
                1
              </div>
              <Card.Text className="mb-1">Modern Villa in Beşiktaş</Card.Text>
              <Card.Text className="fw-bold">₺2,500,000</Card.Text>
            </Card>
          </Col>
          <Col xs={12} md={4} lg={3} className="mb-3">
            <Card className="text-center p-3">
              <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center mb-2 mx-auto" style={{ width: '30px', height: '30px' }}>
                2
              </div>
              <Card.Text className="mb-1">Investment Land in Çatalca</Card.Text>
              <Card.Text className="fw-bold">₺850,000</Card.Text>
            </Card>
          </Col>
          <Col xs={12} md={4} lg={3} className="mb-3">
            <Card className="text-center p-3">
              <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center mb-2 mx-auto" style={{ width: '30px', height: '30px' }}>
                3
              </div>
              <Card.Text className="mb-1">2020 BMW 3 Series</Card.Text>
              <Card.Text className="fw-bold">₺450,000</Card.Text>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default RealEstateList;
