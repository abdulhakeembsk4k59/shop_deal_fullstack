import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-center text-white mb-0 border-top">
      <div className="container p-4 mb-0 border-bottom">
        <h1 className="font-monospace">Follow us On!</h1>
        <section className="mb-4">
          <a className="btn btn-outline-light btn-floating m-1" href="#!"><i className="fab fa-facebook-f"></i></a>
          <a className="btn btn-outline-light btn-floating m-1" href="#!"><i className="fab fa-twitter"></i></a>
          <a className="btn btn-outline-light btn-floating m-1" href="#!"><i className="fab fa-google"></i></a>
          <a className="btn btn-outline-light btn-floating m-1" href="#!"><i className="fab fa-instagram"></i></a>
          <a className="btn btn-outline-light btn-floating m-1" href="#!"><i className="fab fa-linkedin-in"></i></a>
          <a className="btn btn-outline-light btn-floating m-1" href="#!"><i className="fab fa-github"></i></a>
        </section>
        <section>
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-5 mb-md-5">
              <h2 className="font-monospace mb-2 p-0">Women</h2>
              <center><hr width="23%" className="m-0 mb-2" /></center>
              <ul className="list-unstyled mb-0">
                <li><a href="../../pages/women/w_allProducts.html" className="text-white">All Products</a></li>
                <li><a href="../../pages/women/dresses.html" className="text-white">Dresses</a></li>
                <li><a href="../../pages/women/pants.html" className="text-white">Pants</a></li>
                <li><a href="../../pages/women/skirts.html" className="text-white">Skirts</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-5 mb-md-5">
              <h2 className="font-monospace mb-2 p-0">Men</h2>
              <center><hr width="20%" className="m-0 mb-2" /></center>
              <ul className="list-unstyled mb-0">
                <li><a href="../../pages/men/m_allProducts.html" className="text-white">All Products</a></li>
                <li><a href="../../pages/men/shirts.html" className="text-white">Shirts</a></li>
                <li><a href="../../pages/men/pants.html" className="text-white">Pants</a></li>
                <li><a href="../../pages/men/hoodies.html" className="text-white">Hoodies</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-5 mb-md-0">
              <h2 className="font-monospace mb-2 p-0"><a href="../../pages/kid.html" style={{ color: 'white' }}>Kids</a></h2>
              <center><hr width="20%" className="m-0 mb-2" /></center>
            </div>
            <div className="col-lg-3 col-md-6 mb-5 mb-md-0">
              <h2 className="font-monospace mb-2 p-0">Links</h2>
              <center><hr width="20%" className="m-0 mb-2" /></center>
              <ul className="list-unstyled mb-0">
                <li><a href="../../index.html" className="text-white">Home</a></li>
                <li><a href="../../pages/regular_pages/login.html" className="text-white">Login</a></li>
                <li><a href="../../pages/regular_pages/aboutus.html" className="text-white">About us</a></li>
                <li><a href="#!" className="text-white">Contact us</a></li>
              </ul>
            </div>
          </div>
        </section>
      </div>
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        Copyright © Shop-Deal 2022-23
      </div>
    </footer>
  );
};

export default Footer;
