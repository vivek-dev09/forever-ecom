import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets/frontend_assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();

  const { products, currency ,addToCart } = useContext(ShopContext)
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState('')
  const [size, setSize] = useState("")


  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products])

  return productData ? (
    <div style={{margin:"0 50px "}} className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll gap-2 justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img
                  onClick={() => setImage(item)}
                  src={item}
                  key={index}
                  className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                  alt=""
                />
              ))
            }
          </div>

          <div className='w-full sm:w-[80%]'>
            <img className='w-full max-h-[500px] object-contain' src={image} alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>
            {productData.name}
          </h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className='pl-2 '>(188)</p>

          </div>
          <p style={{marginTop:"5px"}} className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p style={{marginTop:"10px"}} className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8 '>
            <p style={{marginTop:"15px"}}>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`w-16 py-2 px-4 cursor-pointer bg-gray-100 border transition
    ${item === size
                      ? 'border-orange-500'
                      : 'border-gray-300 hover:border-black'
                    }`}
                >
                  {item}
                </button>))}

            </div>
          </div>
          <button style={{
            margin: "20px 0px",
            padding: "5px"
          }} onClick={()=>addToCart(productData._id,size)}
            className='mt-6 bg-black text-white px-10 py-4 rounded-md active:bg-gray-700 transition'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div style={{
            margin: "20px 0px",
            padding: "5px"
          }} className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivary is available on this product.</p>
            <p>Easy to exchange and return within 7 days.</p>


          </div>
              </div>
        </div>

        {/* Description Section */}
<div className='mt-20'>
  <div className='flex'>
    <b className='border px-5 py-3 text-sm'>Description</b>
    <p className='border px-5 py-3 text-sm'>Reviews (188)</p>
  </div>

  <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
    <p>An e-commerce website is an online platform that facilitates the buying and selling of products and services over the internet. It allows customers to browse a wide range of products, compare prices, add items to a shopping cart, and complete purchases securely. Businesses can showcase their products, manage inventory, process orders, and provide a convenient shopping experience to customers.</p>
    <p>E-commerce websites typically display products and services along with detailed descriptions, images, prices, and customer reviews. They provide secure payment options, easy navigation, and a convenient shopping experience for users.</p>
  </div>
</div>

          {/*   display related products */}
          <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>) : <div className='opacity-0'>

  </div>

}

export default Product
