import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const DeleteUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

   // Memoize the CONFIG_OBJ to avoid unnecessary re-renders
   const CONFIG_OBJ = useMemo(() => {
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
  }, []); // Empty dependency array to ensure it only runs once

  // Fetch all users from the backend on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/get_all_users', CONFIG_OBJ);
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [CONFIG_OBJ]); // Empty dependency array ensures the effect runs only once on mount

  // Function to handle user deletion
  const handleDeleteUser = async () => {
    try {
      // Make a request to the backend to delete the selected user
      await axios.delete(`http://localhost:4000/delete_user/${selectedUser}`, CONFIG_OBJ);

      // Show a success message using Swal
      Swal.fire({
        icon: 'success',
        title: 'User deleted successfully',
        showConfirmButton: false,
        timer: 1500,
      });

      // Clear the selected user after successful deletion
      setSelectedUser('');

      // Refetch the updated list of users
      const response = await axios.get('http://localhost:4000/get_all_users', CONFIG_OBJ);
      setUsers(response.data.users);
    } catch (error) {
      // Handle errors, e.g., show an alert
      Swal.fire({
        icon: 'error',
        title: 'Error deleting user',
        text: error.response?.data?.error || 'Something went wrong!',
      });
    }
  };

  return (
    <div>
      <h2>Delete User</h2>

      <form>
        <div className='form-group'>
          <label htmlFor='userSelect'>Select User to Delete</label>
          <select
            className='form-control'
            id='userSelect'
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value='' disabled>
              Select User
            </option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} - {user.email}
              </option>
            ))}
          </select>
        </div>
        <button type='button' className='btn btn-danger' onClick={handleDeleteUser}>
          Delete User
        </button>
      </form>
    </div>
  );
};

export default DeleteUser;
