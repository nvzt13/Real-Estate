import GenericCard from "@/components/Card";
import { Container, Row, Col } from "react-bootstrap";

const items = [
  {
    id: 1,
    title: 'Modern Villa in Beşiktaş',
    location: 'Beşiktaş, İstanbul',
    price: 2500000,
    label: 'Öne Çıkan',
    type: 'Ev',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FyfGVufDB8fDB8fHww',
  },
  {
    id: 2,
    title: 'BMW 5.20i M Sport',
    location: 'Ataşehir, İstanbul',
    price: 1750000,
    label: 'Öne Çıkan',
    type: 'Araba',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2V8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 3,
    title: 'Denize Sıfır Arsa',
    location: 'Bodrum, Muğla',
    price: 3500000,
    label: '',
    type: 'Arsa',
    image: 'https://media.istockphoto.com/id/1437629749/photo/land-plot-in-aerial-view-in-chiang-mai-of-thailand.webp?a=1&b=1&s=612x612&w=0&k=20&c=oyTH8AJAu2ZGZHYzGbc9pomMTChUTu5dJQf3KBZBZIo=',
  },
    {
    id: 4,
    title: 'Modern Villa in Beşiktaş',
    location: 'Beşiktaş, İstanbul',
    price: 2500000,
    label: 'Öne Çıkan',
    type: 'Ev',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FyfGVufDB8fDB8fHww',
  },
  {
    id: 5,
    title: 'BMW 5.20i M Sport',
    location: 'Ataşehir, İstanbul',
    price: 1750000,
    label: 'Öne Çıkan',
    type: 'Araba',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2V8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 6,
    title: 'Denize Sıfır Arsa',
    location: 'Bodrum, Muğla',
    price: 3500000,
    label: '',
    type: 'Arsa',
    image: 'https://media.istockphoto.com/id/1437629749/photo/land-plot-in-aerial-view-in-chiang-mai-of-thailand.webp?a=1&b=1&s=612x612&w=0&k=20&c=oyTH8AJAu2ZGZHYzGbc9pomMTChUTu5dJQf3KBZBZIo=',
  },
];

export default function Home() {
  return (
    <div className="home container">
      <Container className="mt-5">
        <Row className="g-4 justify-content-center align-items-center d-flex justify-content-center">
          {items.map((item) => (
            <Col className="d-flex align-items-center justify-content-center" key={item.id} md={4}>
              <GenericCard data={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
