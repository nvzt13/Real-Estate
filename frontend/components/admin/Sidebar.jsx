import { useState } from 'react';
import { Accordion, Nav } from 'react-bootstrap';
import Link from 'next/link';

export default function Sidebar() {
  const [activeKey, setActiveKey] = useState(null);

  return (
    <Nav defaultActiveKey="/" className="flex-column bg-primary sidebar sidebar-dark p-3" style={{ minHeight: '100vh' }}>
      {/* Sidebar Brand */}
      <Link href="/" passHref legacyBehavior>
        <Nav.Link className="d-flex align-items-center justify-content-center mb-4 text-white fs-4 fw-bold">
          <i className="fas fa-laugh-wink me-2 rotate-n-15"></i> Atalay Garımenkul
        </Nav.Link>
      </Link>

      <hr className="sidebar-divider my-0 border-light" />

      {/* Dashboard Link */}
      <Link href="/" passHref legacyBehavior>
        <Nav.Link active className="text-white">
          <i className="fas fa-fw fa-tachometer-alt me-2"></i> Kontrol Paneli
        </Nav.Link>
      </Link>

      <hr className="sidebar-divider border-light" />

      {/* Accordion for collapsible menu */}
      <Accordion activeKey={activeKey} onSelect={(k) => setActiveKey(k)} flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <i className="fa-solid fa-landmark me-2"></i> Ev
          </Accordion.Header>
          <Accordion.Body className="bg-primary text-white p-2">
            {/* Buraya evle ilgili alt linkler eklenebilir */}
            <Nav.Link href="#" className="text-white ps-4">Alt Sayfa 1</Nav.Link>
            <Nav.Link href="#" className="text-white ps-4">Alt Sayfa 2</Nav.Link>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <i className="fa-solid fa-car me-2"></i> Araba
          </Accordion.Header>
          <Accordion.Body className="bg-primary text-white p-2">
            <Nav.Link href="#" className="text-white ps-4">Alt Sayfa 1</Nav.Link>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <i className="fa-solid fa-sign-hanging me-2"></i> Arsa
          </Accordion.Header>
          <Accordion.Body className="bg-primary text-white p-2">
            <Nav.Link href="#" className="text-white ps-4">Alt Sayfa 1</Nav.Link>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <hr className="sidebar-divider border-light mt-auto" />
    </Nav>
  );
}
