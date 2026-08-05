import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

const Verify = () => {

    const {navigate,token,setCartItems,backendurl} = useContext(ShopContext)
    const [searchParams,setSearchParams] =  useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')




    const verifyPayment = async()=>{
        try {
            
            if(!token){
                return null
            }
            const response = await axios.post(backendurl+'/api/order/verifyStripe',{success,orderId},{ headers:{
            authorization:`Bearer ${token}`
        }})
            
            if(response.data.success){
                setCartItems({})
                navigate('/orders')
            }else{
                navigate('/cart')
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
            
        }


    }

    useEffect(()=>{
        verifyPayment()
    },[token, success, orderId])

  return (
    <div>
    
    </div>
  )
}

export default Verify
