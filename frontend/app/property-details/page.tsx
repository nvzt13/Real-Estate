'use client';
import React from 'react';

const PropertyDetailsPage = () => {
  return (
    <div>
      <div className="page-heading header-text">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <span className="breadcrumb"><a href="/">Home</a> / Single Property</span>
              <h3>Single Property</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="single-property section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="main-image">
                <img src="/single-property.jpg" alt="Single Property" />
              </div>
              <div className="main-content">
                <span className="category">Apartment</span>
                <h4>24 New Street Miami, OR 24560</h4>
                <p>
                  Get <strong>the best villa agency</strong> HTML CSS Bootstrap Template...
                  <br /><br />
                  When you look for free CSS templates...
                </p>
              </div>

              <div className="accordion" id="accordionExample">
                {['One', 'Two', 'Three'].map((id, index) => (
                  <div className="accordion-item" key={id}>
                    <h2 className="accordion-header" id={`heading${id}`}>
                      <button
                        className={`accordion-button${index !== 0 ? ' collapsed' : ''}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${id}`}
                        aria-expanded={index === 0}
                        aria-controls={`collapse${id}`}
                      >
                        {index === 0 && 'Best useful links ?'}
                        {index === 1 && 'How does this work ?'}
                        {index === 2 && 'Why is Villa the best ?'}
                      </button>
                    </h2>
                    <div
                      id={`collapse${id}`}
                      className={`accordion-collapse collapse${index === 0 ? ' show' : ''}`}
                      aria-labelledby={`heading${id}`}
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        Dolor <strong>almesit amet</strong>, consectetur adipiscing elit...
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="info-table">
                <ul>
                  <li>
                    <img src="/info-icon-01.png" alt="Total Flat Space Icon" style={{ maxWidth: '52px' }} />
                    <h4>450 m2<br /><span>Total Flat Space</span></h4>
                  </li>
                  <li>
                    <img src="/info-icon-02.png" alt="Contract Icon" style={{ maxWidth: '52px' }} />
                    <h4>Contract<br /><span>Contract Ready</span></h4>
                  </li>
                  <li>
                    <img src="/info-icon-03.png" alt="Payment Icon" style={{ maxWidth: '52px' }} />
                    <h4>Payment<br /><span>Payment Process</span></h4>
                  </li>
                  <li>
                    <img src="/info-icon-04.png" alt="Safety Icon" style={{ maxWidth: '52px' }} />
                    <h4>Safety<br /><span>24/7 Under Control</span></h4>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Best Deal Section */}
      <div className="section best-deal">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="section-heading">
                <h6>| Best Deal</h6>
                <h2>Find Your Best Deal Right Now!</h2>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="tabs-content">
                <div className="row">
                  <div className="nav-wrapper">
                    <ul className="nav nav-tabs" role="tablist">
                      {['Apartment', 'Villa House', 'Penthouse'].map((label, i) => {
                        const id = label.toLowerCase().replace(' ', '-');
                        return (
                          <li className="nav-item" key={id} role="presentation">
                            <button
                              className={`nav-link${i === 0 ? ' active' : ''}`}
                              id={`${id}-tab`}
                              data-bs-toggle="tab"
                              data-bs-target={`#${id}`}
                              type="button"
                              role="tab"
                              aria-controls={id}
                              aria-selected={i === 0}
                              tabIndex={i === 0 ? 0 : -1}  // burası önemli
                            >
                              {label}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="tab-content" id="myTabContent">
                    {['apartment', 'villa-house', 'penthouse'].map((id, i) => (
                      <div
                        key={id}
                        className={`tab-pane fade${i === 0 ? ' show active' : ''}`}
                        id={id}
                        role="tabpanel"
                        aria-labelledby={`${id}-tab`}
                      >
                        <div className="row">
                          <div className="col-lg-3">
                            <div className="info-table">
                              <ul>
                                <li>Total Flat Space <span>{i === 0 ? '540 m2' : i === 1 ? '250 m2' : '320 m2'}</span></li>
                                <li>Floor number <span>{i === 0 ? '3' : i === 1 ? '26th' : '34th'}</span></li>
                                <li>Number of rooms <span>{i === 0 ? '8' : i === 1 ? '5' : '6'}</span></li>
                                <li>Parking Available <span>Yes</span></li>
                                <li>Payment Process <span>Bank</span></li>
                              </ul>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <img src={`/deal-0${i + 1}.jpg`} alt={`Deal`} />
                          </div>
                          <div className="col-lg-3">
                            <h4>
                              {i === 0
                                ? 'All Info About Apartment'
                                : i === 1
                                ? 'Detail Info About New Villa'
                                : 'Extra Info About Penthouse'}
                            </h4>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                            </p>
                            <div className="icon-button">
                              <a href="#"><i className="fa fa-calendar"></i> Schedule a visit</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PropertyDetailsPage;
