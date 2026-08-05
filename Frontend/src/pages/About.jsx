import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets/frontend_assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return <div>
    <div style={{ paddingTop: '32px' }} className="text-2xl text-center font-bold pt-8 ">
      <Title text1={"ABOUT"} text2={"US"} />

    </div>
    <div style={{ margin: "40px 40px" }} className="my-10 flex flex-col md:flex-row gap-16">
      <img className="w-full md:w-1/2" src={assets.about_img} alt="" />
      <div className="flex flex-col gap-4">
        <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.

        </p>
        <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.

        </p>
        <b className="text-gray-800">Our Mission </b>
        <p>Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
        <p>We believe that shopping should be more than just a transaction; it should be an enjoyable and personalized experience. That's why we invest in cutting-edge technology, user-friendly interfaces, and exceptional customer service to ensure that every interaction with Forever is nothing short of extraordinary.</p>
        <p>As we continue to grow and evolve, our commitment to our customers remains unwavering. We strive to be more than just an e-commerce platform; we aim to be a trusted partner in our customers' lives, providing them with the products they love and the service they deserve.</p>
        <p>Thank you for being a part of our journey. We look forward to serving you and making your shopping experience with Forever truly unforgettable.</p>
      </div>

    </div>
    <div style={{ padding: '20px' }} className="text-4xl py-4">
      <Title text1={"WHY"} text2={"CHOOSE US?"} />
    </div>
<div
  style={{
    margin: "40px 40px",
    border: "1px solid #d1d5db"
  }}
  className="flex flex-col md:flex-row"
>

  <div
    style={{ padding: "40px" }}
    className="flex-1 flex flex-col gap-5"
  >
    <b>QUALITY ASSURANCE:</b>
    <p>
      We maintain rigorous quality control standards to ensure that every
      product we offer meets the highest levels of quality and performance.
    </p>
  </div>

  <div
    style={{
      padding: "40px",
      borderLeft: "1px solid #d1d5db",
      borderRight: "1px solid #d1d5db"
    }}
    className="flex-1 flex flex-col gap-5"
  >
    <b>CUSTOMER SATISFACTION:</b>
    <p>
      We are committed to providing an exceptional customer experience,
      with a focus on satisfaction and loyalty.
    </p>
  </div>

  <div
    style={{ padding: "40px" }}
    className="flex-1 flex flex-col gap-5"
  >
    <b>FAST & RELIABLE DELIVERY:</b>
    <p>
      We ensure timely and secure delivery of your orders, so you can
      enjoy your purchases without any hassle.
    </p>
  </div>

</div>
    <NewsLetterBox/>
  </div>

};

export default About;