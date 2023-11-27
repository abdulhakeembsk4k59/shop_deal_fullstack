/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import { FaStar, FaRegStar } from 'react-icons/fa';


const ProductCard = ({ _id, src, title, price, rating, description, onDeleteProduct }) => {
  return (
    <div className="px-3 pb-3 card d-flex flex-column justify-content-between" style={{ width: '17rem', height: '530px', margin: '1rem' }}>
      <img src={src} className="card-img-top" style={{ height: '290px', width: '100%', objectFit: 'cover' }} alt={title} />
      <h5 className="card-title title mt-2">{title}</h5>
      <div className="card-text d-flex justify-content-between text">
        <span><StarRating rating={rating} /></span>
        <span className="font-weight-bold">₹{price}/-</span>
      </div>
      <div className="card-text desc mt-2">{description}</div>
      <div className="mt-auto">
        <button
          className="rounded border-0 outline-0 cursor-pointer zoom-btn bg-danger"
          style={{ height: '48px', width: '100%' }}
          onClick={() => onDeleteProduct(_id)}
        >
          Delete Product
        </button>
      </div>
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

const DeleteProducts = ({ onComponentSelect }) => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

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

  const handleDeleteProduct = (productId) => {
    setSelectedProductId(productId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = async () => {
    try {
      // Call the backend API to delete the product
      await axios.delete(`http://localhost:4000/delete_product/${selectedProductId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });

      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Product Deleted Successfully!',
        text: `Product with ID ${selectedProductId} has been deleted.`,
      });

      // Fetch updated products after deletion
      fetchProducts();

      // Close the modal after deletion
      handleCloseModal();
    } catch (error) {
      console.error('Error deleting product:', error.message);

      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'Error Deleting Product',
        text: error.message || 'Something went wrong!',
      });
    }
  };

  return (
    <div>
      <h2 className="mb-3">Delete Products</h2>
      <div className="container mt-4 d-flex flex-wrap justify-content-center">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            _id={product._id}
            src={product.photoUrl}
            title={product.name}
            price={product.price}
            description={product.description}
            onDeleteProduct={handleDeleteProduct}
          />
        ))}
      </div>

      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <span className="fw-bold fs-5">Delete Product</span>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this product?</p>
          <div className="d-flex justify-content-end">
            <button className="btn btn-secondary me-2" onClick={handleCloseModal}>
              No
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Yes
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DeleteProducts;
