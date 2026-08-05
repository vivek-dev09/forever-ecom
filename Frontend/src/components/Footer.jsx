import React from 'react'
import { assets } from '../assets/assets/frontend_assets/assets'
import logo from '../assets/logo.png'

const Footer = () => {
  return (
    <div>
      <div style={{margin:"40px"}} className='flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>

  <div>
    <img src={logo} className="mb-5 w-32" alt="" />

    <p className='max-w-md text-gray-600 leading-6'>
      Your trusted destination for premium fashion and lifestyle products.
      We bring you the latest trends, exceptional quality, and a seamless
      shopping experience.
    </p>
  </div>

  <div>
    <p className='text-xl font-medium mb-5'>COMPANY</p>

    <ul className='flex flex-col gap-2 text-gray-600'>
      <li>Home</li>
      <li>About Us</li>
      <li>Delivery</li>
      <li>Privacy Policy</li>
    </ul>
  </div>
  <div>
    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
    <ul className='flex flex-col gap-2 text-gray-600'>
        <li>+1-234-5678-90</li>
        <li>contact@foreveryou.com</li>

    </ul>
  </div>

</div> <div>
    <hr className='border-gray-300' />
    <p className='py-5 text-sm text-center '>Copyright 2026@ forever.com -All Right Reserved</p>

</div>
    </div>
  )
}

export default Footer
