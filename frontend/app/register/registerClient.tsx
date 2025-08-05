"use client";

import { useState } from "react";
import { Button, Form, Card, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { createUserAsync } from "@/lib/slice/userSlice";

function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, lastName, email, password, confirmPassword } = formData;

    if (!name || !lastName || !email || !password || !confirmPassword) {
      setErrorMessage("Lütfen tüm alanları doldurun");
      setShowError(true);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Şifreler eşleşmiyor");
      setShowError(true);
      return;
    }

    const { confirmPassword: _, ...userData } = formData; // confirmPassword dahil edilmesin
    console.log("Kayıt bilgileri:", userData);
    setShowError(false);
    dispatch(createUserAsync(formData));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card style={{ width: "25rem" }} className="p-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Kayıt Ol</h4>
          <span style={{ cursor: "pointer" }}>×</span>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>Ad</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Adınız"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formLastName" className="mb-3">
            <Form.Label>Soyad</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Soyadınız"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>E-posta</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="ornek@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Şifre</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Şifrenizi girin"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword" className="mb-3">
            <Form.Label>Şifre Tekrar</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Şifrenizi tekrar girin"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </Form.Group>

          {showError && <Alert variant="danger">{errorMessage}</Alert>}

          <Button variant="primary" type="submit" className="w-100">
            Kayıt Ol
          </Button>
        </Form>

        <div className="text-center mt-3">
          <small>
            Zaten hesabınız var mı? <a href="#">Giriş yap</a>
          </small>
        </div>
      </Card>
    </div>
  );
}

export default RegisterForm;
