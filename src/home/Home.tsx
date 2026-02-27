import Algorithm from "../components/Algorithm";
import Benefits from "../components/Benefits";
import CompaniesMarquee from "../components/CompaniesMarquee";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Navbar from "../components/Nav";


export default function Home() {
  return (
    <div className="bg-slate-50 text-slate-800 overflow-x-hidden" dir="rtl">
      <Navbar />
      <Hero />
      <CompaniesMarquee />
      <HowItWorks />
      <Algorithm />
      <Benefits /> 
      <CTA />
      <Footer />
    </div>
  )
}
