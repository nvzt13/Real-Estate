'use client';
import React from 'react';

const PropertiesPage = () => {
  return (
    <div>
      <div className="page-heading header-text">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <span className="breadcrumb">
                <a href="#">Home</a> / Properties
              </span>
              <h3>Properties</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="section properties">
        <div className="container">
          <ul className="properties-filter">
            <li>
              <a className="is_active" href="#!" data-filter="*">
                Show All
              </a>
            </li>
            <li>
              <a href="#!" data-filter=".adv">
                Apartment
              </a>
            </li>
            <li>
              <a href="#!" data-filter=".str">
                Villa House
              </a>
            </li>
            <li>
              <a href="#!" data-filter=".rac">
                Penthouse
              </a>
            </li>
          </ul>

          <div className="row properties-box">
            {/* Tekil property örneği - Bunu componentleştirebilirsin */}
            {[
              {
                img: '/property-01.jpg',
                price: '$2.264.000',
                title: '18 Old Street Miami, OR 97219',
                category: 'Luxury Villa',
                details: ['8', '8', '545m2', '3', '6 spots'],
              },
              {
                img: '/property-02.jpg',
                price: '$1.180.000',
                title: '54 New Street Florida, OR 27001',
                category: 'Luxury Villa',
                details: ['6', '5', '450m2', '3', '8 spots'],
              },
              {
                img: '/property-03.jpg',
                price: '$1.460.000',
                title: '26 Mid Street Portland, OR 38540',
                category: 'Luxury Villa',
                details: ['5', '4', '225m2', '3', '10 spots'],
              },
              // diğer 6 property'yi aynı şekilde ekleyebilirsin
            ].map((p, i) => (
              <div key={i} className="col-lg-4 col-md-6 align-self-center mb-30 properties-items">
                <div className="item">
                  <a href="/property-details">
                    <img src={p.img} alt="" />
                  </a>
                  <span className="category">{p.category}</span>
                  <h6>{p.price}</h6>
                  <h4>
                    <a href="/property-details">{p.title}</a>
                  </h4>
                  <ul>
                    <li>Bedrooms: <span>{p.details[0]}</span></li>
                    <li>Bathrooms: <span>{p.details[1]}</span></li>
                    <li>Area: <span>{p.details[2]}</span></li>
                    <li>Floor: <span>{p.details[3]}</span></li>
                    <li>Parking: <span>{p.details[4]}</span></li>
                  </ul>
                  <div className="main-button">
                    <a href="/property-details">Schedule a visit</a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row">
            <div className="col-lg-12">
              <ul className="pagination">
                <li><a href="#">1</a></li>
                <li><a className="is_active" href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">{'>>'}</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;
