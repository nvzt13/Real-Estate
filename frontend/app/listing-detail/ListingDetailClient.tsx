"use client";
import Link from 'next/link';
import React from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';

const listing = {
  title: 'Modern Villa in Beşiktaş',
  location: 'Beşiktaş, İstanbul',
  price: 2500000,
  label: 'Öne Çıkan',
  imageMain: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2V8ZW58MHx8MHx8fDA%3D',
  images: [
    'https://media.istockphoto.com/id/1437629749/photo/land-plot-in-aerial-view-in-chiang-mai-of-thailand.webp?a=1&b=1&s=612x612&w=0&k=20&c=oyTH8AJAu2ZGZHYzGbc9pomMTChUTu5dJQf3KBZBZIo=',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2V8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2V8ZW58MHx8MHx8fDA%3D',
  ],
  specs: {
    rooms: '4+1',
    area: '250m²',
    floor: '2',
    age: '5 yıl',
    heating: 'Kombi',
    parking: 'Var',
  },
  description:
    'Lüks villa, deniz manzaralı, 4+1, 250m², modern tasarım, güvenlikli site içinde, özel bahçe ve havuz.',
};
const vehicleListing = {
  title: '2021 BMW 320i Sport Line',
  location: 'Kadıköy, İstanbul',
  price: 1450000,
  label: 'Yeni İlan',
  imageMain: 'https://images.unsplash.com/photo-1607532941433-304659e81991?w=500&auto=format&fit=crop&q=60',
  images: [
    'https://images.unsplash.com/photo-1607532941433-304659e81991?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1629904853716-f0bc54eea447?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1618495072024-904cded59f1b?w=500&auto=format&fit=crop&q=60',
  ],
  specs: {
    brand: 'BMW',
    model: '320i Sport Line',
    year: '2021',
    fuel: 'Benzin',
    transmission: 'Otomatik',
    mileage: '45.000 km',
  },
  description:
    '2021 model BMW 320i Sport Line, düşük kilometreli, otomatik vites, full paket, bakımları yetkili serviste yapılmış, değişensiz.',
};
const landListing = {
  title: 'Deniz Manzaralı Yatırımlık Arsa',
  location: 'Urla, İzmir',
  price: 1850000,
  label: 'Fırsat',
  imageMain: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed3f?w=500&auto=format&fit=crop&q=60',
  images: [
    'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed3f?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1570129757665-cb51f26c5cb7?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1612874745737-b2e82a9f4f87?w=500&auto=format&fit=crop&q=60',
  ],
  specs: {
    area: '700m²',
    zoning: 'Konut İmarlı',
    deed: 'Müstakil Parsel',
    frontage: '30m',
    infrastructure: 'Elektrik, Su, Yol Var',
    status: 'Boş',
  },
  description:
    'Urla\'da deniz manzaralı, 700m², konut imarlı, yatırımlık arsa. Elektrik, su ve yol altyapısı hazır. Sessiz, doğa ile iç içe konum.',
};

function ListingDetailPage() {
  return (
    <Container className="py-4">
      <div className="mb-3">
        <Link href="/" className="text-decoration-none d-flex align-items-center">
          <i className="fas fa-arrow-left me-2" style={{ fontSize: '20px', color: '#5e1ee8' }}></i>
          <span className="text-dark">Geri Dön</span>
        </Link>
      </div>

      <Row className="g-4">
        {/* Sol: Görseller */}
        <Col lg={6}>
          <img
            src={listing.imageMain}
            alt="Main"
            className="img-fluid mb-3 rounded"
          />

          <div className="d-flex flex-wrap gap-2">
            {listing.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Villa ${i + 1}`}
                style={{
                  width: '100px',
                  height: '70px',
                  borderRadius: '5px',
                  objectFit: 'cover',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        </Col>

        {/* Sağ: Bilgi ve Açıklama */}
        <Col lg={6}>
          {listing.label && <Badge bg="warning" className="mb-2">{listing.label}</Badge>}
          <h4>{listing.title}</h4>
          <div className="text-muted">{listing.location}</div>
          <h3 className="mt-2" style={{ color: '#5e1ee8' }}>
            ₺{listing.price.toLocaleString('tr-TR')}
          </h3>

          <h5 className="fw-bold mt-4">Özellikler</h5>
          <Row>
            <Col xs={6}><p><strong>Oda Sayısı:</strong> {listing.specs.rooms}</p></Col>
            <Col xs={6}><p><strong>Alan:</strong> {listing.specs.area}</p></Col>
            <Col xs={6}><p><strong>Kat:</strong> {listing.specs.floor}</p></Col>
            <Col xs={6}><p><strong>Yaş:</strong> {listing.specs.age}</p></Col>
            <Col xs={6}><p><strong>Isıtma:</strong> {listing.specs.heating}</p></Col>
            <Col xs={6}><p><strong>Otopark:</strong> {listing.specs.parking}</p></Col>
          </Row>

          <h5 className="mt-3">Açıklama</h5>
          <p style={{ lineHeight: 1.6 }}>{listing.description}</p>

          <Button
            style={{
              backgroundColor: '#4318D1',
              border: 'none',
              width: '100%',
              marginTop: '20px',
            }}
          >
            Satıcıyla İletişime Geç
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ListingDetailPage;