import React from "react";

import HeroSection from "./HeroSection";
import FeaturedProducts from "./FeaturedProducts";

import iPhone from "../../assets/iphone-14-pro.webp";
import Mac from "../../assets/mac-system-cut.jfif";

const HomePage = () => {
  return (
    <>
      <HeroSection
        title="Buy iPhone 14 pro"
        subtitle="Experience the power of the latest iPhone 14 with out most pro camera ever."
        link="/product/6739b55038a6736ea0981f53"
        alt="iPhone 14 Pro"
        image={iPhone}
      />
      <FeaturedProducts />
      <HeroSection
        title="Build the ultimate setup"
        subtitle="You can add Studio Display and colour-Matched Magig accessories to your bag after configure your Mac mini"
        link="/product/6739b55038a6736ea0981f5b"
        alt="Mac"
        image={Mac}
      />
    </>
  );
};

export default HomePage;
