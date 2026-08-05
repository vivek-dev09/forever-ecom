import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets/frontend_assets/assets'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const Searchbar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
  const [visible,setVisible]=useState(false)
  const location = useLocation();

  useEffect(()=>{
    if(location.pathname.includes('collection') && showSearch){
      setVisible(true)
    }else{
      setVisible(false)
    }
  },[location,showSearch])

  return showSearch && visible ? (
    <div style={{padding:"12px"}} className='border-t border-b bg-gray-50 py-4'>

      <div className='flex items-center justify-center gap-4'>

        <div className='flex items-center w-3/4 sm:w-1/2 bg-white border border-gray-200 rounded-full px-6 py-3 shadow-sm focus-within:border-black focus-within:shadow-lg transition-all duration-300'>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='flex-1 outline-none bg-transparent text-lg'
            type='text'
            placeholder=' Search products...'
          />

          <img style={{margin:"10px"}}
            className='w-5 h-5 cursor-pointer opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-200'
            src={assets.search_icon}
            alt='search'
          />
        </div>

        <img
          onClick={() => setShowSearch(false)}
          className='w-4 h-4 cursor-pointer hover:scale-110 transition'
          src={assets.cross_icon}
          alt='close'
        />

      </div>

    </div>
  ) : null
}

export default Searchbar