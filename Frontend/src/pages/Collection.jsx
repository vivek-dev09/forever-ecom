import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import TITLE from '../components/TITLE'
import ProductItem from '../components/ProductItem'

const Collection = () => {
  const { products,search,showSearch } = useContext(ShopContext)

  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts,setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType,setSortType]=useState('relevant')



  useEffect(()=>{
    applyFilter()
  },[category,subCategory,products,search,showSearch])

  useEffect(()=>{
    sortProduct();
  },[sortType])

  

  const toggleCategory = (e) => {
    const value = e.target.value

    if (category.includes(value)) {
      setCategory(prev=>prev.filter((item) => item !== value))
    } else {
      setCategory(prev=>[...prev,value])
    }
  }

  const toggleSubCategory = (e) => {
    const value = e.target.value

    if (subCategory.includes(value)) {
      setSubCategory(prev=>prev.filter((item) => item !== value))
    } else {
      setSubCategory(prev=>[...prev,value])
    }
  }



  const applyFilter=()=>{
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if(category.length>0){
      productsCopy=productsCopy.filter(item=>category.includes(item.category))
    }
    if(subCategory.length>0){
      productsCopy=productsCopy.filter(item=>subCategory.includes(item.subCategory))
    }
    setFilterProducts(productsCopy)
  }

  const sortProduct=()=>{
    let fpcopy = filterProducts.slice()
    switch(sortType){
      case 'low-high':
        setFilterProducts(fpcopy.sort((a,b)=>(a.price-b.price)))
        break;
      case 'high-low':
        setFilterProducts(fpcopy.sort((a,b)=>(b.price-a.price)))
        break;
      
      default:
        applyFilter();
        break;
    }
  }

  return (
    <div style={{margin : "0 50px"}} className='flex flex-col sm:flex-row gap-10 pt-10 border-t'>

      {/* Filters */}
      <div  className='min-w-60 '>
        <p
          onClick={() => setShowFilter(!showFilter)}
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
        >
          FILTERS
        </p>

        {/* Category Filter */}
        <div style={{ padding: '5px 20px' }}
          className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'
            } sm:block`}
        >
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>

          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <label className='flex gap-2'>
              <input
                type='checkbox'
                value='Men'
                onChange={toggleCategory}
              />
              Men
            </label>

            <label className='flex gap-2'>
              <input
                type='checkbox'
                value='Women'
                onChange={toggleCategory}
              />
              Women
            </label>

            <label className='flex gap-2'>
              <input
                type='checkbox'
                value='Kids'
                onChange={toggleCategory}
              />
              Kids
            </label>
          </div>
        </div>

        {/* Type Filter */}
        <div  style={{ padding: '5px 20px' }}
          className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'
            } sm:block`}
        >
          <p className='mb-3 text-sm font-medium'>TYPE</p>

          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <label className='flex gap-2'>
              <input
                type='checkbox'
                value='Topwear'
                onChange={toggleSubCategory}
              />
              Topwear
            </label>

            <label className='flex gap-2'>
              <input
                type='checkbox'
                value='Bottomwear'
                onChange={toggleSubCategory}
              />
              Bottomwear
            </label>

            <label className='flex gap-2'>
              <input
                type='checkbox'
                value='Winterwear'
                onChange={toggleSubCategory}
              />
              Winterwear
            </label>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className='flex-1'>
        <div style={{ margin: '30px 0' }} className='flex justify-between text-base sm:text-2xl mb-4'>
          <TITLE text1={"ALL"} text2={"COLLECTIONS"} />


        
        <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
          <option value="relavent">Sort by: Relavent</option>
          <option value="low-high">Sort by: Low to High</option>
          <option value="high-low">Sort by: High to Low</option>
        </select>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {filterProducts.map((item,index) => (
            <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
))}
        </div>
      </div>

    </div>
  )
}

export default Collection