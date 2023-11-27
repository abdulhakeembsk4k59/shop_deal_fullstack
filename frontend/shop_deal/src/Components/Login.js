// Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../config';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const requestData = { email, password };

    axios
      .post(`${API_BASE_URL}/login`, requestData)
      .then((result) => {
        if (result.status === 200) {
          setLoading(false);
          const { token, user } = result.data.result;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));

          dispatch({ type: 'LOGIN_SUCCESS', payload: user });

          if (user.isAdmin) {
            Swal.fire({
              icon: 'success',
              title: 'Admin Logged in Successfully',
            }).then(() => {
              navigate('/admin_dashboard');
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: 'User Logged in Successfully!',
            }).then(() => {
              navigate('/myprofile');
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(error.response.data.error);
      });
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <div className="text-center">
        <h4 className="mb-4">Log In</h4>

        {/* Loading Spinner */}
        {loading && <LoadingSpinner />}

        {/* Error Message */}
        {error && <ErrorMessage message={error} />}

        <form onSubmit={(e) => login(e)}>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              className="form-control"
              placeholder="Enter your email address"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              className="form-control"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-warning w-100">
            Log In
          </button>
        </form>

        <div className="mt-4">
          <hr />
          <h5>OR</h5>
          <hr />
        </div>

        <div>
          <button className="btn btn-light">
            <span className="text-muted fs-6">Don't have an account?</span>
            <Link to="/signup" className="ms-1 text-info fw-bold">
              Sign Up
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
