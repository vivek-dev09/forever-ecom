import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets/frontend_assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
   <div>
  <div
    style={{
      paddingTop: "40px"
    }}
    className="text-2xl text-center border-t"
  >
    <Title text1={"CONTACT"} text2={"US"} />
  </div>

  <div
    style={{
      margin: "40px 40px",
      marginBottom: "112px"
    }}
    className="flex flex-col gap-10 text-center md:flex-row"
  >
    <img
      src={assets.contact_img}
      alt=""
      className="w-full md:max-w-[480px]"
    />

    <div
      className="flex flex-col justify-center items-start gap-6"
    >
      <p className="font-semibold text-xl text-gray-600">
        Our Store
      </p>

      <p className="text-lg text-gray-500">
        123 Main Street
      </p>

      <p className="text-lg text-gray-500">
        New York, NY 10001
      </p>

      <p className="text-lg text-gray-500">
        Phone: (123) 456-7890
      </p>

      <p className="text-lg text-gray-500">
        Email: info@forever.com
      </p>

      <button
        style={{
          padding: "16px 32px"
        }}
        className="border border-black text-sm hover:bg-black hover:text-white transition-all duration-500"
      >
        Explore Jobs
      </button>
    </div>
     
  </div>
  <NewsLetterBox/> 
</div>
  )
}

export default Contact
