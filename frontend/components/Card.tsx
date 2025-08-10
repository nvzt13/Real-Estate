"use client";
import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { Listing } from "@/types/types";
import Link from "next/link";
import { useAppDispatch } from "@/lib/hooks";
import { toggleFavoriteAsync } from "@/lib/slice/userSlice";

interface GenericCardProps {
  data: Listing;
}

function GenericCard({ data }: GenericCardProps) {
  const dispatch = useAppDispatch();
  const getBackgroundColor = (category : "Ev" | "Araba" | "Arsa") => {
    switch (category) {
      case "Ev":
        return "success";
      case "Araba":
        return "danger";
      case "Arsa":
        return "warning";
      default:
        return "secondary";
    }
  };

  return (
    <Card
      style={{
        width: "373px",
        height: "386px",
        position: "relative",
        borderRadius: "1rem",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        <button onClick={() => dispatch(toggleFavoriteAsync(44))}>🤍</button>
      </div>

      <Card.Img
        variant="top"
        src={data?.images[0]}
        style={{ height: "200px", objectFit: "cover" }}
      />

      <Card.Body>
        <Card.Title style={{ fontSize: "1rem" }}>{data.title}</Card.Title>
        <Card.Text style={{ color: "gray", marginBottom: "0.5rem" }}>
          {data.location}
        </Card.Text>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{ fontWeight: "bold", color: "#5e1ee8", fontSize: "1.2rem" }}
          >
            ₺{data.price}
          </div>
          <Badge bg={getBackgroundColor(data.category)}>{data.category}</Badge>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Link
            href={`/listing-detail/${data.id}`}
            className="mt-3"
          >
            <Button variant="primary">Detayları Gör</Button>
          </Link>

          <Link
            href={`/map/${data.id}`}
            className="mt-3"
          >
            <Button variant="outline-primary">Haritada Göster</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default GenericCard;
