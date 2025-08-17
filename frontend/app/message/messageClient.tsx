"use client";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { fetchMessagesByUserId, sendMessage } from "@/lib/slice/messageSlice";
import { User } from "@/types/types";
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
  const messagesData = useAppSelector((state) => state.messages.userMessages);
  const singleUserMessages = useAppSelector(
    (state) => state.messages.singleUserMessages
  );
  const currentUser = useAppSelector((state) => state.users.currentUser);
  const users = useAppSelector((state) => state.users.users);

  const dispatch = useAppDispatch();
  const [selectedUser, setSelectedUser] = useState<User>(users[0]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    if (users && users.length > 0 && !selectedUser) {
      setSelectedUser(users[0]); // İlk kullanıcıyı seç
    }
  }, [users, selectedUser]);

  useEffect(() => {
    if (selectedUser) {
      if (!selectedUser.id) return;
      dispatch(fetchMessagesByUserId(selectedUser.id));
    }
  }, [selectedUser, dispatch]);
  if (!currentUser) return <div>Unauthorized</div>;

  const handleSend = () => {
    dispatch(sendMessage({
      "sender": currentUser?.id || 0,
      "content": inputText
    }))
  };

  const isAdmin = currentUser.is_staff;

  if (!isAdmin) {
    return (
      <Container
        fluid
        className="p-3"
        style={{ height: "100vh", backgroundColor: "#f8f9fa" }}
      >
        <Row className="h-100">
          <Col md={12} className="d-flex flex-column">
            <Card className="flex-grow-1 my-3">
              <Card.Header>
                <strong>Mesajlar</strong>
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

  if (isAdmin && users && users.length > 0 && selectedUser) {
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
                  <div className="text-muted small">{user.lastName}</div>
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
                {singleUserMessages.map((msg, idx) => (
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
}
