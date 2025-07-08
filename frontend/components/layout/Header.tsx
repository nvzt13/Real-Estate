"use client";
import React from "react";
import Link from "next/link";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import Image from "next/image";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Header() {
  const login = true;

  return (
    <Navbar expand="lg" className="shadow-sm position-relative">
      <Container style={{ maxWidth: "1295px", height: "64px" }}>
        <Link href="/" passHref legacyBehavior>
          <Navbar.Brand className="fw-bold" style={{ fontSize: "24px", lineHeight: "36px" }}>
            EmlakPro
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="bg-white m-3 rounded">
          <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link style={{ lineHeight: "25px" }}>Ana Sayfa</Nav.Link>
            </Link>
            <Link href="/harita" passHref legacyBehavior>
              <Nav.Link>Harita</Nav.Link>
            </Link>
            <Link href="/favoriler" passHref legacyBehavior>
              <Nav.Link>Favoriler</Nav.Link>
            </Link>
          </Nav>

          {login ? (
            <div className="dropdown">
              <button
                className="btn dropdown-toggle border-0 p-0 bg-transparent"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <Image
                  src="/banner-01.jpg"
                  width={50}
                  height={50}
                  className="rounded-circle"
                  alt="User Avatar"
                />
              </button>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <Link href="/mesajlar" passHref legacyBehavior>
                    <a className="dropdown-item">Mesajlar</a>
                  </Link>
                </li>
                <li>
                  <Link href="/favoriler" passHref legacyBehavior>
                    <a className="dropdown-item">Favoriler</a>
                  </Link>
                </li>
                <li>
                  <Button variant="danger" className="me-2 w-100">
                    Çıkış Yap
                  </Button>
                </li>
              </ul>
            </div>
          ) : (
            <Nav className="d-flex gap-2 mt-3">
              <Link href="/giris" passHref legacyBehavior>
                <Button variant="outline-primary" className="me-2">
                  Giriş Yap
                </Button>
              </Link>
              <Link href="/kayit" passHref legacyBehavior>
                <Button style={{ backgroundColor: "#4318D1" }}>
                  Kayıt Ol
                </Button>
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
