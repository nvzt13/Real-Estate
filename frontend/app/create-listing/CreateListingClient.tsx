"use client";
import { useAppDispatch } from "@/lib/hooks";
import { addListing } from "@/lib/slice/listingSlice";
import { CarSpecs, HouseSpecs, LandSpecs, Listing } from "@/types/types";
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
  const dispatch = useAppDispatch();
  const [kategori, setKategori] = useState("Ev");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [showToast, setShowToast] = useState(false);

  const [formData, setFormData] = useState<Listing>({
    id: "",
    category: "ev",
    type: "Satılık",
    title: "",
    description: "",
    price: 0,
    specs: {} as any,
    location: "",
    imageMain: "",
    images: [],
    coordinates: [0, 0],
  });

  const handleKategoriChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setKategori(e.target.value);
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const collectSpecs = (): CarSpecs | HouseSpecs | LandSpecs => {
    if (kategori === "Ev") {
      return {
        rooms:
          (document.querySelector('[name="rooms"]') as HTMLInputElement)
            ?.value || "",
        area:
          (document.querySelector('[name="area"]') as HTMLInputElement)
            ?.value || "",
        floor:
          (document.querySelector('[name="floor"]') as HTMLInputElement)
            ?.value || "",
        age:
          (document.querySelector('[name="age"]') as HTMLInputElement)?.value ||
          "",
        heating: (
          document.querySelector('[name="heating"]') as HTMLSelectElement
        )?.value as HouseSpecs["heating"],
        parking: (
          document.querySelector('[name="parking"]') as HTMLSelectElement
        )?.value as HouseSpecs["parking"],
      };
    }
    if (kategori === "Arsa") {
      return {
        area:
          (document.querySelector('[name="area"]') as HTMLInputElement)
            ?.value || "",
        cephe:
          (document.querySelector('[name="cephe"]') as HTMLInputElement)
            ?.value || "",
        imarDurumu: (
          document.querySelector('[name="imarDurumu"]') as HTMLSelectElement
        )?.value as LandSpecs["imarDurumu"],
        altYapı:
          (document.querySelector('[name="altYapı"]') as HTMLInputElement)
            ?.value || "",
        tapuDurumu: (
          document.querySelector('[name="tapuDurumu"]') as HTMLSelectElement
        )?.value as LandSpecs["tapuDurumu"],
        durum: (document.querySelector('[name="durum"]') as HTMLSelectElement)
          ?.value as LandSpecs["durum"],
      };
    }
    if (kategori === "Araba") {
      return {
        brand:
          (document.querySelector('[name="brand"]') as HTMLInputElement)
            ?.value || "",
        model:
          (document.querySelector('[name="model"]') as HTMLInputElement)
            ?.value || "",
        year: parseInt(
          (document.querySelector('[name="year"]') as HTMLInputElement)
            ?.value || "0"
        ),
        fuel: (document.querySelector('[name="fuel"]') as HTMLSelectElement)
          ?.value as CarSpecs["fuel"],
        transmission: (
          document.querySelector('[name="transmission"]') as HTMLSelectElement
        )?.value as CarSpecs["transmission"],
        mileage:
          (document.querySelector('[name="mileage"]') as HTMLInputElement)
            ?.value || "",
        color:
          (document.querySelector('[name="color"]') as HTMLInputElement)
            ?.value || "",
      };
    }
    // Default fallback, but should not be reached
    return {} as CarSpecs | HouseSpecs | LandSpecs;
  };

