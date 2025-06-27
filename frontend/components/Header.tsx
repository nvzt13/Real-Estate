"use client"
import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { ArrowLeft, ArrowCounterclockwise } from 'react-bootstrap-icons'; // For icons

function Header() {
  return (
    <>
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="#home" className="fw-bold">EmlakPro</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Ana Sayfa</Nav.Link>
              <Nav.Link href="#harita">Harita</Nav.Link>
              <Nav.Link href="#favoriler">Favoriler</Nav.Link>
            </Nav>
            <Nav>
              <Button variant="outline-primary" className="me-2">Giriş Yap</Button>
              <Button variant="primary">Kayıt Ol</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
