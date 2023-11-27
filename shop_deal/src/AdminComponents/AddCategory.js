import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddCategory = () => {

  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  }

  const [categoryData, setCategoryData] = useState({
    name: '',
    description: '',
  });

  const handleChange = (e) => {
    setCategoryData({
      ...categoryData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/add_category', categoryData, CONFIG_OBJ);

      // Handle success, you can customize the success message as needed
      Swal.fire({
        icon: 'success',
        title: 'Category Added',
        text: response.data.message,
      });
    } catch (error) {
      // Handle errors with SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error Adding Category',
        text: error.response?.data?.error || 'Something went wrong!',
      });
    }
  };

  return (
    <div>
      <h2 className='pt-5'>Add Category</h2>
      <form className='pt-3 ' onSubmit={handleSubmit} style={{maxWidth:'500px', marginLeft:'auto', marginRight:'auto'}}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Category Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={categoryData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Category Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={categoryData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-warning">
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
