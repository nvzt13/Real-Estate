"use client";
import React, { use } from "react";
import Link from "next/link";
import { Container, Navbar, Nav, Button, Offcanvas, Dropdown, Image as RBImage } from "react-bootstrap";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

function Header() {
  const login = useAppSelector((state) => state.users.isLoggedIn);
  const dispatch = useAppDispatch();

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
              <Link href="/map" className="nav-link">
                Harita
              </Link>
              <Link href="/fawories" className="nav-link">
                Favoriler
              </Link>
              <Link href="/admin" className="nav-link">
                Admin
              </Link>
            </Nav>

            {login ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="light" className="p-0 border-0 bg-transparent">
                  <Image
                    src="/banner-01.jpg"
                    width={50}
                    height={50}
                    className="rounded-circle"
                    alt="User Avatar"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu className="p-3">
                  <Dropdown.Item as={Link} href="/message">
                    Mesajlar
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} href="/fawories">
                    Favoriler
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Button variant="danger" className="w-100 mt-2" onClick={() => dispatch(logout()) }>
                    Çıkış Yap
                  </Button>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav className="d-flex gap-2 mt-3">
                <Link href="/login" passHref>
                  <Button variant="outline-primary" className="me-2">
                    Giriş Yap
                  </Button>
                </Link>
                <Link href="/register" passHref>
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
