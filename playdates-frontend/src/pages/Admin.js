import React, { useState, useEffect } from 'react';

export const Admin = () => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    // Fetch HTML content from the backend when the component mounts
    fetch('http://localhost:3000/admin')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network could not respond');
        }
        return response.text();
      })
      .then((html) => {
        console.log('Received HTML content', html);
        setHtmlContent(html);
      })
      .catch((error) => {
        console.error('Error fetching HTML content', error);
      });
  }, []); // Empty dependency array so this effect only runs once

  return (
    <div>
      {htmlContent ? (
        // Render the HTML content from the backend using dangerouslySetInnerHTML
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      ) : (
        <p>No clients have registered yet!</p>
      )}
    </div>
  ); 
}

export default Admin;
