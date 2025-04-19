import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import HeroSection from "@/components/Home/HeroSection";
import FeaturesSection from "@/components/Home/FeaturesSection";
import HowItWorksSection from "@/components/Home/HowItWorks";
import TestimonialsSection from "@/components/Home/Testimonails";
import FaqSection from "@/components/Home/FaqSection";
import CtaSection from "@/components/Home/CtaSection";

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <FeaturesSection/>
      <HowItWorksSection/>
      <TestimonialsSection/>
      <FaqSection/>
      <CtaSection/>
    </div>
  );
};

export default Home;
