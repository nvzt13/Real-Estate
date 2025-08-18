"use client";
import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { Listing } from "@/types/types";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toggleFavoriteAsync } from "@/lib/slice/userSlice";

interface GenericCardProps {
  data: Listing;
}

function GenericCard({ data }: GenericCardProps) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.users.favorites);
  const getBackgroundColor = (category: "Ev" | "araba" | "Arsa") => {
    switch (category) {
      case "Ev":
        return "success";
      case "araba":
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
        <button
          className="rounded-5 p-1"
          onClick={() => data?.id && dispatch(toggleFavoriteAsync(data?.id))}
        >
          {favorites.some((item) => item.id === data.id) ? "❤️" : "🤍"}
        </button>
      </div>

      <Card.Img
        variant="top"
        src={
          data?.images && data.images.length > 0
            ? data.images[0]
            : "/placeholder.jpg"
        }
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
          <Badge
            bg={getBackgroundColor(data.category as "Ev" | "araba" | "Arsa")}
          >
            {data.category}
          </Badge>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Link href={`/listing-detail/${data.id}`} className="mt-3">
            <Button variant="primary">Detayları Gör</Button>
          </Link>

          <Link href={`/map/${data.id}`} className="mt-3">
            <Button variant="outline-primary">Haritada Göster</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default GenericCard;
