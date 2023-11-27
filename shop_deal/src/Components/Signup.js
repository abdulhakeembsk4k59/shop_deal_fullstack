import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../config';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const register = (event) => {
    event.preventDefault();

    setLoading(true);
    const requestData = { name, phone, email,  password }; // Include address in the request data
    axios
      .post(`${API_BASE_URL}/signup`, requestData)
      .then((result) => {
        if (result.status === 201) {
          setLoading(false);
          Swal.fire({
            icon: 'success',
            title: 'User successfully registered',
          });
        }
        setName('');
        setPhone('');
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Some error occurred. Please try again later!',
        });
      });
  };

  return (
    <div>
      <h1 className='center mt-5' style={{ textAlign: 'center' }}>
        Signup Form
      </h1>
      {loading ? (
        <div className='col-md-12 mt-3 text-center'>
          <div className='spinner-border text-primary' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      ) : (
        ''
      )}
      <form
        className='px-5 max-width-700'
        style={{ maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}
        onSubmit={(e) => register(e)}
      >
        <div className='mb-3'>
          <label htmlFor='exampleInputText' className='form-label'>
            Name
          </label>
          <input
            type='text'
            className='form-control'
            id='exampleInputText'
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputText2' className='form-label'>
            Phone
          </label>
          <input
            type='text'
            className='form-control'
            id='exampleInputText2'
            value={phone}
            onChange={(ev) => setPhone(ev.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputEmail' className='form-label'>
            Email
          </label>
          <input
            type='email'
            className='form-control'
            id='exampleInputEmail'
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
        </div>
        
        <div className='mb-3'>
          <label htmlFor='passowrField' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            id='passowrField'
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </div>

        <button type='submit' className='form-control btn btn-warning mt-4'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
