import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, MapPin, Trophy, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Deploy = () => {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  const legalItems = [
    {
      title: "Privacy Policy",
      content: "We value your privacy and ensure your data is protected. Read our full Privacy Policy for details on how we handle your information.",
      link: "/privacy-policy"
    },
    {
      title: "Terms & Conditions",
      content: "By using TrashTrek, you agree to our terms and conditions. Review our guidelines to understand user responsibilities and platform rules.",
      link: "/terms-conditions"
    },
    {
      title: "TrashTrek Rulebook",
      content: "Our rulebook provides the do's and don'ts for participating in TrashTrek's cleanup missions and challenges. Ensure a fair and engaging experience for all!",
      link: "/trashtrek-rulebook"
    },
  ];

  const benefits = [
    "Advanced AI-powered trash detection",
    "Real-time tracking and rewards",
    "Interactive community challenges",
    "Location-based cleanup missions"
  ];

  const flashingVariants = {
    initial: { opacity: 0.7, x: 0 },
    animate: (index: number) => ({
      opacity: [0.7, 1, 0.7],
      x: [0, 5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        delay: index * 0.5
      }
    })
  };

  const dotVariants = {
    initial: { scale: 1 },
    animate: (index: number) => ({
      scale: [1, 1.3, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        delay: index * 0.5
      }
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-[#D0FD3E]">Get Started</h1>
        <motion.button 
          className="px-8 py-3 bg-[#D0FD3E] text-[#0A1A2F] rounded-lg font-medium text-lg"
          whileHover={{ 
            scale: 1.05,
            backgroundColor: "#E0FD4E",
            transition: { duration: 0.2 }
          }}
          whileTap={{ 
            scale: 0.95,
            transition: { duration: 0.1 }
          }}
        >
          Download TrashTrek
        </motion.button>
      </div>
      
      {/* Game Modes Section - Unchanged */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[{
          title: "Standard Mode",
          description: "Real-time trash detection and collection tracking in your area.",
          icon: Smartphone,
        }, {
          title: "Adventure Mode",
          description: "Explore and clean up designated locations using our interactive map.",
          icon: MapPin,
        }, {
          title: "Challenge Mode",
          description: "Participate in monthly cleanup events and compete for bonus points.",
          icon: Trophy,
        }].map((item, index) => (
          <motion.div
            key={index}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 cursor-pointer"
            whileHover={{ 
              scale: 1.02,
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.98,
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              transition: { duration: 0.1 }
            }}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <motion.div 
                className="w-16 h-16 rounded-full bg-[#D0FD3E]/20 flex items-center justify-center"
                whileHover={{ 
                  backgroundColor: "rgba(208, 253, 62, 0.3)",
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  <item.icon className="text-[#D0FD3E]" size={32} />
                </motion.div>
              </motion.div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Updated Why Use Our App Section with Flashing Animations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-12 bg-white/10 backdrop-blur-lg rounded-xl p-6"
      >
        <h2 className="text-2xl font-bold mb-4 text-[#D0FD3E]">Why Use Our App?</h2>
        <ul className="space-y-4">
          {benefits.map((benefit, index) => (
            <motion.li
              key={index}
              className="flex items-center space-x-3 group"
              variants={flashingVariants}
              initial="initial"
              animate="animate"
              custom={index}
            >
              <motion.span
                variants={dotVariants}
                initial="initial"
                animate="animate"
                custom={index}
                className="w-2 h-2 bg-[#D0FD3E] rounded-full"
              />
              <span className="text-gray-300 group-hover:text-[#D0FD3E] transition-colors duration-300">
                {benefit}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Legal Section - Unchanged */}
      <div className="mt-12 bg-white/10 backdrop-blur-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-[#D0FD3E]">Legal & Privacy</h2>
        <p className="text-gray-300 mb-6">Your privacy and security are important to us. Below are our policies and guidelines:</p>
        
        <div className="space-y-4">
          {legalItems.map((item, index) => (
            <div key={index} className="bg-[#1A2B3C] rounded-lg p-4">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection(index)}>
                <h3 className="text-lg font-semibold text-[#D0FD3E]">{item.title}</h3>
                <motion.div animate={{ rotate: openSection === index ? 180 : 0 }}>
                  <ChevronDown className="text-[#D0FD3E]" size={24} />
                </motion.div>
              </div>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: openSection === index ? 'auto' : 0, opacity: openSection === index ? 1 : 0 }}
                className="overflow-hidden text-gray-300 mt-2"
              >
                {item.content}
                <div className="mt-2">
                  <Link
                    to={item.link}
                    className="block mt-2 px-4 py-2 bg-[#D0FD3E] text-[#0A1A2F] rounded-lg font-medium text-center hover:opacity-90 transition-opacity"
                  >
                    Read More
                  </Link>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Deploy;