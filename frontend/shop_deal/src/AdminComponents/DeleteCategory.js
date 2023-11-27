import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const DeleteCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the backend when the component mounts
    fetchAllCategories();
  }, []);

  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  }

  const fetchAllCategories = async () => {
    try {
      // Make a request to the backend to get all categories
      const response = await axios.get('http://localhost:4000/get_all_categories');

      // Update the state with the fetched categories
      setCategories(response.data.categories);
    } catch (error) {
      // Handle errors, e.g., show an alert
      console.error('Error fetching categories:', error.message);
    }
  };

  const handleDeleteClick = async (categoryId) => {
    try {
      // Make a request to the backend to delete the selected category
      await axios.delete(`http://localhost:4000/delete_category/${categoryId}`, CONFIG_OBJ);

      // Remove the deleted category from the state
      const updatedCategories = categories.filter(category => category._id !== categoryId);
      setCategories(updatedCategories);

      // Show a success message using Swal
      Swal.fire({
        icon: 'success',
        title: 'Category deleted successfully',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      // Handle errors, e.g., show an alert
      Swal.fire({
        icon: 'error',
        title: 'Error deleting category',
        text: error.response?.data?.error || 'Something went wrong!',
      });
    }
  };

  return (
    <div>
      <h2>Delete Category</h2>

      <div className="row">
        {categories.map((category) => (
          <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={category._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{category.name}</h5>
                <p className="card-text">{category.description}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteClick(category._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeleteCategory;
