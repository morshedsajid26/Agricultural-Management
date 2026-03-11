import React from 'react'
import Container from '../../components/Container'
import Image from '../../components/Image'
import appleStore from '/appleStore.png'
import googlePlay from '/googlePlay.png'


const DownloadApp = () => {
  return (
    <div className='bg-[#F6A62D] py-24'>
        <Container>
            <h3 className='text-4xl font-bold text-center text-white '>
                Ready to simplify your farm operations?
            </h3>

            <p className='text-lg text-center text-white mt-4'>
                Download the app to manage tasks, SOPs, and team communication directly from your phone.
            </p>

            <div className='flex items-center justify-center gap-8 mt-10'>

                <button>
                    <a href='#'>
                     <Image src={googlePlay} alt='App Store' className='h-12 mt-8' />
                    </a>
                </button>

                <button>
                    <a href='#'>
                     <Image src={appleStore} alt='App Store' className='h-12 mt-8' />
                    </a>
                </button>
            </div>


        </Container>
      
    </div>
  )
}

export default DownloadApp
