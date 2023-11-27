// ProductCard.js
import { useNavigate } from 'react-router-dom';
import React from 'react';
import StarRating from './StarRating';
const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();
  return (
    <div key={product.id} className="product" >
      <h3  style={{cursor:'pointer'}} onClick={() => navigate(`/view_Product/${product._id}`)}>{product.name}</h3>
      <img style={{cursor:'pointer'}} onClick={() => navigate(`/view_Product/${product._id}`)} src={product.photoUrl} alt={product.name} />
      <div className="details">
        <span><StarRating rating={product.rating} /></span>
        <span className="price">₹{product.price}</span>
      </div>
      <span style={{cursor:'pointer'}} onClick={() => navigate(`/view_Product/${product._id}`)}>{product.description}</span>
      <span style={{color:'red'}} >Hurry up! Only <b>{product.stock}</b> item left..</span>
      <button onClick={() => onAddToCart(product)}>
        Add To Cart
      </button>
    </div>
  );
};



export default ProductCard;
