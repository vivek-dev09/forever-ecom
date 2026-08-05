import React from 'react'

const NewsLetterBox = () => {
  const onSubmitHandler =(event)=>{
      event.preventDefault()
  }
  return (
    <div style={{padding:"20px"}} className='text-center bg-gray-700/20  '>
        <p className='text-2xl  font-medium text-gray-800'>Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'>Be the first to know about new arrivals, special offers, and exclusive deals.</p>
        <form onSubmit={onSubmitHandler} style={{margin:"0 20rem"}} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 '>
          <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter Your Email' required/>
          <button style={{padding:"10px 30px"}} type='submit' className='bg-black h-full cursor-pointer text-white text-xs px-20 py-3 '>SUBSCRIBE </button>
        </form>
    
    </div>
  ) 
}

export default NewsLetterBox
