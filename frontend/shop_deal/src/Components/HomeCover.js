/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import BacgroundImg from '../Images/FreaturedProducts/1_.jpeg';
import './HomeCover.css';

function HomeCover() {
    return (
        <div className="cover" style={{ position: 'relative !important' }}>
            <img
                className="cover-image "
                src={BacgroundImg}
                style={{ height: '100%' }}
                alt="Cover Image"
            />
            <div className="cover-content">

                {/* title */}
                <h1 className="logo-text">
                    <div id="logo-container2">
                        <span className="logo-letter2">S</span>
                        <span className="logo-letter2">h</span>
                        <span className="logo-letter2">o</span>
                        <span className="logo-letter2">p</span>
                        <span className="logo-letter2">🛒</span>
                        <span className="logo-letter2">D</span>
                        <span className="logo-letter2">e</span>
                        <span className="logo-letter2">a</span>
                        <span className="logo-letter2">l</span>
                    </div>
                </h1>
                
                {/* Slogan */}
                <h1 className="slogan">Great Deal Comes with! Great Seller.</h1>

                {/* button */}
                <Link to="pages/regular_pages/product.html">
                    <button className="btn btn-warning p-2 border-light shop-now" style={{ fontSize: '22px' }}>
                        Shop now
                        <i className="fa-solid fa-bag-shopping" id="f-shop" style={{ fontSize: '22px' }}></i>
                    </button>
                </Link>
            </div>
            <h1 className="h1 bg-warning" style={{
                textAlign: 'center',
                fontFamily: 'Courier New, Courier, monospace',
                borderBottom: '6px dashed white',
                borderTop: '10px groove rgb(218, 169, 12)',
                padding: '10px',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgb(242, 167, 17)',
                color: '#ffffff',
            }}>
                Featured Products
            </h1>
        </div>
    );
}

export default HomeCover;
