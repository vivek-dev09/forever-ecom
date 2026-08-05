import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");

  const { token, setToken, navigate, backendurl } = useContext(ShopContext)

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {

      if (currentState === 'Sign Up') {


        const response = await axios.post(
          backendurl + "/api/user/register",
          { name, email, password }
        );


        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          navigate('/');
        } else {
          toast.error(response.data.message);
        }

      } else {

        const response = await axios.post(
          backendurl + '/api/user/login',
          { email, password }
        );
        console.log(response.data);

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          navigate('/');
        } else {
          toast.error(response.data.message);
        }
      }

    } catch (error) {

      console.log("ERROR OBJECT:", error);
      console.log("ERROR RESPONSE:", error.response);
      console.log("ERROR DATA:", error.response?.data);

      toast.error(
        error.response?.data?.message || error.message
      );
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token,navigate])

  return (
    <form onSubmit={onSubmitHandler}

      style={{
        padding: '0 70px',
        marginTop: '56px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}
      className='flex flex-col items-center w-[90%] sm:max-w-96 mt-14 gap-4 text-gray-700 border p-8 rounded'
    >
      <div
        style={{
          gap: '8px',
          marginBottom: '8px',
          marginTop: '40px'
        }}
        className='inline-flex items-center gap-2 mb-2 mt-10'
      >
        <p className='text-3xl prata-regular'>{currentState}</p>

        <hr
          style={{
            width: '32px',
            height: '1.5px'
          }}
          className='w-8 border-none bg-gray-700 h-[1.5px]'
        />
      </div>

      {currentState === "Login" ? "" : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder='Enter Your Name'
          style={{
            paddingLeft: '16px',
            paddingRight: '16px',
            paddingTop: '12px',
            paddingBottom: '12px'
          }}
          className='w-full border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-400'
        />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        placeholder='Email'
        style={{
          paddingLeft: '16px',
          paddingRight: '16px',
          paddingTop: '12px',
          paddingBottom: '12px'
        }}
        className='w-full border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-400'
      />

      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder='Password'
        style={{
          paddingLeft: '16px',
          paddingRight: '16px',
          paddingTop: '12px',
          paddingBottom: '12px'
        }}
        className='w-full border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-400'
      />

      <button
        type="submit"
        style={{
          paddingTop: '12px',
          paddingBottom: '12px',
          marginTop: '16px'
        }}
        className='w-full bg-black text-white py-3 rounded mt-4 active:bg-gray-700 transition'
      >
        {currentState}
      </button>

      <div
        style={{
          marginTop: '-8px'
        }}
        className='flex w-full justify-between text-sm mt-[-8px]'
      >
        <p>Forgot Your Password?</p>

        {
          currentState === "Login" ? (
            <p
              onClick={() => setCurrentState("Sign Up")}
              className='cursor-pointer'
            >
              Create Account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState("Login")}
              className='cursor-pointer'
            >
              Login Here
            </p>
          )
        }
      </div>

    </form>
  )
}

export default Login;