import React ,{useState,useContext} from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => { 
  
  const {navigate , backendurl,token,cartItems,setCartItems,getCartAmount,delivery_fee,products} = useContext(ShopContext)
  const [method,setMethod] = useState("cod");
  const [formData,setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    address:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })


  const onChangeHandler=(event)=>{
    const name = event.target.name;
    const value = event.target.value

    setFormData(data=>({...data,[name]:value}))
  }

 const onSubmitHandler = async (event) => {
  event.preventDefault();

  try {

    console.log("TOKEN:", token);

    if (!token) {
      toast.error("Please Login First");
      return;
    }

    let orderItems = [];

    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {

        if (cartItems[itemId][size] > 0) {

          const product = products.find(
            (p) => p._id === itemId
          );

          if (product) {
            const itemInfo = structuredClone(product);
            itemInfo.size = size;
            itemInfo.quantity = cartItems[itemId][size];

            orderItems.push(itemInfo);
          }
        }
      }
    }

    console.log("ORDER ITEMS:", orderItems);

    if (orderItems.length === 0) {
      toast.error("Cart is Empty");
      return;
    }

    const orderData = {
      address: formData,
      items: orderItems,
      amount: getCartAmount() + delivery_fee,
    };

    console.log("ORDER DATA:", orderData);

    switch (method) {

      case "cod": {

        const response = await axios.post(
          backendurl + "/api/order/place",
          orderData,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("PLACE ORDER RESPONSE:", response.data);

        if (response.data.success) {
          setCartItems({});
          navigate("/orders");
        } else {
          toast.error(response.data.message);
        }

        break;
      }

      case "stripe": {

        const response = await axios.post(
          backendurl + "/api/order/stripe",
          orderData,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);

        if (response.data.success) {
          window.location.replace(response.data.session_url);
        } else {
          toast.error(response.data.message);
        }

        break;
      }

      default:
        break;
    }

  } catch (error) {

    console.log(error);

    console.log("Response:", error.response?.data);

    toast.error(
      error.response?.data?.message || error.message
    );
  }
};


  return (
<form onSubmit={onSubmitHandler} style={{ padding: "40px 80px" }} className='flex flex-col lg:flex-row justify-between gap-12 pt-14 min-h-[80vh] border-t px-8'>

  {/* Left Side */}
  <div  className='w-full lg:max-w-[500px]'>

    <div style={{ padding: "20px 0px" }} className='text-2xl mb-6'>
      <Title text1="DELIVERY" text2="INFORMATION" />
    </div>
    <div style={{ padding: "20px 20px" }} className='border-t border-gray-300 pt-8'>

    <div style={{margin: "20px 0px 0px 10px"}} className='flex gap-3 mb-3'>
      <input  required
        onChange={onChangeHandler} name='firstName' value={formData.firstName}
        className='w-full border px-3 py-2 rounded'
        type='text'
        placeholder='Full Name'
      />

      <input required
       onChange={onChangeHandler} name='lastName' value={formData.lastName}
        className='w-full border px-3 py-2 rounded'
        type='text'
        placeholder='second name'
      />
    </div>

    <div style={{margin: "20px 0px 0px 10px"}} className='flex flex-col gap-3'>
      <input required onChange={onChangeHandler} name='email' value={formData.email} className='w-full border px-3 py-2 rounded' type='email' placeholder='Enter Your Email id' />
      <input required onChange={onChangeHandler} name='address' value={formData.address} className='w-full border px-3 py-2 rounded' type='text' placeholder='Address' />
      <input required onChange={onChangeHandler} name='city' value={formData.city} className='w-full border px-3 py-2 rounded' type='text' placeholder='City' />
      <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='w-full border px-3 py-2 rounded' type='number' placeholder='Postal Code' />
      <input required onChange={onChangeHandler} name='country' value={formData.country} className='w-full border px-3 py-2 rounded' type='text' placeholder='Country' />
    </div>
    </div>

  </div>

  {/* Right Side */}
  <div  style = {{margin: "100px 40px", }} className='w-full lg:w-[450px]'>
    <CartTotal />
    <div style={{marginTop:"40px"}} className='mt-12'>
    <Title text1="PAYMENT" text2="METHOD" />
    {/* Payment Options */}
    <div style={{margin: "20px 0px 0px 10px"}} className='flex flex-col gap-3 lg:flex-row '>
    <div className='flex flex-col gap-3 lg:flex-row '>
      <div onClick={()=>setMethod('stripe')} style={{ padding:"8px" }}  className='flex items-center gap-3 border p-2 rounded cursor-pointer'>
        <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='stripe'?'bg-green-400':""} `}></p>
        <img style={{ height: "20px", marginRight: "20px" }} className='h-5 mx-4' src={assets.stripe_logo} alt="Stripe" />
      </div>
      <div onClick={()=>setMethod('razorpay')} style={{ padding:"8px" }}  className='flex items-center gap-3 border p-2 rounded cursor-pointer'>
        <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='razorpay'?'bg-green-400':""} `}></p>
        <img style={{ height: "20px",width:"140px" }} className='h-5 mx-4' src={assets.razorpay_logo} alt="Razorpay" />
      </div>
      <div  onClick={()=>setMethod('cod')} style={{ padding:"8px" }}  className='flex items-center gap-3 border p-2 rounded cursor-pointer'>
        <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='cod'?'bg-green-400':""} `}></p>
        <p style={{width:"140px"}} className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
      </div>
      </div>
      <div />
      


    </div><div style={{marginTop:"32px"}} className='w-full text-end mt-8'>
        <button type='submit'  style={{ padding: "10px 8px" }} className='bg-black text-white px-6 py-2 rounded'>PLACE ORDER</button>    
        

      </div>
    </div>
  </div>
  

</form>
   
  )
}

export default PlaceOrder
