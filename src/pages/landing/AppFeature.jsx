import React from 'react'
import Container from '../../components/Container'
import Image from '../../components/Image'
import mobile1 from '/mobile1.png'
import mobile2 from '/mobile2.png'
import Layer from '/Layer.png'
import bglayer from '/bglayer.png'
import MobileView from '/MobileView.png'
import { FiWifiOff } from 'react-icons/fi'
import { MdTranslate } from 'react-icons/md'
import { CiMobile2 } from 'react-icons/ci'

const AppFeature = () => {
  return (
    <div className='bg-[#0F172B] py-12 '>
        <Container>
            <div className='flex gap-20 items-center'>
                {/* <div className='flex relative z-20 ' >
                    <div className='  '>
                        <div className='relative'>
                        <Image src={mobile1} className={` z-20`}/>

                    <div className='absolute top-3 left-9.5 '>
                        <Image src={Layer} alt={`layer`}/>
                    </div>
                        </div>

                    </div>

                    <div>
                        <Image src={mobile2} className={``}/>
                    </div>

                    <div>
                        <Image src={bglayer} alt={`layer`} className={`absolute left-0 -z-10  `}/>
                    </div>
                </div> */}

                <div>
                <Image src={MobileView} alt='Mobile 1'/>

                </div>


                <div>
                    <h3 className='font-bold text-white text-4xl'>Designed for the field, not the office</h3>
                    <p className='text-[#90A1B9] text-lg mt-4'>Our app is designed to work seamlessly in the field, providing you with the tools you need to manage your agricultural operations efficiently.</p>

                    <div className='space-y-6 mt-8'>

                        <div className='flex items-center gap-4'> 
                            <div className='border-[#90A1B9] w-fit p-3 rounded-xl border bg-[#314158]'>
                            <FiWifiOff  className='w-6 h-6 text-[#F6A62D]'/>
                            </div>

                            <div>
                                <h4 className='text-white font-bold text-lg' >Zero-Lag Offline Mode</h4>
                                <p className='text-[#90A1B9] text-sm'>Access your data anytime, anywhere, without an internet connection.</p>
                            </div>
                        </div>

                        <div className='flex items-center gap-4'> 
                            <div className='border-[#90A1B9] w-fit p-3 rounded-xl border bg-[#314158]'>
                            <MdTranslate  className='w-6 h-6 text-[#F6A62D]'/>
                            </div>

                            <div>
                                <h4 className='text-white font-bold text-lg' >Multilingual Support</h4>
                                <p className='text-[#90A1B9] text-sm'>App interface and SOPs available in your team's native language.</p>
                            </div>
                        </div>


                        <div className='flex items-center gap-4'> 
                            <div className='border-[#90A1B9] w-fit p-3 rounded-xl border bg-[#314158]'>
                           <CiMobile2 className='w-6 h-6 text-[#F6A62D]'/>
                            </div>

                            <div>
                                <h4 className='text-white font-bold text-lg' >Simple UX</h4>
                                <p className='text-[#90A1B9] text-sm'>Big buttons, clear text, and visual cues for easy navigation.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </Container>
      
    </div>
  )
}

export default AppFeature
