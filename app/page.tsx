import Banner from '@/components/Banner/Banner'
import Products from '@/components/Products/Products'
import React from 'react'
import UpperHeader from '@/components/Header/UpperHeader/UpperHeader';
import Footer from '@/components/Footer/Footer';

const Home = () => {
  return (
    <div className='bg-gray-100'>
      <UpperHeader/>
      <div className="relative">
    <Banner />
    <div className="relative z-10">
      <Products />
    </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Home;