import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import StarRating from './StarRating';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Slices/cartSlice';
import { useGetAllProductsQuery } from '../Slices/productsApi';
import { useNavigate } from 'react-router-dom';
import '../CartComponents/Cart.css'

import { FaShoppingCart } from 'react-icons/fa';



const ViewProduct = () => {

    const Navigate = useNavigate();
    const { items: products, status } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const { data, error, isLoading } = useGetAllProductsQuery();
    console.log(data);


    const [product, setProduct] = useState(null);
    const { id } = useParams();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        Navigate('/cart');
    };

    useEffect(() => {
        // Fetch the product details from the backend
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/get_product/${id}`);
                setProduct(response.data.product);
            } catch (error) {
                // Handle the error and show a Swal alert
                Swal.fire({
                    icon: 'error',
                    title: 'Product Not Found',
                    text: 'The requested product could not be found.',
                });
            }
        };

        fetchProduct();
    }, [id]);

    return (
        <>
            <Header />
            <div className="container mt-4 pb-5">
                {product ? (
                    <div className="row">
                        {/* Product Image (Aligned to the Left) */}
                        <div className="col-md-4 pt-5">
                            <img src={product.photoUrl} alt={product.name} className="img-fluid" />
                        </div>

                        {/* Product Details (Aligned to the Right) */}
                        <div className="col-md-5 pt-5">
                            <h1>{product.name}</h1>
                            <p className="lead">Description: {product.description}</p>
                            <p>Price: ${product.price}</p>
                            {/* Add more details as needed */}

                            {/* Example: Rating */}
                            <div className="mb-3">
                                <strong><StarRating rating={product.rating} /></strong>
                            </div>

                            {/* Additional Details in an Unordered List */}
                            <h3>About This Item </h3>
                            <ul>
                                <li>Fabric - 100 % Polyester, Pre-Washed for an extremely soft finish and Guaranteed 0% Shrinkage Post Washing</li>
                                <li>Style - Enhance your look by wearing this Casual Stylish Men's shirt, Team it with a pair of tapered denims Or Solid Chinos and Loafers for a fun Smart Casual look</li>
                                <li>Fit Type: Regular</li>
                                <li>Closure Type: Button; Collar Style: Spread</li>
                                <li>Casual Shirt || Stylish Shirt || Printed Shirt</li>
                            </ul>

                            <h4 style={{color:'red'}}>Hurry up! There is <b>only {product.stock} item</b>  left..</h4>

                            {/* Add more details as needed */}
                        </div>

                        {/* Add to Cart Button (Aligned to the Left) */}
                        <div className="col-md-3 pt-5">
                            <button className='btn btn-warning mt-1 mb-3' onClick={() => handleAddToCart(product)}>
                                <span className="mb-3">
                                    <FaShoppingCart size={30} />
                                </span><span style={{ fontSize: '20px' }}>&nbsp;Add To Cart</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <h1>Loading...</h1>
                )}
            </div>
            <div className='pt-5'></div>
            <Footer />
        </>
    );
};

export default ViewProduct;
