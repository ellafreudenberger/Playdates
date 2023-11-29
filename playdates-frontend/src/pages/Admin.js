import React, { useState, useEffect } from 'react';

export const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    // Check if the user is authenticated
    fetch('http://localhost:3000/admin', {
      method: 'GET',
      credentials: 'include', // Include credentials (cookies) for cross-origin requests
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.authenticated) {
          // If authenticated, set the state and proceed to fetch HTML content
          setAuthenticated(true);

          // Fetch HTML content of the admin page
          fetch('http://localhost:3000/admin/content', {
            method: 'GET',
            credentials: 'include', // Include credentials (cookies) for cross-origin requests
          })
            .then((response) => response.text())
            .then((html) => {
              setHtmlContent(html);
            })
            .catch((error) => console.error('Error fetching HTML content', error));
        } else {
          setAuthenticated(false);
        }
      })
      .catch((error) => console.error('Error checking authentication', error));
  }, []);

  return (
    <div>
      {authenticated ? (
        // Render the HTML content from the backend using dangerouslySetInnerHTML
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      ) : (
        <p>No clients have registered yet!</p>
      )}
    </div>
  );
};

export default Admin;
