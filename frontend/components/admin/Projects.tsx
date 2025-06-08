import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';

const projects = [
  { name: 'Server Migration', progress: 20, variant: 'danger', label: '20%' },
  { name: 'Sales Tracking', progress: 40, variant: 'warning', label: '40%' },
  { name: 'Customer Database', progress: 60, variant: undefined, label: '60%' },
  { name: 'Payout Details', progress: 80, variant: 'info', label: '80%' },
  { name: 'Account Setup', progress: 100, variant: 'success', label: 'Complete!' },
];

export default function Projects() {
  return (
    <Card className="shadow mb-4">
      <Card.Header className="py-3">
        <h6 className="m-0 font-weight-bold text-primary">Projects</h6>
      </Card.Header>
      <Card.Body>
        {projects.map(({ name, progress, variant, label }) => (
          <div key={name} className="mb-4">
            <h4 className="small font-weight-bold d-flex justify-content-between align-items-center">
              <span>{name}</span>
              <span>{label}</span>
            </h4>
            <ProgressBar now={progress} variant={variant} />
          </div>
        ))}
      </Card.Body>
    </Card>
  );
}
