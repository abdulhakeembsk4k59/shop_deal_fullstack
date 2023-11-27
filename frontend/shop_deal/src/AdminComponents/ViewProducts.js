import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaStar, FaRegStar } from 'react-icons/fa';


const ProductCard = ({ src, title, price, rating, description }) => {
  return (
    <div className="px-3 shadow pb-3 card d-flex flex-column justify-content-between" style={{ width: '17rem', height: '530px', margin: '1rem' }}>
      <img src={src} className="card-img-top mt-3 " style={{ height: '290px', width: '100%', objectFit: 'cover' }} alt={title} />
      <h5 className="card-title title mt-2">{title}</h5>
      <div className="card-text d-flex justify-content-between text">
        <span><StarRating rating={rating} /></span>
        <span className="font-weight-bold">₹{price}/-</span>
      </div>
      <div className="card-text desc mt-2">{description}</div>
      <div className="mt-auto">
        <button className="rounded border-0 outline-0 cursor-pointer zoom-btn bg-warning" style={{ height: '48px', width: '100%' }}>View Product</button>
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

const ViewProducts = ({ onComponentSelect }) => {
  const [products, setProducts] = useState([]);

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

  return (
    <div>
      <h2 className="mb-3">All Products</h2>
      <div className=" container-fluid mt-4 d-flex flex-wrap justify-content-center">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            src={product.photoUrl}
            title={product.name}
            price={product.price}
            rating={product.rating}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ViewProducts;
