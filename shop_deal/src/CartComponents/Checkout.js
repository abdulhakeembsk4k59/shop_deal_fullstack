import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearCart } from '../Slices/cartSlice';

const Checkout = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const navigate = useNavigate();


    const user = JSON.parse(localStorage.getItem('user'));
    const [checkoutInput, setCheckoutInput] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
    });

    const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
    });

    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }

    var totalCartPrice = 0;

    const handleInput = (e) => {
        e.persist();
        setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' }); // Clear the error when the user starts typing
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };

        if (!checkoutInput.firstname.trim()) {
            newErrors.firstname = 'First name is required';
            valid = false;
        }
        if(!checkoutInput.lastname.trim()){
            newErrors.lastname = 'Last name is required';
            valid = false;
        }
        if(!checkoutInput.phone.trim()){
            newErrors.phone = 'Phone number is Mandatory';
            valid = false;
        }
        if(!checkoutInput.address.trim()){
            newErrors.address = 'address is Mandatory';
            valid = false;
        }
        if(!checkoutInput.city.trim()){
            newErrors.city = 'City is required';
            valid = false;
        }
        if(!checkoutInput.state.trim()){
            newErrors.state = 'State is required';
            valid = false;
        }
        if(!checkoutInput.zipcode.trim()){
            newErrors.zipcode = 'Zipcode is Mandatory';
            valid = false;
        }

        // Add similar blocks for other fields

        setErrors(newErrors);
        return valid;
    };

    const handlePlaceOrder = () => {
        if (validateForm()) {
          Swal.fire({
            title: 'Is Payment Done?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            icon: 'question',
          }).then((result) => {
            if (result.isConfirmed) {
              const orderData = {
                customerId: user._id,
                products: cart.cartItems.map(item => ({
                  product: item._id,
                  quantity: item.cartQuantity,
                })),
                amount: totalCartPrice,
                shipping_info: {
                  firstName: checkoutInput.firstname,
                  lastName: checkoutInput.lastname,
                  phno: checkoutInput.phone,
                  email: checkoutInput.email,
                  fullAddress: checkoutInput.address,
                  city: checkoutInput.city,
                  state: checkoutInput.state,
                  zipcode: checkoutInput.zipcode,
                },
              };
      
              axios
                .post('http://localhost:4000/add_order', orderData, CONFIG_OBJ)
                .then((response) => {
                  console.log('Order placed successfully:', response.data);
      
                  // Reduce stock for each product in the order
                  cart.cartItems.forEach(item => {
                    axios.put(`http://localhost:4000/add_stock/${item._id}`, {
                      stock: -item.cartQuantity,
                    }, CONFIG_OBJ)
                    .then((stockResponse) => {
                      console.log('Stock reduced successfully:', stockResponse.data);
                    })
                    .catch((stockError) => {
                      console.error('Error reducing stock:', stockError);
                    });
                  });
      
                  // Remove the ordered items from the cart
                  dispatch(clearCart()); // Assuming you have a clearCart action
      
                  navigate('/order_success');
                })
                .catch((error) => {
                  console.error('Error placing order:', error);
                  navigate('/order_failed');
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              navigate('/order_failed');
            }
          });
        }
      };
      

    if (user) {
        return (
            <div>
                <div className='py-4'>
                    <div className='container'>
                        <div className='row'>
                            <div className="col-md-7">
                                <div className="card">
                                    <div className="card-header">
                                        <h4>Shipping Information</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label> First Name</label>
                                                    <input
                                                        type="text"
                                                        name="firstname"
                                                        onChange={handleInput}
                                                        value={checkoutInput.firstname}
                                                        className="form-control"
                                                        required
                                                    />
                                                    <small className="text-danger">{errors.firstname}</small>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label> Last Name</label>
                                                    <input
                                                        type="text"
                                                        name="lastname"
                                                        onChange={handleInput}
                                                        value={checkoutInput.lastname}
                                                        className="form-control"
                                                        required
                                                    />
                                                    <small className="text-danger">{errors.lastname}</small>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label> Phone Number</label>
                                                    <input
                                                        type="number"
                                                        name="phone"
                                                        onChange={handleInput}
                                                        value={checkoutInput.phone}
                                                        className="form-control"
                                                    />
                                                    <small className="text-danger">{errors.phone}</small>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label> Email Address</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        onChange={handleInput}
                                                        value={checkoutInput.email}
                                                        className="form-control"
                                                    />
                                                    <small className="text-danger">{errors.email}</small>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-group mb-3">
                                                    <label> Full Address</label>
                                                    <textarea
                                                        rows="3"
                                                        name="address"
                                                        onChange={handleInput}
                                                        value={checkoutInput.address}
                                                        className="form-control"
                                                    ></textarea>
                                                    <small className="text-danger">{errors.address}</small>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="form-group mb-3">
                                                    <label>City</label>
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        onChange={handleInput}
                                                        value={checkoutInput.city}
                                                        className="form-control"
                                                    />
                                                    <small className="text-danger">{errors.city}</small>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="form-group mb-3">
                                                    <label>State</label>
                                                    <input
                                                        type="text"
                                                        name="state"
                                                        onChange={handleInput}
                                                        value={checkoutInput.state}
                                                        className="form-control"
                                                    />
                                                    <small className="text-danger">{errors.state}</small>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="form-group mb-3">
                                                    <label>Zip Code</label>
                                                    <input
                                                        type="text"
                                                        name="zipcode"
                                                        onChange={handleInput}
                                                        value={checkoutInput.zipcode}
                                                        className="form-control"
                                                    />
                                                    <small className="text-danger">{errors.zipcode}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group text-end">
                                            <button
                                                type="button"
                                                className="btn btn-primary mx-1"
                                                onClick={handlePlaceOrder}
                                            >
                                                Place Order
                                            </button>
                                            <button type="button" className="btn btn-primary mx-1">
                                                Pay by Razorpay
                                            </button>
                                            <button type="button" className="btn btn-warning mx-1">
                                                Pay Online
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th width="50%">Product</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.cartItems.map((item, idx) => {
                                            console.log(item);
                                            totalCartPrice += item.price * item.cartQuantity;
                                            return (
                                                <tr key={idx}>
                                                    <td>{item.name}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.cartQuantity}</td>
                                                    <td>{item.price * item.cartQuantity}</td>
                                                </tr>
                                            );
                                        })}
                                        <tr>
                                            <td colSpan="2" className="text-end fw-bold">
                                                Grand Total
                                            </td>
                                            <td colSpan="2" className="text-end fw-bold">
                                                {totalCartPrice}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Please login first to checkout..!',
        });
    }
};

export default Checkout;
