/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../config'
import './AddProducts.css'



const AddProducts = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState({ preview: '', data: '' });
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);



  const [loading, setLoading] = useState(false);

  const CONFIG_OBJ = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };

  const handleFileSelect = (event) => {
    const img = {
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0]
    }
    setImage(img);
  }

  const handleImgUpload = async () => {
    let formData = new FormData();
    formData.append('file', image.data);

    const response = axios.post(`${API_BASE_URL}/uploadFile`, formData)
    return response;
  }

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const fetchAllCategories = async () => {
    try {
      const response = await axios.get('http://localhost:4000/get_all_categories', CONFIG_OBJ);
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error.message);
    }
  };

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };


  const addProduct = async () => {
    if (image.preview === '') {
      // Handle error for missing image
      Swal.fire({
        icon: 'error',
        title: 'Post image is mandatory!',
      });
    } else if (name === '') {
      // Handle error for missing name
      Swal.fire({
        icon: 'error',
        title: 'Name of the product is mandatory!',
      });
    } else if (price === '') {
      // Handle error for missing price
      Swal.fire({
        icon: 'error',
        title: 'Price is mandatory!',
      });
    } else if (description === '') {
      // Handle error for missing description
      Swal.fire({
        icon: 'error',
        title: 'Description is mandatory!',
      });
    } else {
      setLoading(true);
  
      try {
        const imgRes = await handleImgUpload();
  
        // Assuming the API returns the product data after creation
        const postResponse = await axios.post(`${API_BASE_URL}/add_product`, {
          name: name,
          price: price,
          description: description,
          categories: selectedCategories,
          photoUrl: `${API_BASE_URL}/files/${imgRes.data.fileName}`,
        }, CONFIG_OBJ);
  
        setLoading(false);
  
        if (postResponse.status === 201) {
          // Show success message
          Swal.fire({
            icon: 'success',
            title: 'Product added successfully!',
          });
  
          // Reset the form
          setName('');
          setPrice('');
          setDescription('');
          setImage({ preview: '', data: '' });
          setSelectedCategories([]);
        } else {
          // Handle API error
          Swal.fire({
            icon: 'error',
            title: 'Some error occurred while creating the product',
          });
        }
      } catch (error) {
        // Handle other errors
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong!',
        });
      }
    }
  };
  

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Add Product</h2>

          <div className='row'>
            <div className='col-md-6 col-sm-12 mb-3'>
              <div className='upload-box'>
                <div className="dropZoneContainer">
                  <input name="file" type="file" id="drop_zone" className="FileUpload" accept=".jpg,.png,.gif" onChange={handleFileSelect} />
                  <div className="dropZoneOverlay">
                    {image.preview && <img src={image.preview} width='150' height='150' />}
                    <i class="fa-solid fa-cloud-arrow-up fs-1"></i><br />Upload Photo From Computer</div>
                </div>
              </div>
            </div>
            <div className='col-md-6 col-sm-12 d-flex flex-column justify-content-between'>
              <div className='row'>
              <div className='col-sm-12'>
                  <div className="form-floating mb-3">
                    <input type="text" onChange={(ev) => setName(ev.target.value)} className="form-control" id="floatingInput" placeholder="Enter Title" />
                    <label for="floatingInput">Title</label>
                  </div>
                </div>
                <div className='col-sm-12'>
                  <div className="form-floating mb-3">
                    <input type="text" onChange={(ev) => setPrice(ev.target.value)} className="form-control" id="floatingInput" placeholder="Add Price" />
                    <label for="floatingInput">₹ Price</label>
                  </div>
                </div>
                <div className='col-sm-12 mb-3'>
                  <div className="form-floating">
                    <textarea onChange={(ev) => setDescription(ev.target.value)} className="form-control" placeholder="Add Description" id="floatingTextarea"></textarea>
                    <label for="floatingTextarea">Description</label>
                  </div>
                </div>
                <div className='col-sm-12 mb-3'>
                  <label htmlFor="categories">Select Categories</label>
                  <div className="category-checkboxes">
                    {categories.map((category) => (
                      <div key={category._id} className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input checkbox-animated"
                          id={`category-${category._id}`}
                          value={category._id}
                          checked={selectedCategories.includes(category._id)}
                          onChange={() => handleCategoryChange(category._id)}
                        />
                        <label className="form-check-label" htmlFor={`category-${category._id}`}>
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-12'>
                  {loading ? <div className='col-md-12 mt-3 text-center'>
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div> : ''}
                  <button onClick={() => addProduct()} className="custom-btn custom-btn-pink float-end">
                    <span className='fs-6 fw-600'>Add</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
