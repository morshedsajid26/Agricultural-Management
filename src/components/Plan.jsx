"use client";

import React, { useState } from "react";
import ToggleButton from "./ToggleButton";

const Card = ({
  name,
  price,
  isAnnual,
  employees,
  yearlyPrice,
  monthlyPrice,
  trialDays,
}) => {
  return (
    <div className="bg-white rounded-lg border-2 border-[#E5E7EB] py-8 px-6 flex flex-col hover:shadow-lg transition-all duration-300 col-span-12 md:col-span-4">
      
      {/* Plan Name */}
      <div>
        <p className="text-2xl text-[#0A0A0A]">{name}</p>
        <p className="text-[#4A5565] mt-1">
          Up to {employees} employees
        </p>
      </div>

      {/* Price */}
      <div className="flex flex-col my-4">
        <div className="flex items-end">
          <p className="text-4xl text-[#0A0A0A]">${price}</p>
          <span className="text-[#4A5565] ml-1">
            /{isAnnual ? "Year" : "Month"}
          </span>
        </div>

        {isAnnual && (
          <p className="text-[#4A5565] mt-1">
            save ${yearlyPrice - monthlyPrice * 12}
          </p>
        )}
      </div>

      {/* Trial */}
      <div className="bg-[#EFF6FF] p-3 rounded-lg">
        <p className="text-[#1447E6]">
          {trialDays} days free trial
        </p>
      </div>

      {/* Placeholder Features */}
      <ul className="space-y-4 mb-14 mt-8">
        <li className="flex items-start">
          <span className="text-[#00A63E] text-lg mr-2">✔</span>
          <span className="text-[#364153]">
            Up to {employees} employees
          </span>
        </li>
        <li className="flex items-start">
          <span className="text-[#00A63E] text-lg mr-2">✔</span>
          <span className="text-[#364153]">
            Task Management
          </span>
        </li>
        <li className="flex items-start">
          <span className="text-[#00A63E] text-lg mr-2">✔</span>
          <span className="text-[#364153]">
            SOP Management
          </span>
        </li>
      </ul>
    </div>
  );
};

const Plan = ({ plans }) => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div>
      {/* Toggle */}
      <div className="flex items-center justify-center gap-2 mt-10">
        <ToggleButton isAnnual={isAnnual} setIsAnnual={setIsAnnual} />

        <div className="bg-[#FFF6E9] w-max p-1 rounded-lg">
          <p className="text-[#F6A62D]">Save 17%</p>
        </div>
      </div>

      <p className="text-[#0A0A0A] text-xl mt-10 mb-4">
        Available Plans
      </p>

      {/* Cards */}
      <div className="grid grid-cols-12 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            name={plan.name}
            employees={plan.employeeLimit}
            price={
              isAnnual
                ? plan.priceYearly
                : plan.priceMonthly
            }
            isAnnual={isAnnual}
            monthlyPrice={plan.priceMonthly}
            yearlyPrice={plan.priceYearly}
            trialDays={plan.trialDays}
          />
        ))}
      </div>
    </div>
  );
};

export default Plan;
