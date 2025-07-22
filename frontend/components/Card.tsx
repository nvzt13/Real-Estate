"use client"
import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { Listing } from '@/types/types';

interface GenericCardProps {
  data: Listing;
}

function GenericCard({ data }: GenericCardProps) {
  const router = useRouter();
  const getBackgroundColor = (type) => {
    switch (type) {
      case 'Ev':
        return 'success';
      case 'Araba':
        return 'danger';
      case 'Arsa':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  const handleMapRedirect = () => {
    const lat = data.coordinates[0];
    const lng = data.coordinates[1];
    router.push(`/map?lat=${lat}&lng=${lng}&title=${encodeURIComponent(data.title)}`);
  };
  console.log(data)
  return (
    <Card style={{ width: '373px', height: "386px", position: 'relative', borderRadius: '1rem', overflow: 'hidden' }}>
      {data.type && (
        <Badge bg="warning" style={{ position: 'absolute', top: '10px', left: '10px' }}>
          {data.type}
        </Badge>
      )}

      <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '20px', cursor: 'pointer' }}>
        🤍
      </div>

      <Card.Img variant="top" src={data?.imageMain} style={{ height: '200px', objectFit: 'cover' }} />

      <Card.Body>
        <Card.Title style={{ fontSize: '1rem' }}>{data.title}</Card.Title>
        <Card.Text style={{ color: 'gray', marginBottom: '0.5rem' }}>
          {data.location}
        </Card.Text>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 'bold', color: '#5e1ee8', fontSize: '1.2rem' }}>
            ₺{data.price}
          </div>
          <Badge bg={getBackgroundColor(data.type)}>{data.type}</Badge>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <Button
          className="mt-3 me-2"
          variant='primary'
          style={{ width:"100%"}}
          href={`/listing-detail/${data.id}`}
        >
          Detayları Gör
        </Button>

        <Button
          className="mt-3"
          variant="outline-primary"
          style={{ width: '100%' }}
          onClick={handleMapRedirect}
        >
          Haritada Göster
        </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default GenericCard;
