import React from "react";
import Banner from "../pages/landing/Banner";
import Navbar from "../components/Navbar";
import Features from "../pages/landing/Features";
import SetupSteps from "../pages/landing/SetupSteps";
import PowerfullFeature from "../pages/landing/PowerfullFeatures";
import AppFeature from "../pages/landing/AppFeature";
import DownloadApp from "../pages/landing/DownloadApp";

const LandingPageLayout = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <Features/>
      <SetupSteps/>
      <PowerfullFeature/>
      <AppFeature/>
      <DownloadApp/>
    </div>
  );
};

export default LandingPageLayout;
