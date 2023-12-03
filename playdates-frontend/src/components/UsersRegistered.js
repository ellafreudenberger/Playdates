import React, { useState, useEffect } from 'react';
import "../index.css";

const Users = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/admin/users');
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Error fetching user data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="clientsContainer">
        <h1 className="clientsHeader">Clients</h1>
        <table className="clientsTable"style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>First Name</th>
              <th style={tableHeaderStyle}>Last Name</th>
              <th style={tableHeaderStyle}>Username</th>
              <th style={tableHeaderStyle}>Dog Name</th>
              <th style={tableHeaderStyle}>Dog Age</th>
              <th style={tableHeaderStyle}>Breed</th>
              <th style={tableHeaderStyle}>Behavior</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user._id} style={tableRowStyle}>
                <td style={tableCellStyle}>{user.first_name}</td>
                <td style={tableCellStyle}>{user.last_name}</td>
                <td style={tableCellStyle}>{user.username}</td>
                <td style={tableCellStyle}>{user.dog_name}</td>
                <td style={tableCellStyle}>{user.dog_age}</td>
                <td style={tableCellStyle}>{user.breed}</td>
                <td style={tableCellStyle}>{user.behavior}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const tableHeaderStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
};

const tableRowStyle = {
  border: '1px solid #ddd',
};

const tableCellStyle = {
  border: '1px solid #ddd',
  padding: '8px',
};

export default Users;
