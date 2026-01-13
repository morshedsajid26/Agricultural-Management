import React from 'react'
import Bredcumb from '../../components/Bredcumb'
import Breadcrumb from '../../components/Bredcumb'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa6'

const SopManagement = () => {
  return (
    <div>
      
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb />
          <p className="text-[#4A5565] mt-1.5">
            Manage employees and managers for Farm check
          </p>
        </div>

        <Link to="/admin/usermanagement/upload/sop">
          <button className="bg-[#F6A62D] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#e5942b] cursor-pointer">
            <FaPlus />
            Upload New SOP 
          </button>
        </Link>
      </div>
    </div>
  )
}

export default SopManagement
