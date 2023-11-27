import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button, Modal, Form } from 'react-bootstrap';

const UpdateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [updatedCategory, setUpdatedCategory] = useState({
    name: '',
    description: '',
  });
  const [showModal, setShowModal] = useState(false);

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

  const handleUpdateClick = (categoryId) => {
    // Set the selected category ID and fetch its details
    setSelectedCategoryId(categoryId);
    fetchCategoryDetails(categoryId);
  };

  const fetchCategoryDetails = async (categoryId) => {
    try {
      // Make a request to the backend to get details of a specific category
      const response = await axios.get(`http://localhost:4000/get_category/${categoryId}`);

      // Update the state with the details of the selected category
      setUpdatedCategory(response.data.category);
      setShowModal(true); // Show the modal
    } catch (error) {
      // Handle errors, e.g., show an alert
      console.error('Error fetching category details:', error.message);
    }
  };

  const handleInputChange = (e) => {
    // Update the state when the input fields change
    setUpdatedCategory({
      ...updatedCategory,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateCategory = async () => {
    try {
      // Make a request to the backend to update the selected category
      await axios.put(`http://localhost:4000/update_category/${selectedCategoryId}`, updatedCategory, CONFIG_OBJ);

      // Update the state with the new category details
      const updatedCategories = categories.map(category => {
        if (category._id === selectedCategoryId) {
          return {
            ...category,
            name: updatedCategory.name,
            description: updatedCategory.description,
          };
        }
        return category;
      });

      setCategories(updatedCategories);

      // Show a success message using Swal
      Swal.fire({
        icon: 'success',
        title: 'Category updated successfully',
        showConfirmButton: false,
        timer: 1500,
      });

      setShowModal(false); // Close the modal
    } catch (error) {
      // Handle errors, e.g., show an alert
      Swal.fire({
        icon: 'error',
        title: 'Error updating category',
        text: error.response?.data?.error || 'Something went wrong!',
      });
    }
  };

  return (
    <div>
      <h2>Update Category</h2>

      <div className="row">
        {categories.map((category) => (
          <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={category._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{category.name}</h5>
                <p className="card-text">{category.description}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleUpdateClick(category._id)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for updating category */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form to update category details */}
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={updatedCategory.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Category Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={updatedCategory.description}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleUpdateCategory}>
            Update
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateCategory;
