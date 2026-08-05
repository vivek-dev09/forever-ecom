import React from 'react'
import Hero from '../components/Hero'
import Latest_Collection from '../components/Latest_Collection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'

function Home() {
  return (
    <div className=''>
      <Hero/>
      <Latest_Collection/>
      <BestSeller/>
      <OurPolicy/>
      <NewsLetterBox/>
    </div>
  )
}

export default Home
