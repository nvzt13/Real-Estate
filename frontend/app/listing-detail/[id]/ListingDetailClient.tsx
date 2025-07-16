"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';

export const listings = [
  {
    id: 1,
    type: 'ev',
    title: 'Modern Villa in Beşiktaş',
    location: 'Beşiktaş, İstanbul',
    coordinates: [41.0438, 29.0014],
    price: 2500000,
    label: 'Öne Çıkan',
    imageMain: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500',
    images: [
      'https://media.istockphoto.com/id/1437629749/photo/land-plot-in-aerial-view-in-chiang-mai-of-thailand.webp',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500',
    ],
    specs: {
      rooms: '4+1',
      area: '250m²',
      floor: '2',
      age: '5 yıl',
      heating: 'Kombi',
      parking: 'Var',
    },
    description: 'Lüks villa, deniz manzaralı, modern tasarım, güvenlikli site içinde.',
  },
  {
    id: 2,
    type: 'ev',
    title: 'Şehir Merkezi Daire',
    location: 'Kadıköy, İstanbul',
    coordinates: [40.9890, 29.0285],
    price: 1200000,
    label: 'Yeni',
    imageMain: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=500',
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=500',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?w=500',
      'https://images.unsplash.com/photo-1463620916661-2ad7b6a6e785?w=500',
    ],
    specs: {
      rooms: '3+1',
      area: '120m²',
      floor: '5',
      age: '10 yıl',
      heating: 'Doğalgaz',
      parking: 'Yok',
    },
    description: 'Toplu taşımaya yakın, yeni tadilatlı, ferah daire.',
  },
  {
    id: 3,
    type: 'ev',
    title: 'Deniz Manzaralı Yazlık',
    location: 'Çeşme, İzmir',
    coordinates: [38.3225, 26.3051],
    price: 1800000,
    label: 'Öne Çıkan',
    imageMain: 'https://images.unsplash.com/photo-1501183638714-768bb710ee93?w=500',
    images: [
      'https://images.unsplash.com/photo-1501183638714-768bb710ee93?w=500',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?w=500',
      'https://images.unsplash.com/photo-1463620916661-2ad7b6a6e785?w=500',
    ],
    specs: {
      rooms: '5+2',
      area: '300m²',
      floor: '1',
      age: '2 yıl',
      heating: 'Klima',
      parking: 'Var',
    },
    description: 'Deniz manzaralı, büyük bahçeli yazlık villa.',
  },
  {
    id: 4,
    type: 'araba',
    title: '2021 Model BMW 3 Serisi',
    location: 'Beşiktaş, İstanbul',
    coordinates: [41.0422, 29.0094],
    price: 850000,
    label: 'Öne Çıkan',
    imageMain: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=500',
    images: [
      'https://images.unsplash.com/photo-1549924231-f129b911e442?w=500',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500',
    ],
    specs: {
      brand: 'BMW',
      model: '3 Serisi',
      year: 2021,
      fuel: 'Benzin',
      transmission: 'Otomatik',
      mileage: '30000 km',
      color: 'Siyah',
    },
    description: 'Az kullanılmış, yüksek performanslı BMW.',
  },
  {
    id: 5,
    type: 'araba',
    title: '2019 Model Audi A4',
    location: 'Kadıköy, İstanbul',
    coordinates: [40.9876, 29.0364],
    price: 700000,
    label: 'Yeni',
    imageMain: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=500',
    images: [
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=500',
      'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=500',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500',
    ],
    specs: {
      brand: 'Audi',
      model: 'A4',
      year: 2019,
      fuel: 'Dizel',
      transmission: 'Manuel',
      mileage: '45000 km',
      color: 'Beyaz',
    },
    description: 'Ekonomik ve bakımlı Audi A4.',
  },
  {
    id: 6,
    type: 'araba',
    title: '2022 Model Tesla Model 3',
    location: 'Ataşehir, İstanbul',
    coordinates: [40.9921, 29.1245],
    price: 1200000,
    label: 'Öne Çıkan',
    imageMain: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=500',
    images: [
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=500',
      'https://images.unsplash.com/photo-1549921296-3a1c35470c8c?w=500',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500',
    ],
    specs: {
      brand: 'Tesla',
      model: 'Model 3',
      year: 2022,
      fuel: 'Elektrik',
      transmission: 'Otomatik',
      mileage: '15000 km',
      color: 'Kırmızı',
    },
    description: 'Elektrikli, yüksek performanslı Tesla Model 3.',
  },
];





