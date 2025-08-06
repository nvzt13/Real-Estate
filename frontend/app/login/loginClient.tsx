"use client";
import { useAppDispatch } from '@/lib/hooks';
import { loginUserAsync } from '@/lib/slice/userSlice';
import { useState } from 'react';
import { Button, Form, Card, Alert, Modal } from 'react-bootstrap';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setShowError(true);
      return;
    }
    dispatch(loginUserAsync({ email, password }));
    setShowError(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card style={{ width: '25rem' }} className="p-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Giriş Yap</h4>
          <span style={{ cursor: 'pointer' }}>×</span>
        </div>

        <Form onSubmit={handleSubmit}>
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

          {showError && (
            <Alert variant="danger">Lütfen tüm alanları doldurun</Alert>
          )}

          <Button variant="primary" type="submit" className="w-100">
            Giriş Yap
          </Button>
        </Form>

        <div className="text-center mt-3">
          <small>
            Hesabınız yok mu? <a href="/register">Kayıt olun</a>
          </small>
        </div>
      </Card>
    </div>
  );
}

export default LoginForm;
