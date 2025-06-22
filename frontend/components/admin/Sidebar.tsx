import { useState } from 'react';
import { Accordion, Nav } from 'react-bootstrap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <Nav
      className="d-flex flex-column bg-primary sidebar sidebar-dark p-3"
      style={{
        minHeight: '100vh',
        width: '100%',
        maxWidth: '250px',
      }}
    >
      {/* Marka */}
      <Link
        href="/"
        className="d-flex align-items-center justify-content-center mb-4 text-white fs-4 fw-bold text-decoration-none"
      >
        <i className="fas fa-laugh-wink me-2 rotate-n-15"></i> Atalay Garımenkul
      </Link>

      <hr className="sidebar-divider my-0 border-light" />

      {/* Kontrol Paneli */}
      <Link
        href="/"
        className={`text-white text-decoration-none py-2 px-3 rounded ${pathname === '/' ? 'bg-dark' : 'hover-bg-dark'}`}
      >
        <i className="fas fa-fw fa-tachometer-alt me-2"></i> Kontrol Paneli
      </Link>

      <hr className="sidebar-divider border-light" />

      {/* Accordion */}
      <Accordion activeKey={activeKey} onSelect={(k) => setActiveKey(k)} flush>
        {[
          { key: '0', icon: 'fa-landmark', title: 'Ev', links: ['Alt Sayfa 1', 'Alt Sayfa 2'] },
          { key: '1', icon: 'fa-car', title: 'Araba', links: ['Alt Sayfa 1'] },
          { key: '2', icon: 'fa-sign-hanging', title: 'Arsa', links: ['Alt Sayfa 1'] },
        ].map(({ key, icon, title, links }) => (
          <Accordion.Item eventKey={key} key={key} className="bg-transparent border-0">
            <Accordion.Header>
              <div
                className="w-100 px-2 py-1 d-flex align-items-center text-white"
                style={{
                  backgroundColor: activeKey === key ? '#0d6efd' : 'transparent',
                  borderRadius: '0.25rem',
                }}
              >
                <i className={`fa-solid ${icon} me-2`}></i> {title}
              </div>
            </Accordion.Header>
            <Accordion.Body className="bg-primary text-white p-2">
              {links.map((link, i) => (
                <Link
                  href="#"
                  key={i}
                  className="text-white ps-4 text-decoration-none d-block py-1 hover-bg-dark"
                >
                  {link}
                </Link>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <hr className="sidebar-divider border-light mt-auto" />
    </Nav>
  );
}
