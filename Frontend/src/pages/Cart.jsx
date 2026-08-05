import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title.jsx'
import { assets } from '../assets/assets/frontend_assets/assets'
import CartTotal from '../components/CartTotal'
import RelatedProducts from '../components/RelatedProducts'

const Cart = () => {
  const {products,currency,cartItems,updateQuantity ,navigate} = useContext(ShopContext)

  const [cartData,setCartData]=useState([])

  useEffect(()=>{

    if(products.length>0){
        const tempData = []
    for (const items in cartItems) {      
      for(const item in cartItems[items]){
        if(cartItems[items][item]){
          tempData.push({
            _id:items,
            size:item,
            quantity:cartItems[items][item]
          })
        }
      }
    }
    setCartData(tempData)
    }
    
    
  },[cartItems,products])
  
  return (
    <div className='border-t pt-14'>
      <div style={{margin:"40px"}} className='text-2xl mb-3'>
        <Title text1={"YOUR"} text2={"CART"}/>
      </div> <div>
        {
          cartData.map((item,index)=>{
            const productData = products.find((product)=>product._id===item._id)
            if(!productData) return null;

            return (
              <div style={{margin:"30px"}} key={index} className='py-4 border-t border-b border-gray-300 text-gray-700 grid grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className = "flex items-center gap-2 mt-2">
                      <p className='text-xs sm:text-base font-medium'>{currency} {productData.price}</p>
                      <p className='text-xs sm:text-sm text-gray-500'>Size: {item.size}</p>
                      <p className='text-xs sm:text-sm text-gray-500'>Qty: {item.quantity}</p>
                      </div>

                  </div>
                </div>
               <input onChange={(e) => e.target.value === " " || e.target.value === "0" ? null: updateQuantity(item._id, item.size, Number(e.target.value))} min={1} defaultValue={item.quantity} className='max-w-10 sm:max-w-20  border-gray-300 border-2 px-1 sm:px-2 py-1' type="number" />
               <img  onClick={() => updateQuantity(item._id, item.size, 0)} className='w-5 cursor-pointer' src={assets.bin_icon} alt="" />
                <button className='text-sm text-gray-500'>Remove</button>
                

              </div>
            )
          })
        }<div className='flex justify-end my-20'>
          <div style={{margin: "30px 40px"}} className='w-full sm:w-[450px]'>
              <CartTotal />  
              <div  style={{ alignItems: "flex-end" }} className='w-full flex flex-col gap-4 mt-10'>
                <button onClick={() => navigate('/place-order')} style={{padding: "15px 32px",width:"60%"}} className="bg-black text-white px-8 py-3 text-sm font-medium tracking-wide rounded hover:bg-gray-800 transition-all duration-300 cursor-pointer">PROCEED TO CHECKOUT</button>

              </div>
     </div>
    </div>
      </div>
      
    </div>
  )
}

export default Cart
