import React from "react";
import Container from "../../components/Container";
import { FiFileText } from "react-icons/fi";
import { LiaMobileSolid } from "react-icons/lia";
import { FaWifi } from "react-icons/fa";
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import Image from "../../components/Image";
import progress from "/progress.png";
import progressContainer from "/ProgressContainer.png";



const Features = () => {
  return (
    <div id="feature" className="py-15">
      <Container className={`bg-[#0F172B] rounded-2xl flex items-center justify-between `}>
        <div className=" px-10 w-[50%]">
          <h3 className="text-white text-4xl font-bold">
            Everything you need to run your farm efficiently
          </h3>
          <p className="text-lg text-[#90A1B9] my-6">
            We bridge the gap between complex farm operations and simple
            execution. Give your team the tools they need to succeed, right in
            their pocket.
          </p>

          <div className="grid grid-cols-12 gap-6">
            <div className="flex  gap-4 col-span-6 ">
              <div className="bg-[#F6A62D] rounded-xl h-12 p-3 flex items-center justify-center">
                <FiFileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-bold">Centralized SOPs</p>
                <p className="text-[#90A1B9] mt-1 text-sm">
                  Manage all your PDFs in one place. Ensure everyone has the
                  latest version.
                </p>
              </div>
            </div>


            <div className="flex  gap-4 col-span-6">
              <div className="bg-[#F6A62D] rounded-xl h-12 p-3 flex items-center justify-center">
                <LiaMobileSolid className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-bold">Mobile First</p>
                <p className="text-[#90A1B9] mt-1 text-sm">
                  Designed for employees on the go. Simple interface for any skill level.
                </p>
              </div>
            </div>


            <div className="flex  gap-4 col-span-6">
              <div className="bg-[#F6A62D] rounded-xl h-12 p-3 flex items-center justify-center">
                <FaWifi className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-bold">Works Offline</p>
                <p className="text-[#90A1B9] mt-1 text-sm">
                  Full access to tasks and SOPs even without an internet connection.
                </p>
              </div>
            </div>

            <div className="flex  gap-4 col-span-6">
              <div className="bg-[#F6A62D] rounded-xl h-12 p-3 flex items-center justify-center">
                <MdOutlineChatBubbleOutline  className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-bold">Team Chat</p>
                <p className="text-[#90A1B9] mt-1 text-sm">
                 Keep communication focused and contextual within tasks.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-[40%] relative overflow-hidden">
            <Image src={progress} alt="Features" className="w-full h-full object-contain rounded-r-2xl " />

            <div className="absolute bottom-8 left-8">
                <Image src={progressContainer} alt="progressContainer"  />
            </div>
        </div>
      </Container>
    </div>
  );
};

export default Features;
