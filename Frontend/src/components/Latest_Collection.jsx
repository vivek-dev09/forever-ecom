import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'


const Latest_Collection = () => {

  const { products } = useContext(ShopContext)
  const [latestProducts,setLatestProducts] = useState([])

  useEffect(()=>{
      setLatestProducts(products.slice(0,15))
  },[products])

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className=' mx-auto text-center text-sm text-gray-600'>
          Explore our latest arrivals and discover styles designed for every occasion.
        </p>
      </div>
      <div style={{ margin: '20px 60px' }} className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 '>
        {
          latestProducts.map((item,index)=>(
             <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
          ))
        }
      </div>
    </div>
  )
}
// style={{margin:"0 140px"}}
export default Latest_Collection
