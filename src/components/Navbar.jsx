"use client";
import React, { useState } from "react";
import Container from "./Container";
import { FiX, FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import Image from "./Image";
import logo from "/logo.png";

const navitems = [
  { name: "Home" ,href:"/" },
  { name: "Featured", href:"#feature" },
  { name: "Offer", href:"#offer" },
  { name: "About us" , href:"#aboutUs" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="py-5">
      <Container>
        <div className="md:bg-transparent py-1.5 rounded-2xl shadow md:border md:border-black/20 flex items-center justify-between  px-6">

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-3xl cursor-pointer "
            onClick={() => setOpen(!open)}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>

          <Image src={logo} alt='logo'  />

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center justify-end gap-8 ">
            {navitems.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className="py-2 px-2 font-inter text-2xl font-medium gap-4 cursor-pointer rounded-lg transition-all duration-200"
              >
                {item.name}
              </Link>
            ))}

            
          </ul>

          <Link to="/auth/login" className="hidden md:block">
            <button className="bg-[#F6A62D] text-[#010101]  text-xl px-4 font-inter py-3 rounded-2xl cursor-pointer hidden md:block">
              Login for business
            </button>
          </Link>
        </div>

        {/* Mobile Slide Menu */}
        <div
          className={`md:hidden bg-[#F6A62D] rounded-2xl  transition-all duration-300 overflow-hidden ${
            open ? "max-h-[15%] py-8 mt-2 border border-black/20" : "max-h-0 "
          }`}
        >
          <ul className="flex flex-col items-start gap-4 px-6">
            {navitems.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className="py-2 px-2 font-inter text-xl font-medium w-full rounded-lg"
              >
                {item.name}
              </Link>
            ))}

            

            <Link href="/businessowner/signin" className="mt-10  w-full">
              <button className="bg-[#F6A62D] w-full text-[#010101]  text-lg px-4 py-3 rounded-xl mt-3">
                Login for business
              </button>
            </Link>
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;