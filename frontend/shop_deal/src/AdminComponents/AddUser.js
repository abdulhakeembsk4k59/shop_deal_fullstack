import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddUser = () => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  }

  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddUser = async () => {
    try {
      setLoading(true);

      // Make a request to the backend to add a new user
      await axios.post('http://localhost:4000/signup', newUser, CONFIG_OBJ);

      // Show a success message using Swal
      Swal.fire({
        icon: 'success',
        title: 'User added successfully',
        showConfirmButton: false,
        timer: 1500,
      });

      // Clear the form after successful addition
      setNewUser({
        name: '',
        email: '',
        phone: '',
        password: '',
      });
    } catch (error) {
      // Handle errors, e.g., show an alert
      Swal.fire({
        icon: 'error',
        title: 'Error adding user',
        text: error.response?.data?.error || 'Something went wrong!',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add User</h2>

      {/* Display loading spinner when loading is true */}
      {loading && <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>}

      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={newUser.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleAddUser}>
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
