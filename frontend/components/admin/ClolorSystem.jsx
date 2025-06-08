import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const colors = [
  { name: 'Primary', className: 'bg-primary text-white', code: '#4e73df' },
  { name: 'Success', className: 'bg-success text-white', code: '#1cc88a' },
  { name: 'Info', className: 'bg-info text-white', code: '#36b9cc' },
  { name: 'Warning', className: 'bg-warning text-white', code: '#f6c23e' },
  { name: 'Danger', className: 'bg-danger text-white', code: '#e74a3b' },
  { name: 'Secondary', className: 'bg-secondary text-white', code: '#858796' },
  { name: 'Light', className: 'bg-light text-dark', code: '#f8f9fc' },
  { name: 'Dark', className: 'bg-dark text-white', code: '#5a5c69' },
];

export default function ColorSystem() {
  return (
    <Row>
      {colors.map(({ name, className, code }) => (
        <Col key={name} lg={6} className="mb-4">
          <Card className={`${className} shadow`}>
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text className={name === 'Light' ? 'text-dark' : 'text-white-50'}>
                {code}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
