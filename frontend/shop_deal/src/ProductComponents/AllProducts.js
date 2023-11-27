// Home.js

/* eslint-disable no-unused-vars */
// Import statements
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Slices/cartSlice';
import { useGetAllProductsQuery } from '../Slices/productsApi';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard'; // Import the ProductCard component
import Header from '../Components/Header';
// import './Cart.css';
// import { FaStar, FaRegStar } from 'react-icons/fa';
// import Nav from './Navbar';

const AllProducts = () => {
  
  const Navigate = useNavigate();
  const { items: products, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetAllProductsQuery();
  console.log(data);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    Navigate('/cart');
  };

  return (
    <>
      <Header />

      <div className="home-container">
        {/* <Nav /> */}
        {status === 'success' ? (
          <>
            <h2>All Products</h2>
            <div className="products">
              {data &&
                data.products?.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
            </div>
          </>
        ) : status === 'pending' ? (
          <p>Loading...</p>
        ) : (
          <p>Unexpected error occurred...</p>
        )}
      </div>
    </>
  );
};



export default AllProducts;