const handleSubmit = async (e: { preventDefault: () => void }) => {
  e.preventDefault();

  const newSpecs = collectSpecs();

  const kategoriMap: Record<string, "ev" | "arsa" | "araba"> = {
    Ev: "ev",
    Arsa: "arsa",
    Araba: "araba",
  };

  const finalData: Listing = {
    ...formData,
    category: kategoriMap[kategori],
    specs: newSpecs,
  };

  const formDataObj = new FormData();

  // 🔁 Django'ya uygun key dönüşüm tablosu
  const djangoKeyMap: Record<string, string> = {
    imageMain: "imageMain",
    // Eğer başka key'lerin Django'da snake_case hali varsa onları da buraya eklersin
  };

  Object.entries(finalData).forEach(([key, value]) => {
    const finalKey = djangoKeyMap[key] || key;

    if (Array.isArray(value)) {
      formDataObj.append(finalKey, JSON.stringify(value));
    } else if (typeof value === "object" && value !== null) {
      formDataObj.append(finalKey, JSON.stringify(value));
    } else {
      formDataObj.append(finalKey, value.toString());
    }
  });

  // ✅ Test için konsola yazdırabilirsin:
  console.log("image_main:", formDataObj.get("image_main"));

  try {
    dispatch(addListing(formDataObj));
    showToastMessage("İlan başarıyla eklendi!", "success");
  } catch (error) {
    console.error("İlan ekleme hatası:", error);
    showToastMessage("İlan eklenirken hata oluştu.", "error");
  }
};



  const showToastMessage = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
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
            <Form.Select name="type" onChange={handleChange}>
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
              <Form.Control
                placeholder="Örn: Merkezi Konumda 3+1 Daire"
                name="title"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Açıklama *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                onChange={handleChange}
              />
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
                <Form.Control
                  type="number"
                  name="price"
                  onChange={handleChange}
                />
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
                    <Form.Control name="rooms" placeholder="Örn: 4+1" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Banyo Sayısı</Form.Label>
                    <Form.Control name="area" type="number" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Isıtma Tipi</Form.Label>
                    <Form.Select name="heating">
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
                    <Form.Control name="age" placeholder="Örn: 5 yıl" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Bulunduğu Kat</Form.Label>
                    <Form.Control name="floor" type="number" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Otopark</Form.Label>
                    <Form.Select name="parking">
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
                    <Form.Control name="area" type="number" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>İmar Durumu</Form.Label>
                    <Form.Select name="imarDurumu">
                      <option>Konut İmarlı</option>
                      <option>Ticari</option>
                      <option>Tarla</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tapu Durumu</Form.Label>
                    <Form.Select name="tapuDurumu">
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
                    <Form.Control name="cephe" type="number" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Altyapı</Form.Label>
                    <Form.Control
                      name="altYapı"
                      placeholder="Elektrik, Su, Yol Var"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Durum</Form.Label>
                    <Form.Select name="durum">
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
                    <Form.Control name="brand" placeholder="Örn: BMW" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Model</Form.Label>
                    <Form.Control name="model" placeholder="320i Sport Line" />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Model Yılı</Form.Label>
                    <Form.Control name="year" type="number" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Yakıt Tipi</Form.Label>
                    <Form.Select name="fuel">
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
                    <Form.Select name="transmission">
                      <option>Otomatik</option>
                      <option>Manuel</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Kilometre</Form.Label>
                    <Form.Control name="mileage" type="number" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Renk</Form.Label>
                    <Form.Control name="color" placeholder="Örn: Siyah" />
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
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Adres *</Form.Label>
                <Form.Control
                  placeholder="İstanbul/pendik"
                  name="location"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
               <Form.Group className="mb-3">
        <Form.Label>Koordinatlar (enlem, boylam)</Form.Label>
        <Form.Control
          name="coordinates"
          placeholder="38.4891, 43.3327"
          onChange={(e) => {
            const [latStr, lngStr] = e.target.value
              .split(",")
              .map((val) => val.trim());
            const lat = parseFloat(latStr);
            const lng = parseFloat(lngStr);
            if (!isNaN(lat) && !isNaN(lng)) {
              setFormData((prev) => ({
                ...prev,
                coordinates: [lat, lng],
              }));
            }
          }}
        />
      </Form.Group>
            </Col>
          </Row>
        </Card.Body>
        
      </Card>

      {/* Fotoğraflar */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Fotoğraflar</Card.Title>

          <Form.Group className="mb-3">
            <Form.Label>Ana Resim URL</Form.Label>
            <Form.Control
              name="imageMain"
              placeholder="https://example.com/image.jpg"
              value={formData.imageMain}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Alt Resimler</Form.Label>
            <Form.Control
              name="images"
              placeholder="https://url1.com,img2.jpg,img3.jpg"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  images: e.target.value.split(",").map((url) => url.trim()),
                }))
              }
            />
          </Form.Group>
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
      <ToastContainer
        position="top-end"
        className="p-3"
        style={{ zIndex: 9999 }}
      >
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
