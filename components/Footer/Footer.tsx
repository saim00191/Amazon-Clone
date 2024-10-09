import React from 'react'
import FooterTop from './FooterTop'
import FooterMiddle from './FooterMiddle/FooterMiddle'
import FooterBottom from './FooterBottom/FooterBottom'

const Footer = () => {
  return (
    <div className='overflow-y-auto'>
      <FooterTop />
      <FooterMiddle />
      <FooterBottom/>
    </div>
  )
}

export default Footer