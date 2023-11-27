// TestSlider.js

import React, { useState, useEffect } from 'react';
import './Slider.css';
import { FaStar, FaRegStar, FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Slices/cartSlice';

import { useNavigate } from 'react-router-dom';


const Slider = (products) => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(4); // Default value
  console.log(products)
  const productsArray = products.products;
  console.log(productsArray)
  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? productsArray.length / cardsPerSlide - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === productsArray.length / cardsPerSlide - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    Navigate('/cart');
  };

  useEffect(() => {
    const updateCardsPerSlide = () => {
      // Adjust the number of cards per slide based on the screen width
      if (window.innerWidth >= 768 && window.innerWidth <= 991.98) {
        setCardsPerSlide(3);
      } else if (window.innerWidth <= 767.98) {
        setCardsPerSlide(1);
      } else {
        setCardsPerSlide(4); // Default for larger screens
      }
    };

    // Initial update
    updateCardsPerSlide();

    // Update when the window is resized
    window.addEventListener('resize', updateCardsPerSlide);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateCardsPerSlide);
    };
  }, []);

  
  return (
    <div className="slider-container  pb-5">
      <div className="slider" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {Array.from({ length: productsArray.length / cardsPerSlide }, (_, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'slider_active' : ''}`}
          >
            {productsArray.slice(index * cardsPerSlide, (index + 1) * cardsPerSlide).map((product) => (
              <div className="px-3  pb-3 slider_card d-flex flex-column justify-content-between" style={{ width: '17rem', height: '530px', margin: '1rem' }}>
              <img src={product.photoUrl} className="card-img-top" style={{ height: '290px', width: '100%', objectFit: 'cover' }} alt={product.name} />
              <h5 className="card-title title mt-2">{product.name}</h5>
              <div className="card-text d-flex justify-content-between text">
                <span><StarRating rating={product.rating} /></span>
                <span className="font-weight-bold">₹{product.price}/-</span>
              </div>
              <div className="card-text desc mt-2">{product.description}</div>
              <div className="mt-auto">
                <button onClick={() => handleAddToCart(product)} className="rounded border-0 outline-0 cursor-pointer zoom-btn bg-warning" style={{ height: '48px', width: '100%' }} >
                  <FaShoppingCart className="mx-2 mb-1" />
                  Add to Cart
                </button>
              </div>
            </div>
            ))}
          </div>
        ))}
      </div>

      <button className="arrow prev btn-warning bg-white p-2 px-3" style={{borderRadius:"35px"}} onClick={handlePrevSlide}>
        &lt;
      </button>
      <button className="arrow next btn-warning bg-white p-2 px-3" style={{borderRadius:"35px"}} onClick={handleNextSlide}>
        &gt;
      </button>

      <div className="carousel-indicators">
        {Array.from({ length: productsArray.length / cardsPerSlide }, (_, index) => (
          <div
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
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

export default Slider;
