"use client";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { fetchMessagesByUserId } from "@/lib/slice/messageSlice";
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Form,
  Button,
  Card,
} from "react-bootstrap";

export default function ChatApp() {
  const [inputText, setInputText] = useState("");
  const messagesData = useAppSelector((state) => state.messages.singleUserMessage);
  console.log(messagesData)
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (users && users.length > 0 && !selectedUser) {
      setSelectedUser(users[0]); // İlk kullanıcıyı seç
    }
  }, [users]);

  useEffect(() => {
    if (selectedUser) {
      dispatch(fetchMessagesByUserId(selectedUser.id));
    }
  }, [selectedUser, dispatch]);

  if (!users || users.length === 0 || !selectedUser) {
    return <div>Loading...</div>;
  }

  const handleSend = () => {
    // Buraya mesaj gönderme işlemi eklenebilir
    setInputText("");
  };

  return (
    <Container
      fluid
      className="p-3"
      style={{ height: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <Row className="h-100">
        {/* Sol Panel - Kullanıcılar */}
        <Col md={3} className="border-end bg-white">
          <Form.Control
            type="text"
            placeholder="Kişi ara..."
            className="my-3"
          />
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
              <strong>{selectedUser.name}</strong>{" "}
              <span className="text-success">Çevrimiçi</span>
            </Card.Header>
            <Card.Body style={{ overflowY: "auto", maxHeight: "65vh" }}>
              {messagesData.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-3 d-flex ${
                    msg.is_admin
                      ? "justify-content-start"
                      : "justify-content-end"
                  }`}
                >
                  <div
                    className={`p-2 rounded ${
                      msg.is_admin
                        ? "bg-light text-dark"
                        : "bg-primary text-white"
                    }`}
                    style={{ maxWidth: "70%" }}
                  >
                    <div>{msg.content}</div>
                    <small className="text-muted">
                      {new Date(msg.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </small>
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