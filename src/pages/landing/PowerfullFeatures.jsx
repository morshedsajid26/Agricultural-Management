import React from 'react'
import Container from '../../components/Container'
import { FiFileText, FiWifiOff } from 'react-icons/fi'
import { FaTasks } from 'react-icons/fa'
import { IoChatbubbleOutline } from 'react-icons/io5'
import { RiTaskFill } from 'react-icons/ri'
import { LuShieldCheck} from 'react-icons/lu'

const PowerfullFeature = () => {
  return (
    <div className='pb-16'>
        <Container className="bg-[#F8FAFC] py-8 rounded-2xl ">
            <h3 className='text-4xl font-bold text-center'>Powerful features, simple interface</h3>
            <p className='text-lg text-[#90A1B9] mt-4 text-center'>
                Every feature is designed with the farm worker in mind.
            </p>


            <div className='grid grid-cols-12 gap-x-10 gap-y-8 mt-12 px-5'>

                <div className='col-span-12 md:col-span-4   bg-white border border-[#F1F5F9] rounded-2xl py-8 px-6'>
                    <div className='bg-[#FFF7ED] h-12 w-12 flex items-center justify-center rounded-xl'>
                        <FiFileText className='w-6 h-6 text-[#F6A62D] ' />
                    </div>

                    <h4 className='text-[#0F172B] text-xl font-bold my-6'>
                        SOP Management
                    </h4>
                    <p className='text-[#45556C]'>
                      Centralize all your PDF procedures. Version control ensures everyone sees the latest update.
                    </p>
                </div>


                 <div className='col-span-12 md:col-span-4   bg-white border border-[#F1F5F9] rounded-2xl py-8 px-6'>
                    <div className='bg-[#FFF7ED] h-12 w-12 flex items-center justify-center rounded-xl'>
                        <FiWifiOff className='w-6 h-6 text-[#F6A62D] ' />
                    </div>

                    <h4 className='text-[#0F172B] text-xl font-bold my-6'>
                        Offline Access
                    </h4>
                    <p className='text-[#45556C]'>
                      The mobile app works perfectly without internet. Data syncs automatically when connection returns.
                    </p>
                </div>


                 <div className='col-span-12 md:col-span-4   bg-white border border-[#F1F5F9] rounded-2xl py-8 px-6'>
                    <div className='bg-[#FFF7ED] h-12 w-12 flex items-center justify-center rounded-xl'>
                        <FaTasks className='w-6 h-6 text-[#F6A62D] ' />
                    </div>

                    <h4 className='text-[#0F172B] text-xl font-bold my-6'>
                        Task Checklists
                    </h4>
                    <p className='text-[#45556C]'>
                      Convert SOPs into actionable daily checklists. Track completion in real-time.
                    </p>
                </div>


                 <div className='col-span-12 md:col-span-4   bg-white border border-[#F1F5F9] rounded-2xl py-8 px-6'>
                    <div className='bg-[#FFF7ED] h-12 w-12 flex items-center justify-center rounded-xl'>
                        <IoChatbubbleOutline  className='w-6 h-6 text-[#F6A62D] ' />
                    </div>

                    <h4 className='text-[#0F172B] text-xl font-bold my-6'>
                       Team Messaging
                    </h4>
                    <p className='text-[#45556C]'>
                      Built-in chat for teams to discuss tasks, share photos of issues, and stay connected.
                    </p>
                </div>

                 <div className='col-span-12 md:col-span-4   bg-white border border-[#F1F5F9] rounded-2xl py-8 px-6'>
                    <div className='bg-[#FFF7ED] h-12 w-12 flex items-center justify-center rounded-xl'>
                        <LuShieldCheck className='w-6 h-6 text-[#F6A62D] ' />
                    </div>

                    <h4 className='text-[#0F172B] text-xl font-bold my-6'>
                       Role-based Access
                    </h4>
                    <p className='text-[#45556C]'>
                      Control what each employee can see and do. Managers get full oversight, workers see their tasks.
                    </p>
                </div>


                 <div className='col-span-12 md:col-span-4   bg-white border border-[#F1F5F9] rounded-2xl py-8 px-6'>
                    <div className='bg-[#FFF7ED] h-12 w-12 flex items-center justify-center rounded-xl'>
                        <RiTaskFill className='w-6 h-6 text-[#F6A62D] ' />
                    </div>

                    <h4 className='text-[#0F172B] text-xl font-bold my-6'>
                        Real time task Tracking
                    </h4>
                    <p className='text-[#45556C]'>
                      Monitor task progress across your farm. See what’s completed, pending, or need attention
                    </p>
                </div>

                
            </div>
        </Container>
    </div>
  )
}

export default PowerfullFeature
