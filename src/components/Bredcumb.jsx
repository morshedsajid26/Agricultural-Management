import React from "react";
import { useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const { pathname } = useLocation();

  const pathParts = pathname.split("/").filter(Boolean);

  // ❌ only remove dashboard root
  const filteredParts = pathParts.filter(
    (part) => part.toLowerCase() !== "admin"
  );

  // ✅ always show last two if available
  const displayParts =
    filteredParts.length >= 2
      ? filteredParts.slice(-2)
      : filteredParts;

  const formatWord = (word) => {
    if (word.toLowerCase() === "sop") return "SOP";

    return word
      .replaceAll("-", " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const title = displayParts.map(formatWord).join(" ");

  return (
    <div className="flex items-center">
      <h3 className="font-inter text-[#0A0A0A] text-3xl whitespace-nowrap">
        {title}
      </h3>
    </div>
  );
};

export default Breadcrumb;
