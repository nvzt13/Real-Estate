"use client";
import Link from 'next/link';
import React, { useState } from 'react';
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

function ListingDetailPage() {
  const [mainImage, setMainImage] = useState(listing.imageMain);

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
  src={mainImage}
  alt="Main"
  className="img-fluid mb-3 rounded"
  style={{
    width: '100%',
    height: '400px', // Sabit yükseklik
    objectFit: 'cover', // Resmi kırpar ama orantılı gösterir
    borderRadius: '8px',
  }}
/>

          <div className="d-flex flex-wrap gap-2">
            {listing.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Villa ${i + 1}`}
                onClick={() => setMainImage(img)}
                style={{
                  width: '100px',
                  height: '70px',
                  borderRadius: '5px',
                  objectFit: 'cover',
                  cursor: 'pointer',
                  border: img === mainImage ? '2px solid #5e1ee8' : '1px solid #ccc',
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