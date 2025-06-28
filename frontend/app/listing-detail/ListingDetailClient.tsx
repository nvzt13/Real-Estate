"use client";
import Link from 'next/link';
import React from 'react';
import { Container, Row, Col, Button, Badge, ListGroup } from 'react-bootstrap';

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

function ListingDetailPage() {
  return (
    <Container className="mt-5">
      <div className="mb-4 d-flex align-items-center" style={{ cursor: 'pointer' }}>
        <Link href="/">
          <i className="fas fa-arrow-left me-2" style={{ fontSize: '20px', color: '#5e1ee8' }}></i>
          <span>Geri Dön</span>
        </Link>
      </div>
      <Row style={{width:"1271px"}}>
        {/* Sol: Görseller */}
        <Col md={6}>
          <img
            src={listing.imageMain}
            alt="Main"
            className="img-fluid mb-3"
            style={{ borderRadius: '10px' }}
          />
          <div style={{ display: 'flex', gap: '10px' }}>
            {listing.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Villa ${i + 1}`}
                style={{
                  width: '100px',
                  height: '70px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  objectFit: 'cover',
                }}
              />
            ))}
          </div>
        </Col>

        {/* Sağ: Bilgi ve Açıklama */}
        <Col md={6}>
          {listing.label && <Badge bg="warning" className="mb-2">{listing.label}</Badge>}

          <h4>{listing.title}</h4>
          <div style={{ color: 'gray' }}>{listing.location}</div>
          <h3 style={{ color: '#5e1ee8', marginTop: '10px' }}>₺{listing.price.toLocaleString('tr-TR')}</h3>

          {/* Özellikler */}
          <h5 className='fw-bold mt-4'>Özellikler</h5>
          <Row className="mb-3">
            <Col md={6}><p><strong>Oda Sayısı:</strong> {listing.specs.rooms}</p></Col>
            <Col md={6}><p><strong>Alan:</strong> {listing.specs.area}</p></Col>
            <Col md={6}><p><strong>Kat:</strong> {listing.specs.floor}</p></Col>
            <Col md={6}><p><strong>Yaş:</strong> {listing.specs.age}</p></Col>
            <Col md={6}><p><strong>Isıtma:</strong> {listing.specs.heating}</p></Col>
            <Col md={6}><p><strong>Otopark:</strong> {listing.specs.parking}</p></Col>
          </Row>
          {/* Açıklama */}
          <h5>Açıklama</h5>
          <p style={{ lineHeight: 1.6 }}>{listing.description}</p>

          <Button variant="primary" style={{ backgroundColor: '#5e1ee8', border: 'none', width: '100%' }}>
            Satıcıyla İletişime Geç
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ListingDetailPage;
