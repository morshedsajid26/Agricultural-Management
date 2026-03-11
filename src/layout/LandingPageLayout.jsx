import { Ban } from "lucide-react";
import React from "react";
import Banner from "../pages/landing/Banner";
import Navbar from "../components/Navbar";
import Features from "../pages/landing/Features";
import SetupSteps from "../pages/landing/SetupSteps";

const LandingPageLayout = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <Features/>
      <SetupSteps/>
    </div>
  );
};

export default LandingPageLayout;
