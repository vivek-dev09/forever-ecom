import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'



const CartTotal = () => {
    const {currency,delivery_fee,getCartAmount} = useContext(ShopContext)
  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTAL"}/>
        </div>

    <div className="flex flex-col gap-2 mt-2 mt-sm">
        <div className="flex justify-between text-gray-700">
            <p>Subtotal</p>
            <p>{currency} {getCartAmount().toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-gray-700">
            <p>Delivery Fee</p>
            <p>{currency} {delivery_fee.toFixed(2)}</p>
        </div>
        <div className="flex justify-between font-bold text-lg mt-4">
            <p>Total</p>
            <p>{currency} {(getCartAmount() + delivery_fee).toFixed(2)}</p>
        </div>
        
        </div>

        </div>
  

    
  )
}

export default CartTotal
