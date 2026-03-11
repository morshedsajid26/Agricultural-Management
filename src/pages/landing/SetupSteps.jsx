import React from 'react'
import Container from '../../components/Container'

const SetupSteps = () => {
  return (
    <div className='pb-16'>
        <Container className="bg-[#F8FAFC] py-8 rounded-2xl ">
            <h3 className='text-4xl font-bold text-center'>Simple setup, immediate impact</h3>
            <p className='text-lg text-[#90A1B9] mt-4 text-center'>
                Get your farm running smoothly in four easy steps.
            </p>


            <div className='grid grid-cols-12 gap-6 mt-12'>

                <div className='col-span-12 md:col-span-3 text-center flex flex-col items-center'>
                    <p className='bg-white rounded-2xl border-2 border-[#F6A62D] py-2 px-4 text-[#F6A62D] font-bold text-2xl w-fit '>
                        01
                    </p>

                    <h4 className='text-[#0F172B] text-xl font-bold my-6'>
                        Create your farm
                    </h4>
                    <p className='text-[#45556C]'>
                       Set up your farm profile and invite your management team.
                    </p>
                </div>

                <div className='col-span-12 md:col-span-3 text-center flex flex-col items-center'>
                    <p className='bg-white rounded-2xl border-2 border-[#F6A62D] py-2 px-4 text-[#F6A62D] font-bold text-2xl w-fit '>
                        02
                    </p>

                    <h4 className='text-[#0F172B] text-xl font-bold my-6'>
                        Upload SOPs
                    </h4>
                    <p className='text-[#45556C]'>
                       Upload your existing PDF procedures. We organize them for easy access.
                    </p>
                </div>

                <div className='col-span-12 md:col-span-3 text-center flex flex-col items-center'>
                    <p className='bg-white rounded-2xl border-2 border-[#F6A62D] py-2 px-4 text-[#F6A62D] font-bold text-2xl w-fit '>
                        03
                    </p>

                    <h4 className='text-[#0F172B] text-xl font-bold my-6'>
                        Assign Tasks
                    </h4>
                    <p className='text-[#45556C]'>
                       Create daily checklists and assign them to specific employees or roles.
                    </p>
                </div>

                <div className='col-span-12 md:col-span-3 text-center flex flex-col items-center'>
                    <p className='bg-white rounded-2xl border-2 border-[#F6A62D] py-2 px-4 text-[#F6A62D] font-bold text-2xl w-fit '>
                        04
                    </p>

                    <h4 className='text-[#0F172B] text-xl font-bold my-6'>
                        Team Executes
                    </h4>
                    <p className='text-[#45556C]'>
                      Employees follow SOPs on their mobile devices — even offline.
                    </p>
                </div>
            </div>
        </Container>
    </div>
  )
}

export default SetupSteps
