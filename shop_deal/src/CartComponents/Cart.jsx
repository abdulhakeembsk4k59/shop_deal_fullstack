import { toast } from "react-toastify";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../Slices/cartSlice";

import { Link } from "react-router-dom";
import './Cart.css';
import Swal from 'sweetalert2';

import Header from "../Components/Header";

const Cart = () => {
  const Navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleAddToCart = (product) => {
    const existingIndex = cart.cartItems.findIndex(
      (item) => item._id === product._id
    );

    // Check if there is sufficient stock
    const currentStock = product.stock;

    if (existingIndex >= 0) {
      if (cart.cartItems[existingIndex].cartQuantity < currentStock) {
        dispatch(addToCart(product));
        toast.info("Increased product quantity", {
          position: "bottom-left",
        });
      } else {
        // Show error if no more stock left
        toast.error("There is no more stock left for this product", {
          position: "bottom-left",
        });
      }
    } else {
      // Check if there is sufficient stock before adding to the cart
      if (currentStock > 0) {
        dispatch(addToCart(product));
        toast.success("Product added to cart", {
          position: "bottom-left",
        });
      } else {
        toast.error("Product is out of stock", {
          position: "bottom-left",
        });
      }
    }
  };

  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const NavigateToLoginOrCheckout = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      Swal.fire({
        icon: 'error',
        title: 'Please login first to checkout..!',
      });
      Navigate('/login');
    } else {
      Navigate('/checkout');
    }
  };

  return (
    <>
      <Header />
      <div className="cart-container pt-0">
        <h2 className="mt-2">Shopping Cart</h2>
        {cart.cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is currently empty</p>
            <div className="start-shopping">
              <Link to="/home">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
                <span>Start Shopping</span>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="titles">
              <h3 className="product-title">Product</h3>
              <h3 className="price">Price</h3>
              <h3 className="quantity">Quantity</h3>
              <h3 className="total">Total</h3>
            </div>
            <div className="cart-items">
              {cart.cartItems &&
                cart.cartItems.map((cartItem) => (
                  <div className="cart-item" key={cartItem.id}>
                    <div className="cart-product">
                      <img src={cartItem.photoUrl} className="rounded" alt={cartItem.name} />
                      <div>
                        <h3>{cartItem.name}</h3>
                        <p>{cartItem.description}</p>
                        <button onClick={() => handleRemoveFromCart(cartItem)}>
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="cart-product-price">₹{cartItem.price}</div>
                    <div className="cart-product-quantity">
                      <button onClick={() => handleDecreaseCart(cartItem)}>
                        -
                      </button>
                      <div className="count">{cartItem.cartQuantity}</div>
                      <button onClick={() => handleAddToCart(cartItem)}>+</button>
                    </div>
                    <div className="cart-product-total-price">
                      ₹{cartItem.price * cartItem.cartQuantity}
                    </div>
                  </div>
                ))}
            </div>
            <div className="cart-summary">
              <button className="clear-btn" onClick={() => handleClearCart()}>
                Clear Cart
              </button>
              <div className="cart-checkout">
                <div className="subtotal">
                  <span>Subtotal</span>
                  <span className="amount">₹{cart.cartTotalAmount}</span>
                </div>
                <p>Taxes and shipping calculated at checkout</p>
                
                <button onClick={NavigateToLoginOrCheckout}>Check out</button>
                <div className="continue-shopping">
                  <Link to="/">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-arrow-left"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                      />
                    </svg>
                    <span>Continue Shopping</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
