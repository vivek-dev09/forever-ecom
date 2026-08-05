import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) return

    try {
      const response = await axios.post(
        backendUrl + '/api/order/list',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
        console.log("Order ID:", orderId)
  console.log("Status:", event.target.value)

      const response = await axios.post(
        backendUrl + '/api/order/status',
        {
          orderId,
          status: event.target.value
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.data.success) {
        fetchAllOrders()
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  


  return (
    <div>
      <h3 className='mb-4 text-lg font-semibold'>Order Page</h3>

      <div>
        {orders.map((order, index) => (

          <div
            key={index}
            className='grid grid-cols-1 lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border p-5 mb-4 text-sm text-gray-700'
          >

            <img
              className='w-12'
              src={assets.parcel_icon}
              alt=""
            />

            {/* Order Details */}
            <div>

              <div>
                {order.items.map((item, index) => (
                  <p key={index}>
                    {item.name} x {item.quantity}
                    <span> {item.size}</span>
                    {index !== order.items.length - 1 && ','}
                  </p>
                ))}
              </div>

              <p className='mt-3 mb-1 font-medium'>
                {order.address.firstName} {order.address.lastName}
              </p>

              <div>
                <p>{order.address.address}</p>

                <p>
                  {order.address.city},
                  {' '}{order.address.state},
                  {' '}{order.address.country},
                  {' '}{order.address.zipcode}
                </p>
              </div>

              <p>{order.address.phone}</p>

            </div>

            {/* Amount */}
            <div>
              <p className='font-medium'>
                {currency}{order.amount}
              </p>
            </div>

            {/* Payment */}
            <div>
              <p>Method : {order.paymentMethod}</p>

              <p className='mt-1'>
                Payment : {order.payment ? 'Done' : 'Pending'}
              </p>

              <p className='mt-1'>
                Date : {new Date(order.date).toLocaleDateString()}
              </p>
            </div>

            {/* Status */}
            <select
            
              onChange={(event) =>
                statusHandler(event, order._id)
              }
              value={order.status}
              className='border p-2'
            >
              <option value="Order Placed">
                Order Placed
              </option>

              <option value="Packing">
                Packing
              </option>

              <option value="Shipped">
                Shipped
              </option>

              <option value="Out for delivery">
                Out for delivery
              </option>

              <option value="Delivered">
                Delivered
              </option>
            </select>

          </div>

        ))}
      </div>
    </div>
  )
}

export default Orders