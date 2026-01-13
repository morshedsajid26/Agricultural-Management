import React, { useState } from "react";
import { FaArrowLeft, FaPlus } from "react-icons/fa6";
import Breadcrumb from "../../components/Bredcumb";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import Dropdown from "../../components/Dropdown";
import { FiX } from "react-icons/fi";
import UploadPDF from "../../components/UploadPDF";
import CreateDigitalModule from "../../components/CreateDigitalModule";

const AddSOP = () => {
  const navigate = useNavigate();
  const [addCategory, setAddCategory] = useState("false");
  const [activeTab, setActiveTab] = useState("upload");
  const handleFileSelect = (file) => {
    console.log("Selected file:", file);
    // 👉 এখানে API upload করবে
  };

  return (
    <div>
      <div
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 cursor-pointer"
      >
        <FaArrowLeft className=" text-[#4A5565] " />
        <p className="text-[#4A5565]">Back to SOP List</p>
      </div>
      <div className="mt-4">
        <Breadcrumb />
        <p className="text-[#4A5565] mt-1.5">
          Add a new standard operating procedure document
        </p>
      </div>

      <div className="bg-white rounded-lg border-2 border-[#E5E7EB] p-6">
        <div className="grid grid-cols-12">
          <InputField
            inputClass={`rounded-lg`}
            label={`SOP Title`}
            placeholder={`e.g., Safety Protocols`}
            className={`col-span-12`}
          />

          <Dropdown
            placeholder={`Category/Area`}
            options={["Category 1", "Category 2", "Category 3"]}
            className={`col-span-9`}
          />

          <div className=" col-span-3 flex items-center justify-end  ">
            <FaPlus
              onClick={() => setAddCategory("true")}
              className="text-white bg-[#FB9C0B] text-3xl rounded-full  p-1 cursor-pointer"
            />{" "}
          </div>
          {addCategory === "true" && (
            <div className="fixed inset-0  bg-[#D9D9D9]/80 flex items-center justify-center z-50 ">
              <div className="bg-[#EFEFEF] rounded-3xl  pt-10 pb-10 px-10 w-[40%]">
                <div className="flex  justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#0A0A0A]">
                      Create New Category
                    </h3>
                    <p className="text-[#717182] mt-2">
                      Add a new category for your Standard Operating Procedures.
                    </p>
                  </div>
                  <div className="">
                    <FiX
                      onClick={() => setAddCategory(false)}
                      className="w-7 h-7  cursor-pointer text-[#0A0A0A] "
                    />
                  </div>
                </div>

                <InputField
                  inputClass={`rounded-lg`}
                  label={`Category Name`}
                  placeholder={`e.g., Maintenance`}
                  className={`mt-8`}
                />

                <div className="flex gap-2 justify-end mt-8 ">
                  <button
                    onClick={() => setAddCategory(false)}
                    className="py-3 px-5 font-inet   border border-[#000000]/10 text-[#0A0A0A] rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => setAddCategory(false)}
                    className="py-3 px-5 font-inet   bg-[#030213] text-white] rounded-lg cursor-pointer"
                  >
                    Add Category
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex bg-[#FFF4E5] rounded-lg p-1.5 w-fit mt-6 col-span-6">
            <button
              onClick={() => setActiveTab("upload")}
              className={`px-20 py-2 rounded-md ${
                activeTab === "upload"
                  ? "bg-[#F6A62D] text-white"
                  : "text-[#4A5565]"
              }`}
            >
              Upload PDF
            </button>

            <button
              onClick={() => setActiveTab("create")}
              className={`px-20 py-2 rounded-md ${
                activeTab === "create"
                  ? "bg-[#F6A62D] text-white"
                  : "text-[#4A5565]"
              }`}
            >
              Create Digital Module
            </button>
          </div>

          {/* Content */}
          <div className="mt-6 col-span-12">
            {activeTab === "upload" && (
              <UploadPDF onFileSelect={handleFileSelect} />
            )}
            {activeTab === "create" && <CreateDigitalModule />}
          </div>

          <p className="col-span-2 text-[#364153] my-6">Allow Managers to view this SOP</p>

          <div className="col-span-12 gap-3 flex ">
            <button className="py-3 px-5 font-inet   bg-[#F6A62D] text-white] rounded-lg cursor-pointer">
              Create SOP
            </button>

            <button className="py-3 px-5 font-inet   bg-[#E5E7EB] text-[#364153] rounded-lg cursor-pointer">
              Cancel
            </button>

          </div>


        </div>
      </div>
    </div>
  );
};

export default AddSOP;
