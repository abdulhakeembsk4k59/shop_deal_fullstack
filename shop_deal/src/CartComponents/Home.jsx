/* eslint-disable no-unused-vars */
// Import statements
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Slices/cartSlice';
import { useGetAllProductsQuery } from '../Slices/productsApi';
// import { createBrowserHistory } from 'history';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import { FaStar, FaRegStar } from 'react-icons/fa';
import Nav from './Navbar'



const Home = () => {
  const Navigate = useNavigate();
  const { items: products, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetAllProductsQuery();
  console.log(data)
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    // history.push('/cart');
    Navigate('/cart')
  };

  return (
    <div className="home-container">
      <Nav />
      {status === 'success' ? (
        <>
          <h2>New Arrivals</h2>
          <div className="products">
            {data &&
              data.products?.map((product) => (
                <div key={product.id} className="product">
                  <h3>{product.name}</h3>
                  <img src={product.photoUrl} alt={product.name} />
                  <div className="details">
                    <span><StarRating rating={product.rating} /></span>
                    <span className="price">₹{product.price}</span>
                  </div>
                  <span>{product.description}</span>

                  <button onClick={() => handleAddToCart(product) }>
                    Add To Cart
                  </button>
                </div>
              ))}
          </div>
        </>
      ) : status === 'pending' ? (
        <p>Loading...</p>
      ) : (
        <p>Unexpected error occurred...</p>
      )}
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

export default Home;
