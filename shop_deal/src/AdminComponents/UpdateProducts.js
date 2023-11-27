/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaStar, FaRegStar } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';

import { API_BASE_URL } from '../config';

const ProductCard = ({ _id, src, title, price, rating, description, stock, onUpdateProduct, onAddStock }) => {
  const [addStockModal, setAddStockModal] = useState(false);
  const [newStock, setNewStock] = useState(0);

  const handleAddStock = () => {
    setAddStockModal(true);
  };

  const handleCloseAddStockModal = () => {
    setAddStockModal(false);
    // Clear the input field on modal close
    setNewStock(0);
  };

  const handleUpdateStock = () => {
    onAddStock(_id, newStock);
    handleCloseAddStockModal();
  };

  // Function to truncate the description to two lines with '...'
  const truncateDescription = (text, maxLines = 2) => {
    const lines = text.split('\n').slice(0, maxLines);
    return lines.join('\n') + (lines.length < text.split('\n').length ? '...' : '');
  };

  return (
    <div className="pt-3 col-lg-3 col-md-4 col-sm-12 px-3 pb-3 card d-flex flex-column justify-content-between" style={{ width: '17rem', maxHeight:'900px', margin: '1rem' }}>
      <img src={src} className="card-img-top" style={{ height: '290px', width: '100%', objectFit: 'cover' }} alt={title} />
      <h5 className="card-title title mt-2">{title}</h5>
      <div className="card-text d-flex justify-content-between text">
        <span><StarRating rating={rating} /></span>
        <span className="font-weight-bold">₹{price}/-</span>
      </div>
      <div className="card-text desc mt-2">{truncateDescription(description)}</div>
      <div className="card-text stock mt-2">Stock Left: {stock}</div>
      <div className="mt-auto">
        <button
          className="rounded border-0 outline-0 cursor-pointer zoom-btn bg-success text-white"
          style={{ height: '48px', width: '100%', marginBottom: '8px' }}
          onClick={handleAddStock}
        >
          Add Stock
        </button>
        <button
          className="rounded border-0 outline-0 cursor-pointer zoom-btn bg-warning"
          style={{ height: '48px', width: '100%' }}
          onClick={() => onUpdateProduct(_id)}
        >
          Update Product
        </button>
      </div>

      {/* Add Stock Modal */}
      <Modal show={addStockModal} onHide={handleCloseAddStockModal} size="md" centered>
        <Modal.Header closeButton>
          <span className="fw-bold fs-5">Add Stock</span>
        </Modal.Header>
        <Modal.Body>
          <div className="form-floating mb-3">
            <input
              type="number"
              value={newStock}
              onChange={(e) => setNewStock(e.target.value)}
              className="form-control"
              id="floatingInput"
              placeholder="Enter Stock"
            />
            <label htmlFor="floatingInput">Stock</label>
          </div>
          <button onClick={handleUpdateStock} className="custom-btn custom-btn-pink float-end">
            <span className="fs-6 fw-600">Add Stock</span>
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
};


const StarRating = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <span key={index}>
      {index < (rating || 0) ? <FaStar color="#ffc107" /> : <FaRegStar />}
    </span>
  ));

  return <div className="star-rating">{stars}</div>;
};

