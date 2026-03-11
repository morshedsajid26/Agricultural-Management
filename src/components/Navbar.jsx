"use client";
import React, { useState } from "react";
import Container from "./Container";
import { FiX, FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import Image from "./Image";
import logo from "/logo.png";
import { motion, AnimatePresence } from "framer-motion";

const navitems = [
  { name: "Home" ,href:"/" },
  { name: "Featured", href:"#feature" },
  { name: "Offer", href:"#offer" },
  { name: "About us" , href:"#aboutUs" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="py-6 relative z-[100]">
      <Container>
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="md:bg-white/80 md:backdrop-blur-md py-3 rounded-2xl shadow-sm md:border md:border-black/5 flex items-center justify-between px-6"
        >

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-3xl cursor-pointer p-2 rounded-xl hover:bg-slate-100 transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>

          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image src={logo} alt='logo' className="h-10 md:h-12 w-auto" />
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center justify-end gap-1 ">
            {navitems.map((item, index) => (
              <motion.li key={index} whileHover={{ y: -2 }}>
                <Link
                  to={item.href}
                  className="py-2 px-4 font-inter text-lg font-medium text-slate-600 hover:text-[#F6A62D] transition-colors rounded-lg"
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="hidden md:block"
          >
            <Link to="/auth/login">
              <button className="bg-[#F6A62D] text-white font-bold text-base px-6 py-3 rounded-xl cursor-pointer shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 transition-shadow">
                Login for business
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Mobile Slide Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white mt-4 rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
            >
              <ul className="flex flex-col items-start gap-2 p-6">
                {navitems.map((item, index) => (
                  <motion.li 
                    key={index} 
                    className="w-full"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setOpen(false)}
                      className="py-3 px-4 font-inter text-lg font-medium text-slate-700 hover:bg-orange-50 hover:text-[#F6A62D] block rounded-xl transition-all"
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}

                <motion.div 
                  className="w-full pt-4 mt-2 border-t border-slate-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link to="/auth/login" onClick={() => setOpen(false)}>
                    <button className="bg-[#F6A62D] w-full text-white font-bold text-lg px-4 py-4 rounded-xl shadow-lg shadow-orange-500/20">
                      Login for business
                    </button>
                  </Link>
                </motion.div>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
};

export default Navbar;