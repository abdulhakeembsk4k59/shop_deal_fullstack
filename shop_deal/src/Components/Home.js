import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import HomeCover from './HomeCover';
import Header from './Header';
import Footer from './Footer';
import Slider from './Slider';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:4000/get_all_products");

            if (response.data && Array.isArray(response.data.products)) {
                setProducts(response.data.products);
            } else {
                throw new Error("Invalid data structure received from the server.");
            }
        } catch (error) {
            console.error("Error fetching products:", error.message);

            // Show SweetAlert error with corresponding response from the backend
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response ? error.response.data.error : 'An error occurred while fetching products.',
            });
        }
    };

    // const featuredProductsStyle = {
    //     marginTop: '30px',
    //     textAlign: 'center',
    //     fontFamily: "'Courier New', Courier, monospace",
    //     padding: '2px',
    //     fontWeight: 'bold',
    //     textShadow: '2px 2px 4px rgb(148, 96, 1)',
    //     color: '#000000',
    // };

    return (
        <div>
            <Header />
            <HomeCover />
            {/* <h1 className="h1" style={featuredProductsStyle}>
                Featured Products
            </h1> */}
            <Slider products={products} />
            <Footer />
        </div>
    );
};

export default Home;
