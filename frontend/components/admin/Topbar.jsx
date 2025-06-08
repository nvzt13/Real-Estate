import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, NavDropdown, Badge, Image, Dropdown } from 'react-bootstrap';

const dummyNotifications = [
  { id: 1, text: "New comment on your post", time: "2m ago" },
  { id: 2, text: "You have a new follower", time: "10m ago" },
  { id: 3, text: "Server rebooted successfully", time: "1h ago" },
];

const dummyMessages = [
  { id: 1, from: "Jane Doe", text: "Hey, are you available tomorrow?", time: "5m ago" },
  { id: 2, from: "John Smith", text: "Please check the latest report.", time: "15m ago" },
  { id: 3, from: "Anna Lee", text: "Meeting at 3 PM?", time: "30m ago" },
];

export default function Topbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showMessages) setShowMessages(false);
  };

  const toggleMessages = () => {
    setShowMessages(!showMessages);
    if (showNotifications) setShowNotifications(false);
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-4 shadow">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Brand href="#home">Brand</Navbar.Brand>

      <Navbar.Collapse id="basic-navbar-nav">
        <Form className="d-flex mx-auto" style={{ maxWidth: '400px' }}>
          <FormControl
            type="search"
            placeholder="Search for..."
            className="me-2"
            aria-label="Search"
          />
          <Button variant="primary">Search</Button>
        </Form>

        <Nav className="ms-auto align-items-center">
          {/* Notifications */}
          <Dropdown show={showNotifications} onToggle={() => {}} align="end">
            <Dropdown.Toggle
              as={Nav.Link}
              id="dropdown-notifications"
              onClick={toggleNotifications}
              className="position-relative"
              href="#notifications"
            >
              <i className="fas fa-bell"></i>
              <Badge bg="danger" pill className="ms-1 position-absolute top-0 start-70 translate-middle">
                3+
              </Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: '300px' }}>
              <Dropdown.Header>Notifications</Dropdown.Header>
              {dummyNotifications.map(n => (
                <Dropdown.Item key={n.id} href="#notification">
                  <div><strong>{n.text}</strong></div>
                  <small className="text-muted">{n.time}</small>
                </Dropdown.Item>
              ))}
              <Dropdown.Divider />
              <Dropdown.Item href="#see-all">See all notifications</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Messages */}
          <Dropdown show={showMessages} onToggle={() => {}} align="end" className="ms-3">
            <Dropdown.Toggle
              as={Nav.Link}
              id="dropdown-messages"
              onClick={toggleMessages}
              className="position-relative"
              href="#messages"
            >
              <i className="fas fa-envelope"></i>
              <Badge bg="danger" pill className="ms-1 position-absolute top-0 start-70 translate-middle">
                7
              </Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: '300px' }}>
              <Dropdown.Header>Messages</Dropdown.Header>
              {dummyMessages.map(m => (
                <Dropdown.Item key={m.id} href="#message">
                  <div><strong>{m.from}</strong>: {m.text}</div>
                  <small className="text-muted">{m.time}</small>
                </Dropdown.Item>
              ))}
              <Dropdown.Divider />
              <Dropdown.Item href="#see-all">See all messages</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* User dropdown */}
          <NavDropdown
            title={
              <>
                <span className="me-2 text-gray-600">Douglas McGee</span>
                <Image src="/undraw_profile.svg" roundedCircle width={40} height={40} alt="User" />
              </>
            }
            id="basic-nav-dropdown"
            align="end"
            className="ms-3"
          >
            <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
            <NavDropdown.Item href="#activity-log">Activity Log</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
