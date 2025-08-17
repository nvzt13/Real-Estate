"use client";
import GenericCard from "@/components/Card";
import { useAppSelector } from "@/lib/hooks";
import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { Heart } from "react-bootstrap-icons";

const FavoriesClient = () => {
  const currentUser = useAppSelector((state) => state.users.currentUser);
  const favorites = useAppSelector((state) => state.users.favorites);
  
  if (!currentUser) {
    return (
      <Container className="py-4">
        <Row>
          <Col>
            <h3 className="fw-bold">Favoriler</h3>
            <p>Favori ilanlarınızı görüntülemek için lütfen giriş yapın.</p>
          </Col>
        </Row>
      </Container>
    );
  }
  if (favorites.length > 0) {
    return (
      <Container fluid className="p-0">
        <Container className="my-4">
          <Row>
            {favorites.map((listing) => (
              <GenericCard key={listing.id} data={listing} />
            ))}
          </Row>
        </Container>
      </Container>
    );
  }
  return (
    <Container fluid className="p-0">
      <Container className="my-4">
        <Card
          className="text-center p-5 border-0 shadow-sm"
          style={{ height: "500px", backgroundColor: "#f8f9fa" }}
        >
          <Card.Body className="d-flex flex-column align-items-center justify-content-center">
            <Heart size={48} className="text-muted mb-3" />
            <Card.Text className="text-muted">
              Henüz favori ilanınız yok.
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </Container>
  );
};

export default FavoriesClient;
