"use client"
import React, { useState } from "react";
import { Container, Row, Col, Button, Card, ButtonGroup } from "react-bootstrap";
import { BsBuilding, BsPeople } from "react-icons/bs";
import AdminListings from "./AdminListings";
import { useAppSelector } from "@/lib/hooks";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const listings = useAppSelector((state) => state.listings.listings);
  const currentUser = useAppSelector((state) => state.users.currentUser);
  const isAdmin = currentUser?.is_staff;
  if (!isAdmin) {
    return (
      <Container className="py-4">
        <Row>
          <Col>
            <h3 className="fw-bold">Yönetici Paneli</h3>
            <p>Bu sayfaya erişim izniniz yok.</p>
          </Col>
        </Row>
      </Container>
    );
  }
  return (
    <Container className="py-4">
      <Row className="mb-4 align-items-center">
        <Col><h3 className="fw-bold">Admin Kontrol Paneli</h3></Col>
      </Row>

      {/* Sekmeler */}
      <ButtonGroup className="mb-4">
        <Button
          variant={activeTab === "dashboard" ? "primary" : "light"}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </Button>
        <Button
          variant={activeTab === "ilanlar" ? "primary" : "light"}
          onClick={() => setActiveTab("ilanlar")}
        >
          İlanlar
        </Button>
        <Button
          variant={activeTab === "kullanicilar" ? "primary" : "light"}
          onClick={() => setActiveTab("kullanicilar")}
        >
          Kullanıcılar
        </Button>
        <Button
          variant={activeTab === "mesajlar" ? "primary" : "light"}
          onClick={() => setActiveTab("mesajlar")}
        >
          Mesajlar
        </Button>
      </ButtonGroup>

      {/* İçerik */}
      {activeTab === "dashboard" && (
        <Row className="g-4">
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Card.Title className="mb-0 fw-semibold">Toplam İlanlar</Card.Title>
                  <div
                    style={{ backgroundColor: "#5b2eff" }}
                    className="text-white p-2 rounded"
                  >
                    <BsBuilding size={24} />
                  </div>
                </div>
                <h2> {listings.length} </h2>
                <p className="text-muted">Aktif ilanlar</p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Card.Title className="mb-0 fw-semibold">Toplam Kullanıcılar</Card.Title>
                  <div
                    style={{ backgroundColor: "#00c39a" }}
                    className="text-white p-2 rounded"
                  >
                    <BsPeople size={24} />
                  </div>
                </div>
                <h2>3</h2>
                <p className="text-muted">Kayıtlı kullanıcılar</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Diğer sekmeler için içerik örneği (boş bırakıldı) */}
      {activeTab === "ilanlar" && <AdminListings />}
      {activeTab === "kullanicilar" && <p>Kullanıcılar sekmesi içeriği buraya gelecek.</p>}
      {activeTab === "mesajlar" && <p>Mesajlar sekmesi içeriği buraya gelecek.</p>}
    </Container>
  );
}