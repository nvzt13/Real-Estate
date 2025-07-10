
"use client"
// ChatApp.js
import React, { useState } from "react";
import { Container, Row, Col, ListGroup, Form, Button, Card } from "react-bootstrap";

const users = [
  { id: 1, name: "Ahmet Kaya", lastMessage: "Bu hafta sonu müsait misiniz?" },
  { id: 2, name: "Elif Demir", lastMessage: "Teşekkürler, yarın görüşürüz" },
  { id: 3, name: "Mehmet Özkan", lastMessage: "Fotoğrafları gönderebilir misiniz?" },
  { id: 4, name: "Zeynep Yılmaz", lastMessage: "Mükemmel, anlaştık" },
];

const messagesData = {
  1: [
    { from: "Ahmet Kaya", text: "Merhaba! Emlak ilanınız hakkında bilgi alabilir miyim?", time: "14:30" },
    { from: "ME", text: "Tabii ki! Hangi ilan hakkında bilgi almak istiyorsunuz?", time: "14:32" },
    { from: "Ahmet Kaya", text: "Beşiktaş'taki villa için. Fiyat konusunda pazarlık yapılabilir mi?", time: "14:35" },
    { from: "ME", text: "Evet, fiyat konusunda görüşebiliriz. Ne zaman görüşmek istersiniz?", time: "14:37" },
    { from: "Ahmet Kaya", text: "Bu hafta sonu müsait misiniz? Cumartesi öğleden sonra olur mu?", time: "14:40" },
  ],
};

export default function ChatApp() {
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    // Buraya mesaj gönderme işlemi eklenebilir
    setInputText("");
  };

  return (
    <Container fluid className="p-3" style={{ height: "100vh", backgroundColor: "#f8f9fa" }}>
      <Row className="h-100">
        {/* Sol Panel - Kullanıcılar */}
        <Col md={3} className="border-end bg-white">
          <Form.Control type="text" placeholder="Kişi ara..." className="my-3" />
          <ListGroup>
            {users.map((user) => (
              <ListGroup.Item
                key={user.id}
                action
                active={selectedUser.id === user.id}
                onClick={() => setSelectedUser(user)}
              >
                <strong>{user.name}</strong>
                <div className="text-muted small">{user.lastMessage}</div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        {/* Sağ Panel - Mesajlar */}
        <Col md={9} className="d-flex flex-column">
          <Card className="flex-grow-1 my-3">
            <Card.Header>
              <strong>{selectedUser.name}</strong> <span className="text-success">Çevrimiçi</span>
            </Card.Header>
            <Card.Body style={{ overflowY: "auto", maxHeight: "65vh" }}>
              {messagesData[selectedUser.id]?.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-3 d-flex ${msg.from === "ME" ? "justify-content-end" : "justify-content-start"}`}
                >
                  <div className={`p-2 rounded ${msg.from === "ME" ? "bg-primary text-white" : "bg-light"}`}>
                    <div>{msg.text}</div>
                    <small className="text-muted">{msg.time}</small>
                  </div>
                </div>
              ))}
            </Card.Body>
            <Card.Footer className="d-flex align-items-center gap-2">
              <Form.Control
                placeholder="Mesajınızı yazın..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <Button variant="primary" onClick={handleSend}>
                Gönder
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}