"use client";
import { useAppSelector } from '@/lib/hooks';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';



function ListingDetailPage({ id }: { id: string }) {
  const listings = useAppSelector((state) => state.listings.listings);
  const selectedListing = listings.find(item => String(item.id) === id);  
  console.log("Selected Listing:", selectedListing);
  const [mainImage, setMainImage] = useState<string | undefined>(selectedListing?.images[0]);

  useEffect(() => {
    setMainImage(selectedListing?.images[0]);
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
          {selectedListing.type && <Badge bg="warning" className="mb-2">{selectedListing.type}</Badge>}
          <h4>{selectedListing.title}</h4>
          <div className="text-muted">{selectedListing.location}</div>
          <h3 className="mt-2" style={{ color: '#5e1ee8' }}>
            ₺{selectedListing.price.toLocaleString('tr-TR')}
          </h3>

          <h5 className="fw-bold mt-4">Özellikler</h5>
          <Row>
            {selectedListing.category === "ev" ? (
              <>
                <Col xs={6}><p><strong>Oda Sayısı:</strong> {'rooms' in selectedListing.specs ? selectedListing.specs.rooms : '-'}</p></Col>
                <Col xs={6}><p><strong>Alan:</strong> {'area' in selectedListing.specs ? selectedListing.specs.area : '-'}</p></Col>
                <Col xs={6}><p><strong>Kat:</strong> {'floor' in selectedListing.specs ? selectedListing.specs.floor : '-'}</p></Col>
                <Col xs={6}><p><strong>Yaş:</strong> {'age' in selectedListing.specs ? selectedListing.specs.age : '-'}</p></Col>
                <Col xs={6}><p><strong>Isıtma:</strong> {'heating' in selectedListing.specs ? selectedListing.specs.heating : '-'}</p></Col>
                <Col xs={6}><p><strong>Otopark:</strong> {'parking' in selectedListing.specs ? selectedListing.specs.parking : '-'}</p></Col>
              </>
            ) : (
              <>
                {'brand' in selectedListing.specs && (
                  <Col xs={6}><p><strong>Marka:</strong> {selectedListing.specs.brand}</p></Col>
                )}
                {'model' in selectedListing.specs && (
                  <Col xs={6}><p><strong>Model:</strong> {selectedListing.specs.model}</p></Col>
                )}
                {'year' in selectedListing.specs && (
                  <Col xs={6}><p><strong>Yıl:</strong> {selectedListing.specs.year}</p></Col>
                )}
                {'fuel' in selectedListing.specs && (
                  <Col xs={6}><p><strong>Yakıt:</strong> {selectedListing.specs.fuel}</p></Col>
                )}
                {'transmission' in selectedListing.specs && (
                  <Col xs={6}><p><strong>Vites:</strong> {selectedListing.specs.transmission}</p></Col>
                )}
                {'mileage' in selectedListing.specs && (
                  <Col xs={6}><p><strong>Km:</strong> {selectedListing.specs.mileage}</p></Col>
                )}
                {'color' in selectedListing.specs && (
                  <Col xs={6}><p><strong>Renk:</strong> {selectedListing.specs.color}</p></Col>
                )}
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
