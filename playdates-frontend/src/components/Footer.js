import React from 'react';

const Footer = () => {
  const contactContainerStyle = {
    backgroundColor: '#333333',
    padding: '30px',
    textAlign: 'center',
    width: '100%',
    marginTop: '200px',
  };

  const contactStyle = {
    color: 'white',
    fontSize: '40px',
  };

  const contactInfoStyle = {
    display: 'flex', // Arrange horizontally
    justifyContent: 'space-around', 
  };

  const h3info = {
    color: '#555555',
    marginTop: '40px',
    fontSize: '20px',
  };

  return (
    <footer style={footerStyle}>
      <div style={contactContainerStyle}>
        <h1 style={contactStyle}>Contact</h1>
      </div>
      <div style={contentContainerStyle}>
        <div style={contactInfoStyle}>
          <div>
            <h2>Email </h2>
            <h3 style={h3info}>nycplaydates@gmail.com</h3>
          </div>
          <div>
            <h2>Phone</h2>
            <h3 style={h3info}>Lily: 707.673.7328</h3>
            <h3 style={h3info}>Ella: 415.271.6620</h3>
          </div>
          <div>
            <h2>Address</h2>
            <h3 style={h3info}>265 East 78th Street New York, NY 10075</h3>
          </div>
        </div>
      </div>
    </footer>
  );
};

const footerStyle = {
  textAlign: 'center',
  width: '100%',
};

const contentContainerStyle = {
  backgroundColor: '#ADD8E6',
  padding: '50px',
};

export default Footer;
