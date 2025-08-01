
import { Link } from 'react-router-dom';
import { Shield, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  // Smooth scroll handler for services
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector('#services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-slate-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full bg-gray-800 bg-opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <Shield className="h-16 w-16 text-blue-400 mx-auto mb-6 animate-pulse" />
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          <motion.span
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="block"
          >
            Secure Your Business with
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-blue-400 block"
          >
            VAPT Services
          </motion.span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-100 mb-8 max-w-3xl mx-auto leading-relaxed">
          <motion.span
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="block"
          >
            Professional Vulnerability Assessment and Penetration Testing
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="block"
          >
            to identify security weaknesses before hackers do.
          </motion.span>
        </p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <a
            href="#contact"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Book Free Consultation
          </a>
          <a
            href="#services"
            className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            onClick={handleSmoothScroll}
          >
            View Services
          </a>
        </motion.div>

        {/* Trust indicators */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-16">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1">500+</div>
            <div className="text-sm text-slate-200">Tests Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1">24/7</div>
            <div className="text-sm text-slate-200">Support</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1">ISO</div>
            <div className="text-sm text-slate-200">Certified</div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-0.25 left-1/2 transform -translate-x-1/2">
          <ArrowDown className="h-20 w-8 text-slate-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
