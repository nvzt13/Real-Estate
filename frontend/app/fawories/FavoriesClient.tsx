"use client"
import React from 'react'
import { Container, Row, Col, Form, FormControl, Button, Card } from 'react-bootstrap'
import { Search, Heart } from 'react-bootstrap-icons'

const FavoriesClient = () => {
  return (
<Container fluid className="p-0">
      <Container className="my-4">
        <Card className="text-center p-5 border-0 shadow-sm" style={{ height: '500px', backgroundColor: '#f8f9fa' }}>
          <Card.Body className="d-flex flex-column align-items-center justify-content-center">
            <Heart size={48} className="text-muted mb-3" />
            <Card.Text className="text-muted">
                Henüz favori ilanınız yok.
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </Container>  )
}

export default FavoriesClient