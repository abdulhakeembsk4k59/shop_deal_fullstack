import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home'
import Login from './Components/Login'
import Signup from './Components/Signup'
import AdminSignup from './Components/AdminSignup'
import AdminDashboard from './AdminComponents/AdminDashboard';
import AllProducts from './ProductComponents/AllProducts';

import Men from './ProductComponents/Men'
import Women from './ProductComponents/Women';
import Kids from './ProductComponents/Kids';


import Cart from './CartComponents/Cart';
import CartHome from './CartComponents/Home'
import Checkout from './CartComponents/Checkout';
import ViewProduct from './ProductComponents/ViewProduct';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import OrderScreen from './Components/OrderScreen';
import OrderFailed from './Components/OrderFailed';
import OrderSuccess from './Components/OrderSuccess';
import OrderHistory from './Components/OrderHistory';
import Profile from './Components/Profile';

function App() {
  return (
    <div className='app-bg'>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/admin_signup" element={<AdminSignup />} />
          <Route exact path="/admin_dashboard" element={<AdminDashboard />} />
          <Route exact path="/all_products" element={<AllProducts />} />
          {/* Add the following route for category products */}
          <Route path="/men" element={<Men />} />
          <Route path="/men/:category" element={<Men />} />

          <Route path="/women" element={<Women />} />
          <Route path="/women/:category" element={<Women />} />

          <Route path="/kids" element={<Kids />} />
          <Route path="/kids/:category" element={<Kids />} />


          {/* Cart Route */}
          <Route path="/cart" element={<Cart />} />
          <Route exact path="/home" element={<CartHome />}></Route>


          <Route exact path="/checkout" element={<Checkout />}></Route>

          
          <Route exact path="/view_product/:id" element={<ViewProduct />}></Route>
          <Route exact path="/orders/:id" element={<OrderScreen />}></Route>
          <Route exact path="/order_failed" element={<OrderFailed />}></Route>
          <Route exact path="/order_success" element={<OrderSuccess />}></Route>
          <Route exact path="/order_history" element={<OrderHistory />}></Route>
          <Route exact path="/myprofile" element={<Profile />}></Route>

        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
