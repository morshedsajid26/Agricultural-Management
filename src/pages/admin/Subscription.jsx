import React from "react";
import Breadcrumb from "../../components/Bredcumb";
import Plan from "../../components/Plan";
import PlanList from "../../components/PlanList";
import { BsWallet2 } from "react-icons/bs";

const Subscription = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex  items-center gap-2">
            <Breadcrumb />
            <p className="text-[#0A0A0A] text-3xl">& Biiling</p>
          </div>
          <p className="text-[#4A5565] mt-1.5">
            Manage your farm's subscription and payment details
          </p>
        </div>

        <div className="bg-[#FFF6E9] w-max p-2">
          <p className="text-[#0A0A0A] "> Next renewal date : 26-01-2026</p>
        </div>
      </div>

      <Plan />
      <PlanList />

      <div className=" mt-12">
        <p className="text-xl text-[#0A0A0A] ">Payment Method</p>

        <div className="bg-white rounded-lg border-2 border-[#E5E7EB] mt-4 p-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-[#FFF6E9] p-3 rounded-lg">
              <BsWallet2 className="text-[#F6A62D] w-6 h-6" />
            </div>
            <div>
              <p className="text-[#101828]">Visa ending in 1234</p>
              <p className="text-[#6A7282]">Expires 12/2027</p>
            </div>
          </div>

          <div className="bg-[#FFF6E9] w-max p-2 rounded-lg">
            <p className="text-[#F6A62D]">Update</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
