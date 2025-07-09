import React from "react";
import Hero from "./Hero";
import Categories from "./Categories";
import LiveAuctions from "./LiveAuctions";
import PromoBanner from "./PromoBanner";
import FeaturedAuctions from "./FeaturedAuctions";
import CounDown from "./Countdown";
import Testimonials from "./Testimonials";
import Newsletter from "../Common/Newsletter";

const Home = () => {
  return (
    <main>
      <Hero />
      <Categories />
      <LiveAuctions />
      <PromoBanner />
      <FeaturedAuctions />
      <CounDown />
      <Testimonials />
      <Newsletter />
    </main>
  );
};

export default Home;
