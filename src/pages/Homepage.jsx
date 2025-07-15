import React from "react";
import HeroSection from "../components/user/components/HeroSection";
import FeaturedAdventures from "../components/user/components/FeaturedAdventures";
import HowItWorks from "../components/user/components/HowItWorks";
import Testimonials from "../components/user/components/Testimonials";
import ActivitySection from "../components/user/layouts/ActivitySection";

export default function HomePage() {
  const handleBooking = (id) => {
    console.log("Booking activity ID:", id);
    // You can navigate or call a booking service here
  };

  return (
    <>
      <HeroSection />
      <FeaturedAdventures />     
      <HowItWorks />
      <ActivitySection />
      <Testimonials />
    </>
  );
}
