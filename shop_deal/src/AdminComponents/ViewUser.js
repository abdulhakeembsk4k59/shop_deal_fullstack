/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the backend when the component mounts
    fetchAllUsers();
  }, []);

  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  };

  const fetchAllUsers = async () => {
    try {
      // Make a request to the backend to get all users
      const response = await axios.get('http://localhost:4000/get_all_users', CONFIG_OBJ);

      // Update the state with the fetched users
      setUsers(response.data.users);
    } catch (error) {
      // Handle errors, e.g., show an alert
      console.error('Error fetching users:', error.message);
    }
  };

  return (
    <div>
      <h2>View Users</h2>
      <div className="row">
        {users.map((user) => (
          <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={user._id}>
            {/* Display user information */}
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">Email: {user.email}</p>
                <p className="card-text">Phone: {user.phone}</p>
                <p className="card-text">Address: {user.address || 'Not provided'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewUser;