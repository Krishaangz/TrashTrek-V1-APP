import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Recycle, Trophy, Trees, Award, Star, 
  Globe, Users, Brain, Smartphone, MapPin,
  ArrowRight, Download, Check, Shield
} from 'lucide-react';

const Landing = () => {
  const { scrollYProgress } = useScroll();
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1000,
    height: typeof window !== 'undefined' ? window.innerHeight : 1000
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const floatingIcons = Array(12).fill(null).map((_, i) => ({
    initial: {
      x: Math.random() * dimensions.width - dimensions.width / 2,
      y: Math.random() * dimensions.height - dimensions.height / 2,
      rotate: Math.random() * 360,
      opacity: 0.15
    },
    animate: {
      x: [
        Math.random() * dimensions.width - dimensions.width / 2,
        Math.random() * dimensions.width - dimensions.width / 2,
        Math.random() * dimensions.width - dimensions.width / 2
      ],
      y: [
        Math.random() * dimensions.height - dimensions.height / 2,
        Math.random() * dimensions.height - dimensions.height / 2,
        Math.random() * dimensions.height - dimensions.height / 2
      ],
      rotate: [0, 180, 360],
      transition: {
        duration: 25 + Math.random() * 15,
        repeat: Infinity,
        ease: "linear",
        delay: Math.random() * 5
      }
    }
  }));

  const features = [
    {
      icon: Smartphone,
      title: "Standard Mode",
      description: "Real-time trash detection using advanced AI. Track collections and earn rewards instantly.",
      benefits: ["AI-powered detection", "Real-time tracking", "Instant rewards"]
    },
    {
      icon: MapPin,
      title: "Adventure Mode",
      description: "Explore designated cleanup locations with our interactive map. Complete location-based challenges.",
      benefits: ["Interactive maps", "Location challenges", "Exploration rewards"]
    },
    {
      icon: Trophy,
      title: "Challenge Mode",
      description: "Join monthly cleanup events, compete globally, and earn special achievement badges.",
      benefits: ["Global competitions", "Special badges", "Monthly events"]
    }
  ];

  const impactStats = [
    { value: "No", label: "Active Users", icon: Users },
    { value: "No", label: "Trees Planted", icon: Trees },
    { value: "0", label: "Kg Waste Collected", icon: Recycle },
    { value: "1+", label: "Countries", icon: Globe }
  ];

  const downloadButtons = [
    {
      platform: "Google Play",
      link: "/deploy",
      soon: false
    },
    {
      platform: "App Store",
      link: "/deploy",
      soon: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1A2F] to-[#1A2F4F] text-white overflow-hidden">
      {/* Floating Background Icons */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {floatingIcons.map((icon, index) => (
          <motion.div
            key={index}
            initial={icon.initial}
            animate={icon.animate}
            className="absolute left-1/2 top-1/2 will-change-transform"
          >
            <Recycle 
              className="text-[#D0FD3E]/20" 
              size={20 + Math.random() * 20} 
            />
          </motion.div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        {/* Enhanced Glowing Effects */}
        <motion.div
          className="absolute w-[800px] h-[800px] bg-[#D0FD3E]/5 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#D0FD3E] to-[#2ECC71] text-transparent bg-clip-text">
                TrashTrek
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Transform environmental cleanup into an epic adventure. Join our global community of eco-warriors making real impact through gamified conservation.
            </p>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {downloadButtons.map((button, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Link
                    to='/deploy'
                    className={`flex items-center justify-center px-6 py-3 rounded-lg text-lg transition-all duration-300 ${
                      button.soon 
                        ? 'bg-white/10 text-white cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#D0FD3E] to-[#2ECC71] text-[#0A1A2F] hover:shadow-[0_0_20px_rgba(208,253,62,0.3)]'
                    }`}
                  >
                    <Download className="mr-2" size={20} />
                    {button.platform}
                    {button.soon && <span className="ml-2 text-sm">(Coming Soon)</span>}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
              >
                <motion.div
                  className="w-12 h-12 mx-auto mb-4 bg-[#D0FD3E]/20 rounded-full flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className="text-[#D0FD3E]" size={24} />
                </motion.div>
                <h3 className="text-3xl font-bold text-[#D0FD3E] mb-2">{stat.value}</h3>
                <p className="text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            <span className="bg-gradient-to-r from-[#D0FD3E] to-[#2ECC71] text-transparent bg-clip-text">
              Game Modes
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-8 hover:bg-white/10 transition-all duration-300 border border-white/10"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 bg-[#D0FD3E]/20 rounded-full flex items-center justify-center mb-6 mx-auto"
                >
                  <feature.icon className="text-[#D0FD3E]" size={32} />
                </motion.div>
                <h3 className="text-2xl font-bold text-center mb-4">{feature.title}</h3>
                <p className="text-gray-300 text-center mb-6">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <Check className="text-[#D0FD3E] mr-2" size={16} />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#D0FD3E]/20 to-[#2ECC71]/20 rounded-2xl p-12 text-center backdrop-blur-lg relative overflow-hidden border border-white/10"
          >
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of eco-warriors worldwide in our mission to create a cleaner, greener planet through gamified conservation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#D0FD3E] to-[#2ECC71] text-[#0A1A2F] font-bold rounded-lg text-lg hover:opacity-90 transition-all duration-300 hover:shadow-[0_0_20px_rgba(208,253,62,0.3)]"
                >
                  Join Now
                  <ArrowRight className="ml-2" size={20} />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center px-8 py-4 bg-white/10 text-white rounded-lg text-lg hover:bg-white/20 transition-all duration-300"
                >
                  Learn More
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-12 bg-black/20 backdrop-blur-lg border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-[#D0FD3E] mb-4">TrashTrek</h3>
              <p className="text-gray-300">
                Making environmental cleanup engaging and rewarding through gamified conservation.
              </p>
              <div className="mt-4 flex items-center">
                <Shield className="text-[#D0FD3E] mr-2" size={16} />
                <span className="text-sm text-gray-300">Secure & Privacy Focused</span>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-[#D0FD3E] flex items-center">
                    <ArrowRight className="mr-2" size={16} />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-[#D0FD3E] flex items-center">
                    <ArrowRight className="mr-2" size={16} />
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/faqs" className="text-gray-300 hover:text-[#D0FD3E] flex items-center">
                    <ArrowRight className="mr-2" size={16} />
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy-policy" className="text-gray-300 hover:text-[#D0FD3E] flex items-center">
                    <ArrowRight className="mr-2" size={16} />
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms-conditions" className="text-gray-300 hover:text-[#D0FD3E] flex items-center">
                    <ArrowRight className="mr-2" size={16} />
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/trashtrek-rulebook" className="text-gray-300 hover:text-[#D0FD3E] flex items-center">
                    <ArrowRight className="mr-2" size={16} />
                    TrashTrek Rulebook
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-8 h-8 bg-[#D0FD3E]/20 rounded-full flex items-center justify-center mr-3"
                  >
                    <Users className="text-[#D0FD3E]" size={16} />
                  </motion.div>
                  <div>
                    <p className="text-gray-300">
                      Email: trashtrekindia@gmail.com
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-8 h-8 bg-[#D0FD3E]/20 rounded-full flex items-center justify-center mr-3"
                  >
                    <Smartphone className="text-[#D0FD3E]" size={16} />
                  </motion.div>
                  <div>
                    <p className="text-gray-300">
                      Phone: +91 62610 26345
                    </p>
                  </div>
                </li>
              </ul>
              <div className="mt-6">
                <Link 
                  to="/about"
                  className="inline-flex items-center px-4 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-all duration-300"
                >
                  <Brain className="mr-2" size={16} />
                  AI Help Center
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2025 TrashTrek. All rights reserved.
              </p>
              <div className="flex items-center space-x-4">
                <Link to="/founder" className="text-gray-400 hover:text-[#D0FD3E] text-sm">
                  Created by Krishang Saharia
                </Link>
                <span className="text-gray-600">•</span>
                <Link to="/vision" className="text-gray-400 hover:text-[#D0FD3E] text-sm">
                  Our Vision
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;