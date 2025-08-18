"use client";

import React, { useState } from "react";
import { Table, Button, Form, Badge } from "react-bootstrap";
import { FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { updateListing } from "@/lib/slice/listingSlice";
import { deleleteListing } from "@/lib/slice/listingSlice";
import { Listing } from "@/types/types";
const AdminPanel = () => {
  const listings = useAppSelector((state) => state.listings.listings);
  const dispatch = useAppDispatch();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedListing, setEditedListing] = useState<Listing | null>();

  const startEditing = (listing: Listing) => {
    if(listing?.id) setEditingId(listing.id);
    setEditedListing({ ...listing });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditedListing({
      title: "",
      type: "Kiralık",
      price: 0,
      location: "",
    });
  };

  const handleSave = () => {
    if (editedListing === null || editedListing === undefined) return;
    dispatch(updateListing(editedListing)); // Güncelleme işlemi için dispatch çağrısı
    // dispatch(updateListing(editedListing)) gibi bir işlem yapılabilir
    setEditingId(null);
  };

  const handleChange = <K extends keyof Listing>(field: K, value: Listing[K]) => {
  setEditedListing(prev => prev ? { ...prev, [field]: value } : prev);
};


  return (
    <div className="p-4">
      {/* Arama ve filtreleme kısmı aynı kalabilir */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>İlanlar</h3>
        <Button variant="primary" href="/create-listing">
          Yeni İlan Ekle
        </Button>
      </div>

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
                {editingId === listing.id ? (
                  <Form.Control
                    type="text"
                    value={editedListing?.title && editedListing?.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                  />
                ) : (
                  listing.title
                )}
              </td>
              <td>
                {editingId === listing.id ? (
                  <Form.Control
                    type="text"
                    value={editedListing?.location && editedListing.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                  />
                ) : (
                  listing.location
                )}
              </td>
              <td>
                {editingId === listing.id ? (
                  <Form.Select
                    value={editedListing?.type && editedListing.type}
                    onChange={(e) =>  handleChange("type", e.target.value as "Satılık" | "Kiralık")}
                  >
                    <option>Satılık</option>
                    <option>Kiralık</option>
                  </Form.Select>
                ) : (
                  <Badge
                    bg={listing.type === "Satılık" ? "success" : "warning"}
                    text={listing.type === "Satılık" ? undefined : "dark"}
                  >
                    {listing.type}
                  </Badge>
                )}
              </td>
              <td>
                {editingId === listing.id ? (
                  <Form.Control
                    type="number"
                    value={editedListing?.price ?? ""}
                    onChange={(e) => handleChange("price", Number(e.target.value))}
                  />
                ) : (
                  `${listing.price} ₺`
                )}
              </td>
              <td>
                {editingId === listing.id ? (
                  <>
                    <Button
                      variant="success"
                      size="sm"
                      className="me-2"
                      onClick={handleSave}
                    >
                      <FaSave />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={cancelEditing}
                    >
                      <FaTimes />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => startEditing(listing)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() =>
                        listing?.id && dispatch(deleleteListing(listing.id))
                      }
                    >
                      <FaTrash />
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminPanel;
