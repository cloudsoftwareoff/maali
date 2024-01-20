import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppConfig from '../config';
const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    
    const token = sessionStorage.getItem('admin_token');

    // Make an HTTP request to get the list of users with headers
    axios.get(`${AppConfig.serverUrl}/u/all`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(response => {
        const userList = response.data.decryptedUsers;
        setUsers(userList);
      })
      .catch(error => {
        console.error('Error fetching user list:', error);
      });
  }, []); 

  return (
    <div>
      <h2>User List</h2>
      <table className="table table-striped">
        <thead  className="thead-dark">
          <tr>
            <th scope="col">CIN</th>
            <th scope="col">Nom</th>
            <th scope="col" >postCode</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.cardNumber}>
              <td scope="row">{user.cardNumber}</td>
              <td scope="row">{user.user_name}</td>
              <td scope="row">{user.postalcode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
