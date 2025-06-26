"use client";
import { useState } from 'react';
import { Button, Form, Card, Alert } from 'react-bootstrap';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage('Lütfen tüm alanları doldurun');
      setShowError(true);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Şifreler eşleşmiyor');
      setShowError(true);
      return;
    }

    // Kayıt işlemleri burada yapılır
    console.log("Kayıt bilgileri:", { name, email, password });
    setShowError(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card style={{ width: '25rem' }} className="p-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Kayıt Ol</h4>
          <span style={{ cursor: 'pointer' }}>×</span>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>Ad Soyad</Form.Label>
            <Form.Control
              type="text"
              placeholder="Adınızı ve soyadınızı girin"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>E-posta</Form.Label>
            <Form.Control
              type="email"
              placeholder="ornek@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Şifre</Form.Label>
            <Form.Control
              type="password"
              placeholder="Şifrenizi girin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword" className="mb-3">
            <Form.Label>Şifre Tekrar</Form.Label>
            <Form.Control
              type="password"
              placeholder="Şifrenizi tekrar girin"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {showError && (
            <Alert variant="danger">{errorMessage}</Alert>
          )}

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