function ListingDetailPage({ id }: { id: string }) {
  const selectedListing = listings.find(item => item.id === parseInt(id));
  const [mainImage, setMainImage] = useState<string | undefined>(selectedListing?.imageMain);

  useEffect(() => {
    setMainImage(selectedListing?.imageMain);
  }, [selectedListing]);

  if (!selectedListing) {
    return <p className="text-center mt-5">İlan bulunamadı.</p>;
  }

  return (
    <Container className="py-4">
      <div className="mb-3">
        <Link href="/" className="text-decoration-none d-flex align-items-center">
          <i className="fas fa-arrow-left me-2" style={{ fontSize: '20px', color: '#5e1ee8' }}></i>
          <span className="text-dark">Geri Dön</span>
        </Link>
      </div>

      <Row className="g-4">
        <Col lg={6}>
          <img
            src={mainImage}
            alt="Main"
            className="img-fluid mb-3 rounded"
            style={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />

          <div className="d-flex flex-wrap gap-2">
            {selectedListing.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Foto ${i + 1}`}
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

        <Col lg={6}>
          {selectedListing.label && <Badge bg="warning" className="mb-2">{selectedListing.label}</Badge>}
          <h4>{selectedListing.title}</h4>
          <div className="text-muted">{selectedListing.location}</div>
          <h3 className="mt-2" style={{ color: '#5e1ee8' }}>
            ₺{selectedListing.price.toLocaleString('tr-TR')}
          </h3>

          <h5 className="fw-bold mt-4">Özellikler</h5>
          <Row>
            {selectedListing.type === "ev" ? (
              <>
                <Col xs={6}><p><strong>Oda Sayısı:</strong> {selectedListing.specs.rooms}</p></Col>
                <Col xs={6}><p><strong>Alan:</strong> {selectedListing.specs.area}</p></Col>
                <Col xs={6}><p><strong>Kat:</strong> {selectedListing.specs.floor}</p></Col>
                <Col xs={6}><p><strong>Yaş:</strong> {selectedListing.specs.age}</p></Col>
                <Col xs={6}><p><strong>Isıtma:</strong> {selectedListing.specs.heating}</p></Col>
                <Col xs={6}><p><strong>Otopark:</strong> {selectedListing.specs.parking}</p></Col>
              </>
            ) : (
              <>
                <Col xs={6}><p><strong>Marka:</strong> {selectedListing.specs.brand}</p></Col>
                <Col xs={6}><p><strong>Model:</strong> {selectedListing.specs.model}</p></Col>
                <Col xs={6}><p><strong>Yıl:</strong> {selectedListing.specs.year}</p></Col>
                <Col xs={6}><p><strong>Yakıt:</strong> {selectedListing.specs.fuel}</p></Col>
                <Col xs={6}><p><strong>Vites:</strong> {selectedListing.specs.transmission}</p></Col>
                <Col xs={6}><p><strong>Km:</strong> {selectedListing.specs.mileage}</p></Col>
                <Col xs={6}><p><strong>Renk:</strong> {selectedListing.specs.color}</p></Col>
              </>
            )}
          </Row>

          <h5 className="mt-3">Açıklama</h5>
          <p style={{ lineHeight: 1.6 }}>{selectedListing.description}</p>

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
