import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IoArrowBack } from 'react-icons/io5'
import { MdOutlineEmail, MdOutlinePhone } from 'react-icons/md'

const PrivacyPolicy = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">

      {/* Top Info Bar */}
      <div className="w-full border-b border-gray-200 px-4 sm:px-8 py-3 flex items-center justify-between text-xs sm:text-sm text-[#364153]">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors flex-shrink-0"
        >
          <IoArrowBack className="w-4 h-4 text-[#364153]" />
        </button>

        <span className="hidden sm:inline">Hello! Welcome to Farm-Check</span>

        <div className="flex items-center gap-2 sm:gap-6">
          <span className="flex items-center gap-1">
            <MdOutlineEmail className="w-4 h-4" />
            <span className="hidden md:inline">demo@gmail.com</span>
          </span>
          <span className="flex items-center gap-1">
            <MdOutlinePhone className="w-4 h-4" />
            <span className="hidden md:inline">+1 707-699-6478</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-4 sm:px-8 lg:px-16 pt-8 pb-16">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-[#1A1A1A] mb-6 sm:mb-8">Privacy Policy</h1>

        <div className="space-y-4 sm:space-y-5 text-[#364153] text-base sm:text-lg lg:text-3xl leading-relaxed">
          <p>FarmCheck values your privacy.</p>

          <p>
            The FarmCheck app processes personal data solely to provide and operate the service.
            This may include account information (such as name and email address), operational
            usage data related to SOP execution, and technical information required for app
            functionality.
          </p>

          <p>
            Personal data is used only for account management, service delivery, and improving the
            platform. Data is not sold or shared with third parties, except where required for hosting
            and technical operation of the app.
          </p>

          <p>
            Users have the right to access, correct, or request deletion of their personal data at any
            time.
          </p>

          <p>For privacy-related questions or requests, please contact:</p>

          <p className="font-medium text-[#1A1A1A]">Farmchecksupport@gmail.com</p>
        </div>
      </div>

    </div>
  )
}

export default PrivacyPolicy
