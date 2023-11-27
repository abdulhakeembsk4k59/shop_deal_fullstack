/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import ViewProducts from './ViewProducts';

const Dashboard = ({ onComponentSelect }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend when the component mounts
    fetchProductsByOwner();
  }, []);

  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  }

  const fetchProductsByOwner = async () => {
    try {
      // Make a request to the backend to get products added by the logged-in user
      const response = await axios.get('http://localhost:4000/get_products_by_owner', CONFIG_OBJ);
  
      // Update the state with the fetched products
      setProducts(response.data.products);
    } catch (error) {
      // Handle errors with SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error fetching products',
        text: error.response?.data?.error || 'Something went wrong!',
      });
    }
  };

  const handleItemClick = (itemName) => {
    onComponentSelect(itemName.replace(/\s/g, ''));
    console.log(itemName);
  };

  return (
    <div>
      <h2 className='mb-3'>Dashboard</h2>
      <div className='row'>
        <div className='col-sm-6 col-md-6 col-lg-3'>
          <div className='admindbcomponent1 mb-2 d-flex justify-content-center align-items-center text-white zoom-btn' onClick={() => handleItemClick('Manage Category')} style={{cursor:"pointer"}}>
            Manage category
          </div>
        </div>
        <div className='col-sm-6 col-md-6 col-lg-3'>
          <div className='admindbcomponent2 mb-2 box d-flex justify-content-center align-items-center text-white zoom-btn' onClick={() => handleItemClick('Manage Users')} style={{cursor:"pointer"}}>
            Manage Users
          </div>
        </div>
        <div className='col-sm-6 col-md-6 col-lg-3'>
          <div className='admindbcomponent3 mb-2 box d-flex justify-content-center align-items-center text-white zoom-btn' onClick={() => handleItemClick('Manage Products')} style={{cursor:"pointer"}}>
            Manage Products
          </div>
        </div>
        <div className='col-sm-6 col-md-6 col-lg-3'>
          <div className='admindbcomponent4 mb-2 box d-flex justify-content-center align-items-center text-white zoom-btn' onClick={() => handleItemClick('Manage Orders')} style={{cursor:"pointer"}}>
            Manage Orders
          </div>
        </div>
      </div>

      <ViewProducts />

      
      {/* <div className="container text-center mt-4" style={{ alignItems: "center",  marginLeft: "auto", marginRight:'auto'}}>
        <div className="row">
          {products.map((product, index) => (
            <div className="col-lg-3 col-md-4 mb-3 " key={index} >
              <AllProductsCard src={product.photoUrl} title={product.name} price={product.price} rating={product.rating} description ={product.description} />
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
