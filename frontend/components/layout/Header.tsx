"use client"
import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';

function Header() {
  return (
    <>
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container style={{ maxWidth: '1295px', height:"64px" }}>
          <Navbar.Brand style={{fontSize:"24px, lineHeight:36px"}}  href="#home" className="fw-bold" >EmlakPro</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link style={{lineHeight:"25px"}} href="#home" >Ana Sayfa</Nav.Link>
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
