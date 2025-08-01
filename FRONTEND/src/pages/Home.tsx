
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import TrustSection from '../components/sections/TrustSection';
import BenefitsSection from '../components/sections/BenefitsSection';
import ServicesSection from '../components/sections/ServicesSection';
import AboutSection from '../components/sections/AboutSection';
import ReportsSection from '../components/sections/ReportsSection';
import ContactSection from '../components/sections/ContactSection';
import AnimatedSlideInHeading from '../components/animations/AnimatedSlideInHeading';

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <TrustSection />
      <BenefitsSection />
      <ServicesSection />
      <AboutSection />
      <ReportsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
