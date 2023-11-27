import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import Header from './Header';
import Footer from './Footer';

const Profile = () => {
  const [user, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateData, setUpdateData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });

  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  }

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser) {
          console.error('User not found in local storage');
          return;
        }

        const response = await axios.get(`http://localhost:4000/get_customer/${storedUser._id}`, CONFIG_OBJ);
        setUser(response.data.customer);
        setUpdateData({
          name: response.data.customer.name,
          email: response.email,
          address: response.data.customer.address,
          phone: response.data.customer.phone,
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleUpdate = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser) {
        console.error('User not found in local storage');
        return;
      }

      const response = await axios.put(`http://localhost:4000/update_customer`, updateData, CONFIG_OBJ);
      console.log('Update successful:', response.data);
      setIsModalOpen(false);

      // Show success message using sweet alert
      Swal.fire({
        icon: 'success',
        title: 'Update Successful',
        text: 'Your profile has been updated successfully!',
      });
    } catch (error) {
      console.error('Error updating user details:', error);

      // Show error message using sweet alert
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'An error occurred while updating your profile. Please try again.',
      });
    }
  };


  return (
    <>
    <Header />
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2 className="mb-3">{user.name}</h2>
          <p className="mb-4">Email: {user.email}</p>
          <div className="border p-3 mb-4">
            <h3 className="mb-3">Address</h3>
            <p>{user.address || 'No address available'}</p>
          </div>
        </div>
      </div>

      <div className="row " style={{marginBottom:'300px'}}>
        <div className="col-md-6">
          <button className="btn btn-primary me-3" onClick={() => setIsModalOpen(true)}>Update Profile</button>
          <Link to="/order_history" className="btn btn-secondary me-3">Orders</Link>
          <Link to="/cart" className="btn btn-info">Cart</Link>
        </div>
      </div>
      

      {/* Update Profile Modal */}
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title ">Update Profile</h2>
            <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  value={updateData.name}
                  onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  value={updateData.email}
                  onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Address:</label>
                <input
                  type="text"
                  className="form-control"
                  value={updateData.address}
                  onChange={(e) => setUpdateData({ ...updateData, address: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone:</label>
                <input
                  type="text"
                  className="form-control"
                  value={updateData.phone}
                  onChange={(e) => setUpdateData({ ...updateData, phone: e.target.value })}
                />
              </div>
              <button type="button " className="btn btn-primary" onClick={handleUpdate}>
                Update
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
    <Footer />
    </>
  );
};

export default Profile;
