import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Orders = () => {

  const { backendurl, token, currency } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
     const response = await axios.post(
  backendurl + "/api/order/userorders",
  {},
  {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }
);

console.log("USER ORDERS RESPONSE:", response.data);
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item.status = order.status
            item.payment = order.payment
            item.paymentMethod = order.paymentMethod
            item.date = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())

      }


    } catch (error) {
      console.log(error.message);
      toast.error(error.message)


    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <div style={{ paddingTop: '32px', padding: '0 4rem' }} className='border-t pt-8 px-4 sm:px-8 md:px-12 min-h-[70vh]'>

      {/* Heading */}
      <div className='text-2xl mb-8'>
        <Title text1="YOUR" text2="ORDERS" />
      </div>

      {/* Orders List */}
      <div className='flex flex-col gap-4'>

        {orderData.map((item, index) => (
          <div
            key={index}
            className='border rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'
          >

            {/* Left Section */}
            <div className='flex gap-4 items-start'>

              <img
                // style={{margin : '5px'}}
                src={item.image[0]}
                alt={item.name}
                className='w-25 h-25 object-cover rounded'
              />

              <div>
                <h3 className='font-medium text-base sm:text-lg'>
                  {item.name}
                </h3>

                <div className='flex flex-wrap gap-4 mt-2 text-sm text-gray-500'>
                  <p>Size: {item.size}</p>
                  <p>Qty: {item.quantity}</p>
                </div>

                <p className='mt-2 font-medium'>
                  {currency}{item.price}
                </p>
                <p style={{marginTop:"2"}} className='text-gray-400'>
                  {item.paymentMethod}
                </p>
              </div>

            </div>

            {/* Right Section */}
            <div className='flex items-center gap-3'>

              <span className='w-3 h-3 rounded-full bg-green-500'></span>

              <p className='text-sm text-gray-600'>
               {item.status}
              </p>

              <button onClick={loadOrderData} style={{padding:"0.5rem 1rem",marginRight:'5px'}} className='border px-4 py-2 rounded text-sm hover:bg-gray-100'>
                Track Order
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}

export default Orders