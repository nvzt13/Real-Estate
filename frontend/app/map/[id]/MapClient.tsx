"use client";
import React from 'react';
import { Container, Row, Col, Form, FormControl, Button, Card } from 'react-bootstrap';
import { Search, CompassFill } from 'react-bootstrap-icons';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Listing } from '@/types/types';
import { useAppSelector } from '@/lib/hooks';

// Leaflet marker icon fix
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const MapView = ({ selectedListing }: { selectedListing: Listing[] }) => {
  return (
    <MapContainer center={[41.0082, 28.9784]} zoom={10} style={{ height: '500px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {selectedListing.map((item, i) => (
        <Marker key={i} position={item.coordinates}>
          <Popup>
            <strong>{item.title}</strong><br />
            {item.price.toLocaleString('tr-TR')}₺
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

const MapClient = ({ id }: { id:string}) => {
  const listings = useAppSelector((state) => state.listings.listings);
  const selectedListing = listings.filter(item => String(item.id) === id);
  const dummy = [
    {
      title: "Modern Villa in Beşiktaş",
      price: 2500000,
      coords: [41.0436, 29.0015],
    },
    {
      title: "Investment Land in Çatalca",
      price: 850000,
      coords: [41.1934, 28.4878],
    },
    {
      title: "2020 BMW 3 Series",
      price: 450000,
      coords: [41.0151, 28.9795],
    },
  ];

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
        <Card className="text-center p-0 border-0 shadow-sm" style={{ height: '500px', backgroundColor: '#f8f9fa' }}>
          <MapView selectedListing={selectedListing} />
        </Card>
      </Container>

      {/* Alt Kartlar */}
      <Container className="my-4">
        <Row className="justify-content-center">
          {listings.map((item, index) => (
            <Col key={index} xs={12} md={4} lg={3} className="mb-3">
              <Card className="text-center p-3">
                <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center mb-2 mx-auto" style={{ width: '30px', height: '30px' }}>
                  {index + 1}
                </div>
                <Card.Text className="mb-1">{item.title}</Card.Text>
                <Card.Text className="fw-bold">{item.price.toLocaleString('tr-TR')}₺</Card.Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

    </Container>
  );
};

export default MapClient;
