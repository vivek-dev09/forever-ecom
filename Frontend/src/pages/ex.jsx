import React,{useState} from 'react'

const Login = () => {
  const [currentLogin,setCurrentLogin] = useState("Sign Up");
  return (
    <form style={{padding: '0 70px',marginTop: '2rem'}} className='flex flex-col items-center w-[90%] sm:max-w-96 mt-14 gap-4 text-gray-700 border p-8 rounded'>
      <div className='inline-flex items-center gap-2  mb-2 mt-10'>
        <p className='text-3xl prata-regular'>{currentLogin}</p>
        <hr className='w-8 border-none bg-gray-700 h-[1.5px]'/>


      </div>

     {currentLogin === "Login" ? " ":  (
        <input type="text" placeholder='Enter Your Name' className='w-full border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-400' />
      )}
      <input type="email" placeholder='Email' className='w-full border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-400' />
      <input type="password" placeholder='Password' className='w-full border px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-400' />
      <button className='w-full bg-black text-white py-3 rounded mt-4 active:bg-gray-700 transition'>{currentLogin}</button>  
        <div className='flex w-full justify-between text-sm mt-[-8px]'>
          <p >Forgot Your Password?</p>
          {
            currentLogin === "Login" ? (
              <p onClick={() => setCurrentLogin("Sign Up")} className='cursor-pointer'>Create Account</p>
            ) : (
              <p onClick={() => setCurrentLogin("Login")} className='cursor-pointer'>Login Here</p>
            )
          }

        </div>
    </form>

  )
}

export default Login
