"use client";
import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";

function Header() {
  return (
    <>
      <Navbar
        expand="lg"
        className="shadow-sm position-relative"
        style={{ zIndex: 1 }}
      >
        <Container style={{ maxWidth: "1295px", height: "64px" }}>
          <Navbar.Brand
            style={{ fontSize: "24px, lineHeight:36px" }}
            href="/"
            className="fw-bold"
          >
            EmlakPro
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="bg-white m-3 rounded">
            <Nav className="me-auto">
              <Nav.Link style={{ lineHeight: "25px" }} href="/">
                Ana Sayfa
              </Nav.Link>
              <Nav.Link href="/harita">Harita</Nav.Link>
              <Nav.Link href="/favoriler">Favoriler</Nav.Link>
            </Nav>
            <Nav className="d-flex gap-2 mt-3">
              <Button variant="outline-primary" className="me-2">
                Giriş Yap
              </Button>
              <Button style={{backgroundColor:"#4318D1"}}>Kayıt Ol</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
