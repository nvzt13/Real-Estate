"use client"
import GenericCard from "@/components/Card";
import { useAppSelector } from "@/lib/hooks";
import { Container, Row, Col } from "react-bootstrap";


export default function Listings() {
  const listings = useAppSelector((state) => state.listings.listings);
  return (
    <div className="home container">
      <Container className="mt-5">
        <Row className="g-4 justify-content-center align-items-center d-flex justify-content-center">
          {listings.map((listing) => (
            <Col
              className="d-flex align-items-center justify-content-center"
              key={listing.id}
              md={4}
            >
              <GenericCard data={listing} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
