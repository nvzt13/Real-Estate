import React from "react";
export default function VideoSection() {
    return (
      <>
        <div className="video section">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 offset-lg-4">
                <div className="section-heading text-center">
                  <h6>| Video View</h6>
                  <h2>Get Closer View & Different Feeling</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div className="video-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 offset-lg-1">
                <div className="video-frame">
                  <img src="/video-frame.jpg" alt="Video preview" />
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-play"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }