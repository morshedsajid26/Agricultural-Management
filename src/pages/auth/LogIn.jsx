
import React from "react";

import InputField from "../../components/InputField";
import Password from "../../components/Password";
import { Link } from "react-router-dom";
import Image from "../../components/Image";
import { MdLogin } from "react-icons/md";

const LogIn = () => {
     // 🔐 Role (later auth/context/localStorage)
  const role = "Admin"; // Admin | Owner

  const roleText = {
    Admin: {
      title: "Farm Admin",
      subtitle:"Access your farm management dashboard"
    },
    Owner: {
      title: "System Owner",
      subtitle:"Secure access to farm management platform"
    },
  };


  return (
    <main className="bg-white grid justify-center items-center overflow-y-auto hide-scrollbar py-10 px-11 rounded-3xl  ">
      <form className="gap-5 flex flex-col items-center w-[450px] ">

        <Image src="/authLogo.png" alt="logo" />
        <h3 className="font-inter font-medium text-[32px] text-[#333333] ">
          {roleText[role]?.title}  Login 
        </h3>

        <p className="font-inter  text-[#333333]">
          {roleText[role]?.subtitle}
        </p>

        
        <InputField
          inputClass={`rounded-lg`}
          label={`Email Address `}
          placeholder={``}
        />
        <Password
          label="Password"
          inputClass={`rounded-lg`}
          // placeholder="Enter your password"
        />

        <a href="/auth/reset/password" className='text-[#F6A62D]'>Forgot Password?</a>

       

        <Link className="w-full" href="/staff/customer/platform">
          <button className="bg-[#F6A62D] text-[#ffffff]  w-full py-3 rounded-lg cursor-pointer mt-12 flex items-center justify-center gap-2 ">
            <MdLogin />
          Login as {roleText[role]?.title} 
          </button>
        </Link>

      </form>
    </main>
  );
};

export default LogIn;
