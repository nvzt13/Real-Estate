'use client'

import React from 'react'
import { Table, Button, Form, Row, Col, Badge, InputGroup } from 'react-bootstrap'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'

const AdminPanel = () => {
  const listings = useAppSelector((state) => state.listings.listings)
  const dispatch = useAppDispatch()

  const handleDelete = (id: string) => {
    // API call veya Redux dispatch
    console.log("Silinecek ID:", id)
  }

  const handleEdit = (id: string) => {
    // Edit yönlendirmesi veya modal
    console.log("Düzenlenecek ID:", id)
  }

  const getBadge = (status: string) => {
    switch (status) {
      case 'Aktif':
        return <Badge bg="success">Aktif</Badge>
      case 'Beklemede':
        return <Badge bg="warning" text="dark">Beklemede</Badge>
      case 'Pasif':
        return <Badge bg="secondary">Pasif</Badge>
      default:
        return null
    }
  }

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>İlanlar</h3>
        <Button variant="primary" href='/create-listing'>Yeni İlan Ekle</Button>
      </div>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Control type="text" placeholder="İlan ara..." />
        </Col>
        <Col md={3}>
          <Form.Select>
            <option>Tüm Tipler</option>
            <option>Satılık</option>
            <option>Kiralık</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select>
            <option>Tüm Durumlar</option>
            <option>Aktif</option>
            <option>Beklemede</option>
            <option>Pasif</option>
          </Form.Select>
        </Col>
      </Row>

      <Table responsive bordered hover>
        <thead>
          <tr>
            <th>İlan Başlığı</th>
            <th>Konum</th>
            <th>Tip</th>
            <th>Fiyat</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((listing) => (
            <tr key={listing.id}>
              <td>
                {listing.title}
              </td>
              <td>{listing.location}</td>
              <td>
                <Badge bg={listing.type === 'Satılık' ? 'success' : 'warning'} text={listing.type === 'Satılık' ? undefined : 'dark'}>
                  {listing.type}
                </Badge>
              </td>
              <td>{listing.price} ₺</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(listing.id)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(listing.id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center">
        <span>Toplam {listings.length} ilan</span>
        <div>
          <Button variant="light" size="sm" className="me-2">Önceki</Button>
          <Button variant="primary" size="sm">1</Button>
          <Button variant="light" size="sm" className="ms-2">Sonraki</Button>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
