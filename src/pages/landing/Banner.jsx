import React from "react";
import bannerPhone from "/bannerPhone.png";
import { motion } from "framer-motion";
import Container from "../../components/Container";
import Image from "../../components/Image";

const Banner = () => {
  return (
    <div>
      <Container className="md:border border-black/10 md:bg-[#F8FAFC] rounded-2xl md:flex items-center justify-between px-1 py-3 md:p-6 mt-6 overflow-hidden">
        {/* Left Side (Text content) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:w-[50%]"
        >
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false, amount: 0.2 }}
            className="font-inter font-semibold text-2xl md:text-[40px] text-center md:text-left "
          >
            A simple way to manage farm
            <span className="text-[#F6A62D]"> SOP’s & Tasks </span>
            and team communication
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: false, amount: 0.2 }}
            className="font-inter md:text-xl text-[#262626] mb-8 mt-4 text-center md:text-left"
          >
            Built for diary farms. Works offline. Easy for every employee. Ensure consistent procedures and reduce mistakes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: false, amount: 0.2 }}
            className="flex items-center justify-center md:justify-start md:gap-8 gap-2"
          >
            <button className="bg-[#F6A62D] text-[#010101] font-bold px-12 md:px-15 font-inter py-3 rounded-2xl cursor-pointer hover:scale-105 transition-transform duration-300">
              Get Started
            </button>
            
          </motion.div>
        </motion.div>

        {/* Right Side (Image) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex justify-center mt-8 md:mt-0"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <Image src={bannerPhone} alt="banner" />
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Banner;
