/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
// import { FaStar, FaRegStar, FaShoppingCart } from 'react-icons/fa';
import Header from '../Components/Header';

import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Slices/cartSlice';

import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard'; // Import the ProductCard component

const Men = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const [menProducts, setMenProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    Navigate('/cart');
  };

  useEffect(() => {
    // Extract the last part of the URL path as a parameter
    const pathArray = window.location.pathname.split('/').filter(Boolean);
    const extractedCategory = pathArray[pathArray.length - 1];

    // Set the selected category state
    setSelectedCategory(extractedCategory);

    // Fetch Men's category_id from the backend
    fetchCategoryById(extractedCategory);
  }, []);

  if (selectedCategory === "men") {
    setSelectedCategory("All Product");
  }

  const fetchCategoryById = async (categoryName) => {
    try {
      let menCategoryId;

      // Fetch Men's category_id from the backend
      const menCategoryResponse = await axios.get('http://localhost:4000/get_category_by_name/men');
      if (menCategoryResponse.data && menCategoryResponse.data.category && menCategoryResponse.data.category._id) {
        menCategoryId = menCategoryResponse.data.category._id;
      } else {
        throw new Error('Invalid data structure received from the server.');
      }

      // If a parameter is present, fetch its category_id
      let paramCategoryId = menCategoryId;
      if (categoryName) {
        const paramCategoryResponse = await axios.get(`http://localhost:4000/get_category_by_name/${categoryName}`);
        if (paramCategoryResponse.data && paramCategoryResponse.data.category && paramCategoryResponse.data.category._id) {
          paramCategoryId = paramCategoryResponse.data.category._id;
        } else {
          throw new Error('Invalid data structure received from the server.');
        }
      }

      // Fetch Men's products based on both category IDs or just Men's category ID
      fetchMenProductsByCategories(menCategoryId, paramCategoryId);
    } catch (error) {
      console.error(`Error fetching ${selectedCategory} category:`, error.message);

      Swal.fire({
        icon: 'error',
        title: `Error Fetching ${selectedCategory} Category`,
        text: error.message || 'Something went wrong!',
      });
    }
  };

  const fetchMenProductsByCategories = async (categoryId1, categoryId2) => {
    try {
      const response = await axios.get(`http://localhost:4000/get_products_by_categories/${categoryId1}/${categoryId2}`);

      if (response.data && Array.isArray(response.data.products)) {
        setMenProducts(response.data.products);
      } else {
        throw new Error('Invalid data structure received from the server.');
      }
    } catch (error) {
      console.error('Error fetching Men\'s products:', error.message);

      Swal.fire({
        icon: 'error',
        title: 'Error Fetching Men\'s Products',
        text: error.message || 'Something went wrong!',
      });
    }
  };

  // const ProductCard = ({ src, title, price, rating, description }) => {


  //   return (
  //     <div className="px-3 pt-3 pb-3 card d-flex flex-column justify-content-between" style={{ width: '17rem', height: '530px', margin: '1rem' }}>
  //       <img src={src} className="card-img-top" style={{ height: '290px', width: '100%', objectFit: 'cover' }} alt={title} />
  //       <h5 className="card-title title mt-2">{title}</h5>
  //       <div className="card-text d-flex justify-content-between text">
  //         <span><StarRating rating={rating} /></span>
  //         <span className="font-weight-bold">₹{price}/-</span>
  //       </div>
  //       <div className="card-text desc mt-2">{description}</div>
  //       <div className="mt-auto">
  //         <button className="rounded border-0 outline-0 cursor-pointer zoom-btn bg-warning" style={{ height: '48px', width: '100%' }} >
  //           <FaShoppingCart className="mx-2 mb-1" />
  //           Add to Cart
  //         </button>
  //       </div>
  //     </div>
  //   );
  // };

  // const StarRating = ({ rating }) => {
  //   const stars = Array.from({ length: 5 }, (_, index) => (
  //     <span key={index}>
  //       {index < (rating || 0) ? <FaStar color="#ffc107" /> : <FaRegStar />}
  //     </span>
  //   ));

  //   return <div className="star-rating">{stars}</div>;
  // };

  return (
    <div>
      <Header />
      <h2 className="mb-3">Men {selectedCategory}'s</h2>
      <div className=" container-fluid mt-4 d-flex flex-wrap justify-content-center">
        {menProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

    </div>
  );
};

export default Men;
