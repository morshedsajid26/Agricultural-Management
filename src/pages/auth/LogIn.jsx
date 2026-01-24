import React, { useState } from "react";
import { Link } from "react-router-dom";

import InputField from "../../components/InputField";
import Password from "../../components/Password";
import Image from "../../components/Image";

import { MdLogin } from "react-icons/md";

const LogIn = () => {
  // 🔐 ROLE STATE
  const [role, setRole] = useState("Admin"); // Admin | Owner

  // 🔹 Role based text
  const roleText = {
    Admin: {
      title: "Farm Admin",
      subtitle: "Access your farm management dashboard",
    },
    Owner: {
      title: "System Owner",
      subtitle: "Secure access to farm management platform",
    },
  };

  // 🔀 Role change handler
  const handleRoleChange = (newRole) => {
    setRole(newRole);
  };

  return (
    <main className="bg-white grid justify-center items-center overflow-y-auto hide-scrollbar py-10 px-11 rounded-3xl">
      <form className="gap-5 flex flex-col items-center w-[450px]">
        {/* Logo */}
        <Image src="/authLogo.png" alt="logo" />

        {/* Title */}
        <h3 className="font-inter font-medium text-[32px] text-[#333333]">
          {roleText[role].title} Login
        </h3>

        {/* Subtitle */}
        <p className="font-inter text-[#333333]">
          {roleText[role].subtitle}
        </p>

        {/* Email */}
        <InputField
          type="email"
          label="Email Address"
          inputClass="rounded-lg"
        />

        {/* Password */}
        <Password
          label="Password"
          inputClass="rounded-lg"
        />

        {/* Forgot password */}
        <Link
          to="/auth/reset/password"
          className="text-[#F6A62D] self-end text-sm"
        >
          Forgot Password?
        </Link>

        {/* 🔀 ROLE SWITCH */}
        <div className="mt-4 flex gap-2 w-full">
          {["Owner", "Admin"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => handleRoleChange(r)}
              className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition cursor-pointer
                ${
                  role === r
                    ? "bg-[#F6A62D] text-white"
                    : "bg-[#F1F5F9] text-[#364153]"
                }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* LOGIN BUTTON */}
        <Link
          to={role === "Owner" ? "/" : "/admin/home"}
          className="w-full"
        >
          <button
            type="button"
            className="bg-[#F6A62D] text-white w-full py-3 rounded-lg cursor-pointer mt-8 flex items-center justify-center gap-2"
          >
            <MdLogin />
            Login as {roleText[role].title}
          </button>
        </Link>
      </form>
    </main>
  );
};

export default LogIn;
