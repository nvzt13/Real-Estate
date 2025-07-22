"use client";
import { Listing } from "@/types/types";
import React, { useState } from "react";
import {
  Form,
  Button,
  Card,
  Row,
  Col,
  Toast,
  ToastContainer,
} from "react-bootstrap";


const YeniIlanEkle = () => {
  const [kategori, setKategori] = useState("Ev");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [showToast, setShowToast] = useState(false);

  const [formData, setFormData] = useState<Listing>({
    id: "",
    type: "ev",
    title: "",
    location: "",
    coordinates: [0, 0],
    price: 0,
    label: "Yeni",
    imageMain: "",
    images: [],
    specs: {} as any,
    description: "",
  });

  const handleKategoriChange = (e) => {
    setKategori(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const collectSpecs = () => {
    if (kategori === "Ev") {
      return {
        rooms: (document.querySelector('[name="rooms"]') as HTMLInputElement)?.value,
        area: (document.querySelector('[name="area"]') as HTMLInputElement)?.value,
        floor: (document.querySelector('[name="floor"]') as HTMLInputElement)?.value,
        age: (document.querySelector('[name="age"]') as HTMLInputElement)?.value,
        heating: (document.querySelector('[name="heating"]') as HTMLSelectElement)?.value,
        parking: (document.querySelector('[name="parking"]') as HTMLSelectElement)?.value,
      };
    }
    if (kategori === "Arsa") {
      return {
        area: (document.querySelector('[name="area"]') as HTMLInputElement)?.value,
        cephe: (document.querySelector('[name="cephe"]') as HTMLInputElement)?.value,
        imarDurumu: (document.querySelector('[name="imarDurumu"]') as HTMLSelectElement)?.value,
        altYapı: (document.querySelector('[name="altYapı"]') as HTMLInputElement)?.value,
        tapuDurumu: (document.querySelector('[name="tapuDurumu"]') as HTMLSelectElement)?.value,
        durum: (document.querySelector('[name="durum"]') as HTMLSelectElement)?.value,
      };
    }
    if (kategori === "Araba") {
      return {
        brand: (document.querySelector('[name="brand"]') as HTMLInputElement)?.value,
        model: (document.querySelector('[name="model"]') as HTMLInputElement)?.value,
        year: parseInt((document.querySelector('[name="year"]') as HTMLInputElement)?.value || "0"),
        fuel: (document.querySelector('[name="fuel"]') as HTMLSelectElement)?.value,
        transmission: (document.querySelector('[name="transmission"]') as HTMLSelectElement)?.value,
        mileage: (document.querySelector('[name="mileage"]') as HTMLInputElement)?.value,
        color: (document.querySelector('[name="color"]') as HTMLInputElement)?.value,
      };
    }
    return {};
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSpecs = collectSpecs();
    const finalData: Listing = {
      ...formData,
      type: kategori.toLowerCase() as 'ev' | 'arsa' | 'araba',
      specs: newSpecs,
    };

    console.log("Gönderilecek veri:", finalData);
  };

  const showToastMessage = (message: string, type: "success" | "error" = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

 return (
    <div className="container mt-4 mb-5">
      <h3 className="mb-4">Yeni İlan Ekle</h3>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>İlan Kategorisi</Form.Label>
            <Form.Select value={kategori} onChange={handleKategoriChange}>
              <option value="Ev">Ev</option>
              <option value="Arsa">Arsa</option>
              <option value="Araba">Araba</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>İlan Tipi</Form.Label>
            <Form.Select>
              <option>Satılık</option>
              <option>Kiralık</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* Temel Bilgiler */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Temel Bilgiler</Card.Title>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>İlan Başlığı *</Form.Label>
              <Form.Control placeholder="Örn: Merkezi Konumda 3+1 Daire" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Açıklama *</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>

      {/* Fiyat ve Dinamik Özellikler */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Fiyat ve Özellikler</Card.Title>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Fiyat (TL) *</Form.Label>
                <Form.Control type="number" />
              </Form.Group>
            </Col>
          </Row>

          {/* Dinamik Alanlar */}
          {kategori === "Ev" && (
            <>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Oda Sayısı</Form.Label>
                    <Form.Control placeholder="Örn: 4+1" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Banyo Sayısı</Form.Label>
                    <Form.Control type="number" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Isıtma Tipi</Form.Label>
                    <Form.Select>
                      <option>Kombi</option>
                      <option>Merkezi</option>
                      <option>Soba</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Bina Yaşı</Form.Label>
                    <Form.Control placeholder="Örn: 5 yıl" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Bulunduğu Kat</Form.Label>
                    <Form.Control type="number" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Otopark</Form.Label>
                    <Form.Select>
                      <option>Var</option>
                      <option>Yok</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}

          {kategori === "Arsa" && (
            <>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Alan (m²)</Form.Label>
                    <Form.Control type="number" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>İmar Durumu</Form.Label>
                    <Form.Select>
                      <option>Konut İmarlı</option>
                      <option>Ticari</option>
                      <option>Tarla</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tapu Durumu</Form.Label>
                    <Form.Select>
                      <option>Müstakil Parsel</option>
                      <option>Hisseli</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Cephe (metre)</Form.Label>
                    <Form.Control type="number" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Altyapı</Form.Label>
                    <Form.Control placeholder="Elektrik, Su, Yol Var" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Durum</Form.Label>
                    <Form.Select>
                      <option>Boş</option>
                      <option>Ekili</option>
                      <option>Üzerinde Yapı Var</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}

          {kategori === "Araba" && (
            <>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Marka</Form.Label>
                    <Form.Control placeholder="Örn: BMW" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Model</Form.Label>
                    <Form.Control placeholder="320i Sport Line" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Model Yılı</Form.Label>
                    <Form.Control type="number" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Yakıt Tipi</Form.Label>
                    <Form.Select>
                      <option>Benzin</option>
                      <option>Dizel</option>
                      <option>Elektrik</option>
                      <option>Hibrit</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Vites Tipi</Form.Label>
                    <Form.Select>
                      <option>Otomatik</option>
                      <option>Manuel</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Kilometre</Form.Label>
                    <Form.Control type="number" />
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}
        </Card.Body>
      </Card>

      {/* Konum */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Konum Bilgileri</Card.Title>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Şehir *</Form.Label>
                <Form.Control placeholder="İstanbul" />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>İlçe *</Form.Label>
                <Form.Control placeholder="Kadıköy" />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Mahalle</Form.Label>
                <Form.Control placeholder="Fenerbahçe" />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Fotoğraflar */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Fotoğraflar</Card.Title>
          <div
            className="border p-4 text-center"
            style={{ borderStyle: "dashed" }}
          >
            <p>Fotoğrafları buraya sürükleyin</p>
            <Form.Group>
              <Form.Label className="btn btn-primary">Dosya Seç</Form.Label>
              <Form.Control type="file" multiple hidden />
              <Form.Text className="text-muted d-block mt-2">
                PNG, JPG, GIF formatları desteklenir (Maksimum 10MB)
              </Form.Text>
            </Form.Group>
          </div>
        </Card.Body>
      </Card>

      {/* Butonlar */}
      <div className="d-flex justify-content-end">
        <Button variant="secondary" className="me-2">
          Temizle
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          İlanı Yayınla
        </Button>
      </div>

      {/* Toast Mesajı */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
        <Toast
          bg={toastType === "success" ? "success" : "danger"}
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">
              {toastType === "success" ? "Başarılı" : "Hata"}
            </strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default YeniIlanEkle;