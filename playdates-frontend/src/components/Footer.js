import React from 'react';
import '../index.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="contact-container">
        <h1 className="contact-title">CONTACT</h1>
      </div>
      <div className="content-container">
        <div className="contact-info">
          <div>
            <h2 className="info-title">Email</h2>
            <h3 className="info-text">nycplaydates@gmail.com</h3>
          </div>
          <div>
            <h2 className="info-title">Phone</h2>
            <h3 className="info-text"><span className="bold-text">Lily</span> 707.673.7328</h3>
            <h3 className="info-text"><span className="bold-text">Ella</span> 415.271.6620</h3>
          </div>
          <div>
            <h2 className="info-title">Address</h2>
            <h3 className="info-text">265 East 78th Street New York, NY 10075</h3>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
