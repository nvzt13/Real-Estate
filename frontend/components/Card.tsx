"use client"
import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';

function GenericCard({ data }) {
      const getBackgroundColor = (type) => {
    switch (type) {
      case 'Ev':
        return 'success'; // mor
      case 'Araba':
        return 'danger'; // mavi
      case 'Arsa':
        return 'warning'; // yeşil
      default:
        return 'danger'; // gri
    }
  };
  return (
    <Card style={{ width: '373px', height:"386px", position: 'relative', borderRadius: '1rem', overflow: 'hidden' }}>
      {/* Öne Çıkan etiketi */}
      {data.label && (
        <Badge bg="warning" style={{ position: 'absolute', top: '10px', left: '10px' }}>
          {data.label}
        </Badge>
      )}

      {/* Favori simgesi */}
      <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '20px', cursor: 'pointer' }}>
        🤍
      </div>

      {/* Üst görsel */}
      <Card.Img variant="top" src={data.image} style={{ height: '200px', objectFit: 'cover' }} />

      {/* İçerik */}
      <Card.Body>
        <Card.Title style={{ fontSize: '1rem' }}>{data.title}</Card.Title>
        <Card.Text style={{ color: 'gray', marginBottom: '0.5rem' }}>
          {data.location}
        </Card.Text>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 'bold', color: '#5e1ee8', fontSize: '1.2rem' }}>
            ₺{data.price.toLocaleString('tr-TR')}
          </div>
          <Badge bg={getBackgroundColor(data.type)}>{data.type}</Badge>
        </div>
        <Button className="mt-3" style={{ width: '100%', backgroundColor: "#4318D1"}} href='/listing-detail'>
          Detayları Gör
        </Button>
      </Card.Body>
    </Card>
  );
}

export default GenericCard;
