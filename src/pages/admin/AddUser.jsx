import React from "react";
import InputField from "../../components/InputField";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Bredcumb";
import Dropdown from "../../components/Dropdown";

const AddUser = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 cursor-pointer"
      >
        <FaArrowLeft className=" text-[#4A5565] " />
        <p className="text-[#4A5565]">Back to User List</p>
      </div>
      <div className="mt-4">
        <Breadcrumb />
        <p className="text-[#4A5565] mt-1.5">Create a new employee or manager account</p>
      </div>
      <div className="bg-white p-6 rounded-lg border-2 border-[#E5E7EB] flex flex-col gap-6 mt-6">
        <InputField
          inputClass={`rounded-lg`}
          label={`Full Name`}
          placeholder={`e.g., John Smith`}
        />

        <InputField
          inputClass={`rounded-lg`}
          label={`Email Address`}
          placeholder={`john@farm.com`}
        />
        <Dropdown
          label={`Role`}
          placeholder={`Select Role`}
          options={["Manager", "Employee"]}
        />

        <button className="bg-[#F6A62D] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#e5942b] cursor-pointer flex justify-center mt-6">
          Create User
        </button>
      </div>
    </div>
  );
};

export default AddUser;
