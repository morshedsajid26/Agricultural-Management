import React from "react";
import { useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const { pathname } = useLocation();

  const pathParts = pathname.split("/").filter(Boolean);

  // last 2 parts: sop + management
  const lastTwo = pathParts.slice(-2);

  const formatWord = (word) => {
    if (word.toLowerCase() === "sop") {
      return "SOP"; // 🔥 only SOP uppercase
    }
    return word
      .replaceAll("-", " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const title = lastTwo.map(formatWord).join(" ");

  return (
    <div className="flex items-center">
      <h3 className="font-inter text-[#000000] text-2xl whitespace-nowrap">
        {title}
      </h3>
    </div>
  );
};

export default Breadcrumb;
