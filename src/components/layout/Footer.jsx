import React from 'react'
import Container from '../Container'
import Image from '../Image'
import logo from "/logo.png"

const Footer = () => {
  return (
    <div className='bg-[#0F172B]'>
      <Container className={`py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4`}>

        <div>

          <div className='flex items-center gap-2'>
            <Image src={logo}  alt="FarmSOP Logo" className="w-8 h-8" />
            <p className='text-white font-bold text-xl'>
              FarmCheck
            </p>
          </div>
          
          <p className='text-[#90A1B9] mt-4 '>
            Empowering farms with simple tools for better management and communication.
          </p>
        </div>

        <div>
          <h4 className='text-white font-semibold text-lg mb-4'>Product</h4>
          <ul className='space-y-2'>
              
            <li><a href="#" className='text-[#90A1B9] hover:text-white'>Features</a></li>
            <li><a href="#" className='text-[#90A1B9] hover:text-white'>Pricing</a></li>
          </ul>

        </div>

        <div>
          <h4 className='text-white font-semibold text-lg mb-4'>Company</h4>
          <ul className='space-y-2'>
              
            <li><a href="#" className='text-[#90A1B9] hover:text-white'>About Us</a></li>
            <li><a href="#" className='text-[#90A1B9] hover:text-white'>Contact</a></li>
          </ul>

        </div>

        <div>
          <h4 className='text-white font-semibold text-lg mb-4'>Legal</h4>
          <ul className='space-y-2'>
              
            <li><a href="#" className='text-[#90A1B9] hover:text-white'>Privacy Policy</a></li>
            <li><a href="#" className='text-[#90A1B9] hover:text-white'>Terms of Service</a></li>
          </ul>

        </div>

      </Container>

      <p className='text-[#62748E] text-center py-10 border-t border-[#1D293D]'>
        &copy; {new Date().getFullYear()} FarmSOP Inc. All rights reserved.
      </p>
    </div>
  )
}

export default Footer
