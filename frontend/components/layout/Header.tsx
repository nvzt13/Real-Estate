"use client";
import React from "react";
import Link from "next/link";
import { Container, Navbar, Nav, Offcanvas, Dropdown, Spinner } from "react-bootstrap";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { logout } from "@/lib/slice/userSlice";

function Header() {
  const currentUser = useAppSelector((state) => state.users.currentUser);
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.users.loading);
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
              <Link href="/favorites" className="nav-link">
                Favoriler
              </Link>
              <Link href="/admin" className="nav-link">
                Admin
              </Link>
            </Nav>

            {loading ? (
              <div className="d-flex align-items-center">
                <Spinner animation="border" size="sm" className="me-2" />
                <span>Yükleniyor...</span>
              </div>
            ) : currentUser ? (
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
                  <Dropdown.Item as={Link} href="/favorites">
                    Favoriler
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <button
                    className="btn btn-danger w-100 mt-2"
                    onClick={() => dispatch(logout())}
                  >
                    Çıkış Yap
                  </button>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav className="d-flex gap-2 mt-3">
                <Link href="/login" className="btn btn-outline-primary me-2">
                  Giriş Yap
                </Link>
                <Link href="/register" className="btn" style={{ backgroundColor: "#4318D1", color: "white" }}>
                  Kayıt Ol
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
