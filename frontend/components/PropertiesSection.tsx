"use client";
import React from "react";
import Link from 'next/link'

export default function PropertiesSection() {
  const properties = [
    {
      id: 1,
      image: ' /property-01.jpg',
      category: 'Luxury Villa',
      price: '$2.264.000',
      address: '18 New Street Miami, OR 97219',
      details: {
        bedrooms: 8,
        bathrooms: 8,
        area: '545m2',
        floor: 3,
        parking: '6 spots'
      }
    },
    {
      id: 2,
      image: ' /property-02.jpg',
      category: 'Luxury Villa',
      price: '$1.180.000',
      address: '54 Mid Street Florida, OR 27001',
      details: {
        bedrooms: 6,
        bathrooms: 5,
        area: '450m2',
        floor: 3,
        parking: '8 spots'
      }
    },
    {
      id: 3,
      image: ' /property-03.jpg',
      category: 'Luxury Villa',
      price: '$1.460.000',
      address: '26 Old Street Miami, OR 38540',
      details: {
        bedrooms: 5,
        bathrooms: 4,
        area: '225m2',
        floor: 3,
        parking: '10 spots'
      }
    },
    {
      id: 4,
      image: ' /property-04.jpg',
      category: 'Apartment',
      price: '$584.500',
      address: '12 New Street Miami, OR 12650',
      details: {
        bedrooms: 4,
        bathrooms: 3,
        area: '125m2',
        floor: '25th',
        parking: '2 cars'
      }
    },
    {
      id: 5,
      image: ' /property-05.jpg',
      category: 'Penthouse',
      price: '$925.600',
      address: '34 Beach Street Miami, OR 42680',
      details: {
        bedrooms: 4,
        bathrooms: 4,
        area: '180m2',
        floor: '38th',
        parking: '2 cars'
      }
    },
    {
      id: 6,
      image: ' /property-06.jpg',
      category: 'Modern Condo',
      price: '$450.000',
      address: '22 New Street Portland, OR 16540',
      details: {
        bedrooms: 3,
        bathrooms: 2,
        area: '165m2',
        floor: '26th',
        parking: '3 cars'
      }
    }
  ]

  // React.useEffect(() => {
  //   try{
  //     const response = fetch("http://127.0.0.1:8000/api/listings/1/")
  //     response.then(res => res.json()).then(data => {
  //       console.log(data);
  //     });

  //   }catch (error) {
  //     console.error("Error fetching property data:", error);
  //   }
  // }
  // , []);

  return (
    <div className="properties section">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 offset-lg-4">
            <div className="section-heading text-center">
              <h6>| Properties</h6>
              <h2>We Provide The Best Property You Like</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {properties.map((property) => (
            <div key={property.id} className="col-lg-4 col-md-6">
              <div className="item">
                <Link href={`/property-details/${property.id}`}>
                  <img src={property.image} alt={property.category} />
                </Link>
                <span className="category">{property.category}</span>
                <h6>{property.price}</h6>
                <h4>
                  <Link href={`/property-details/${property.id}`}>{property.address}</Link>
                </h4>
                <ul>
                  <li>Bedrooms: <span>{property.details.bedrooms}</span></li>
                  <li>Bathrooms: <span>{property.details.bathrooms}</span></li>
                  <li>Area: <span>{property.details.area}</span></li>
                  <li>Floor: <span>{property.details.floor}</span></li>
                  <li>Parking: <span>{property.details.parking}</span></li>
                </ul>
                <div className="main-button">
                  <Link href={`/property-details/${property.id}`}>Schedule a visit</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}