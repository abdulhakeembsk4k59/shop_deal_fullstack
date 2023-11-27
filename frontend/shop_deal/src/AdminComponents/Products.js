// Products.js
import React from 'react';

const Products = ({ products }) => {
  return (
    <div className="products">
      {products.map((product) => (
        <div className="product" key={product.id}>
          <i className="fa fa-shopping-cart"></i>
          <img src={product.image} alt={product.name} />
          <div className="addbutton">
            <button className="addtocart">ADD TO CART</button>
          </div>
          <div className="subtitle">
            <div className="name">
              <h5>{product.name}</h5>
            </div>
            <div className="price">
              <h1>{product.price} $</h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
