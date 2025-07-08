"use client";
import React from "react";
import Link from "next/link";
import { Container, Navbar, Nav, Button, Offcanvas } from "react-bootstrap";
import Image from "next/image";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Header() {
  const login = true;

  return (
    <Navbar expand="md" className="shadow-sm position-relative" style={{ zIndex: 1040 }}>
      <Container style={{ maxWidth: "1295px", height: "64px" }}>
        <Link href="/" className="navbar-brand fw-bold" style={{ fontSize: "24px", lineHeight: "36px" }}>
          EmlakPro
        </Link>

        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          className="bg-white"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Menü</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="me-auto">
              <Link href="/" className="nav-link" style={{ lineHeight: "25px" }}>
                Ana Sayfa
              </Link>
              <Link href="/harita" className="nav-link">
                Harita
              </Link>
              <Link href="/favoriler" className="nav-link">
                Favoriler
              </Link>
              <Link href="/admin" className="nav-link">
                Admin
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
                    <Link href="/mesajlar" className="dropdown-item">
                      Mesajlar
                    </Link>
                  </li>
                  <li>
                    <Link href="/favoriler" className="dropdown-item">
                      Favoriler
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
                <Link href="/giris" passHref>
                  <Button variant="outline-primary" className="me-2">
                    Giriş Yap
                  </Button>
                </Link>
                <Link href="/kayit" passHref>
                  <Button style={{ backgroundColor: "#4318D1" }}>
                    Kayıt Ol
                  </Button>
                </Link>
              </Nav>
            )}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Header;