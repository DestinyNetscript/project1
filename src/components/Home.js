import Hero from "../components/Hero";
import Testimonial from "../components/Testimonial/Testimonial";
import PowerfullData from "../components/Data/PowerfullData";
import TestimonialData from "../components/Testimonial/TestimonialData";
import TestimonialData2 from "../components/Testimonial/TestimonialData2";
import TestimonialData3 from "../components/Testimonial/TestimonialData3";
import TestimonialData4 from "../components/Testimonial/TestimonialData4";
import ContentData from "../components/Data/ContentData";
import ContentData2 from "../components/Data/ContentData2";
import ContentData3 from "../components/Data/ContentData3";
import Services from "../components/Services/Services";
import ServicesData from "../components/Services/ServicesData";
import Portfolio from "../components/Portfolio/Portfolio";
import PortfolioData from "../components/Portfolio/PortfolioData";
import Founder from "../components/Founder/Founder";
import FounderData from "../components/Founder/FounderData";
import Founder2 from "../components/Founder/Founder2";
import FounderData2 from "../components/Founder/FounderData2";
import Faq from "../components/Faq/Faq";
import CaseStudy from "../components/CaseStudy/CaseStudy";
import CaseStudyData from "../components/CaseStudy/CaseStudyData";
import FaqData from "../components/Faq/FaqData"; 
import Revenue from "../components/Revenue/Revenue";
import Footer from "../components/Footer";
import Slickslider from "../components/Slider/Slickslider";
import Data from "../components/Slider/Data";
import RevenueData from "../components/Revenue/RevenueData";

function Home() { 
  return (
    <>
      <Hero/>
      <Testimonial data={TestimonialData}/>
      <PowerfullData data={ContentData}/>
      <Testimonial data={TestimonialData2}/>
      <PowerfullData data={ContentData2}/>
      <Testimonial data={TestimonialData3}/>
      <PowerfullData data={ContentData3}/>
      <Testimonial data={TestimonialData4}/>
      <Services data={ServicesData}/>
      <Portfolio data={PortfolioData}/>
      <Founder data={FounderData}/>
      <Founder2 data={FounderData2}/>
      <CaseStudy data={CaseStudyData}/>
      <Revenue data={RevenueData}/>
      <Slickslider data={Data}/>
      <Faq data={FaqData}/>
    </> 
  )
}

export default Home;