const UpdateProducts = ({ onComponentSelect }) => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [image, setImage] = useState({ preview: '', data: '' });
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const CONFIG_OBJ = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };

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

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/get_products_by_owner', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });

      if (response.data && Array.isArray(response.data.products)) {
        setProducts(response.data.products);
      } else {
        throw new Error('Invalid data structure received from the server.');
      }
    } catch (error) {
      console.error('Error fetching products:', error.message);

      Swal.fire({
        icon: 'error',
        title: 'Error Fetching Products',
        text: error.message || 'Something went wrong!',
      });
    }
  };

  const handleUpdateProduct = (productId) => {
    setShowModal(true);
    setSelectedProductId(productId);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Clear the form fields on modal close
    setImage({ preview: '', data: '' });
    setTitle('');
    setDescription('');
    setPrice('');
  };

  const handleFileSelect = (event) => {
    const img = {
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0],
    };
    setImage(img);
  };

  const handleImgUpload = async () => {
    let formData = new FormData();
    formData.append('file', image.data);

    const response = await axios.post('http://localhost:4000/uploadFile', formData);
    return response;
  };

  const updateProduct = async () => {
    if (image.preview === '') {
      Swal.fire({
        icon: 'error',
        title: 'Product image is mandatory!',
      });
    } else if (title === '') {
      Swal.fire({
        icon: 'error',
        title: 'Product caption is mandatory!',
      });
    } else if (price === '') {
      Swal.fire({
        icon: 'error',
        title: 'price is mandatory!',
      });
    } else if (description === '') {
      Swal.fire({
        icon: 'error',
        title: 'description is mandatory!',
      });
    } else if (categories.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Categories are mandatory!',
      });
    } else {
      setLoading(true);
      const imgRes = await handleImgUpload();
      const request = {
        name: title,
        price: price,
        description: description,
        categories: selectedCategories,
        photoUrl: `${API_BASE_URL}/files/${imgRes.data.fileName}`,
      };
      // write api call to create post
      const postResponse = await axios.put(`${API_BASE_URL}/update_product/${selectedProductId}`, request, CONFIG_OBJ);
      setLoading(false);
      if (postResponse.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Product updated Successfully!.',
        });
        // You may want to fetch products again after updating a product
        fetchProducts();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops! Error while Updating the product!',
        });
      }
    }
  };

  const handleAddStock = async (productId, stock) => {
    try {
      const response = await axios.put(`http://localhost:4000/add_stock/${productId}`, { stock }, CONFIG_OBJ);

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Stock added successfully!.',
        });
        // You may want to fetch products again after updating stock
        fetchProducts();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops! Error while adding stock.',
        });
      }
    } catch (error) {
      console.error('Error adding stock:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops! Something went wrong.',
      });
    }
  };

  return (
    <div>
      <h2 className="mb-3">Update Products</h2>
      <div className="container-fluid mt-4 d-flex flex-wrap justify-content-center">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            _id={product._id}
            src={product.photoUrl}
            title={product.name}
            price={product.price}
            rating={product.rating}
            description={product.description}
            stock={product.stock}
            onUpdateProduct={handleUpdateProduct}
            onAddStock={handleAddStock}
          />
        ))}
      </div>

      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <span className="fw-bold fs-5">Update Product</span>
        </Modal.Header>
        <Modal.Body>
  <div className='row'>
    <div className='col-md-6 col-sm-12 mb-3'>
      <div className='upload-box'>
        <div className="dropZoneContainer">
          <input name="file" type="file" id="drop_zone" className="FileUpload" accept=".jpg,.png,.gif" onChange={handleFileSelect} />
          <div className="dropZoneOverlay">
            {image.preview && <img src={image.preview} width='150' height='150' alt="Preview" />}
            <i className="fa-solid fa-cloud-arrow-up fs-1"></i><br />Upload Photo From Computer
          </div>
        </div>
      </div>
    </div>
    <div className='col-md-6 col-sm-12 d-flex flex-column justify-content-between'>
      <div className='row'>
        <div className='col-sm-12'>
          <div className="form-floating mb-3">
            <input type="text" onChange={(ev) => setTitle(ev.target.value)} className="form-control" id="floatingInput" placeholder="Enter Title" />
            <label htmlFor="floatingInput">Title</label>
          </div>
        </div>
        <div className='col-sm-12'>
          <div className="form-floating mb-3">
            <input type="text" onChange={(ev) => setPrice(ev.target.value)} className="form-control" id="floatingInput" placeholder="Add Price" />
            <label htmlFor="floatingInput">₹ Price</label>
          </div>
        </div>
        <div className='col-sm-12 mb-3'>
          <div className="form-floating">
            <textarea onChange={(ev) => setDescription(ev.target.value)} className="form-control" placeholder="Add Description" id="floatingTextarea"></textarea>
            <label htmlFor="floatingTextarea">Description</label>
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
          <button onClick={() => updateProduct()} className="custom-btn custom-btn-pink float-end">
            <span className='fs-6 fw-600'>Update</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</Modal.Body>
      </Modal>
    </div>
  );
};

export default UpdateProducts;
