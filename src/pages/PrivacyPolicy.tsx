import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <motion.div 
      className="container mx-auto px-4 py-8 text-white bg-[#0A1A2F] rounded-lg shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => window.history.back()}
          className="p-2 hover:bg-white/10 rounded-lg"
        >
          <ArrowLeft className="text-[#D0FD3E]" />
        </button>
        <h1 className="text-3xl font-bold text-[#D0FD3E]">Privacy Policy</h1>
      </div>

      <p className="text-gray-300 mb-8">
        At <strong>Trash Trek</strong>, your privacy is our top priority. This Privacy Policy outlines how we collect, use, and protect your data while providing you with a seamless, secure experience on our eco-gamified platform.
      </p>

      {/* Data Collection Section */}
      <motion.div 
        className="group hover:shadow-[0_0_20px_rgba(208,253,62,0.3)] p-6 mb-8 rounded-lg border border-white/10 transition-all duration-300 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 bg-[#D0FD3E] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        <h2 className="text-2xl font-semibold text-[#D0FD3E]">1. Data Collection</h2>
        <p className="text-gray-400 mt-2">
          We collect minimal data required to ensure optimal performance, including account details, gameplay progress, and environmental impact statistics. Rest assured, we do not track anything unnecessary, and your data remains in your control.
        </p>
      </motion.div>

      {/* AI & Smart Analytics Section */}
      <motion.div 
        className="group hover:shadow-[0_0_20px_rgba(208,253,62,0.3)] p-6 mb-8 rounded-lg border border-white/10 transition-all duration-300 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 bg-[#D0FD3E] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        <h2 className="text-2xl font-semibold text-[#D0FD3E]">2. AI & Smart Analytics</h2>
        <p className="text-gray-400 mt-2">
          Our AI-driven system tailors your Trash Trek experience by personalizing tasks, tracking your environmental impact, and optimizing leaderboard rankings. We ensure AI interactions are monitored for safety, and data is never misused.
        </p>
      </motion.div>

      {/* Security & Encryption Section */}
      <motion.div 
        className="group hover:shadow-[0_0_20px_rgba(208,253,62,0.3)] p-6 mb-8 rounded-lg border border-white/10 transition-all duration-300 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 bg-[#D0FD3E] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        <h2 className="text-2xl font-semibold text-[#D0FD3E]">3. Security & Encryption</h2>
        <p className="text-gray-400 mt-2">
          We use next-gen encryption to safeguard all your data, preventing unauthorized access. Rest assured, we never sell, trade, or expose your information to third parties.
        </p>
      </motion.div>

      {/* Location & Camera Access Section */}
      <motion.div 
        className="group hover:shadow-[0_0_20px_rgba(208,253,62,0.3)] p-6 mb-8 rounded-lg border border-white/10 transition-all duration-300 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 bg-[#D0FD3E] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        <h2 className="text-2xl font-semibold text-[#D0FD3E]">4. Location & Camera Access</h2>
        <p className="text-gray-400 mt-2">
          Trash Trek requires camera and location access for verifying real-world cleanup activities. We store this data only for the necessary validation period to ensure transparency and trust.
        </p>
      </motion.div>

      {/* Your Rights & Control Section */}
      <motion.div 
        className="group hover:shadow-[0_0_20px_rgba(208,253,62,0.3)] p-6 mb-8 rounded-lg border border-white/10 transition-all duration-300 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 bg-[#D0FD3E] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        <h2 className="text-2xl font-semibold text-[#D0FD3E]">5. Your Rights & Control</h2>
        <p className="text-gray-400 mt-2">
          You can delete your account and associated data at any time. Our support team is always available to assist you with any concerns you may have regarding your data.
        </p>
      </motion.div>

      <p className="text-sm text-gray-500 mt-6">
        Last updated: February 2025 | Questions? Contact us at <span className="text-[#D0FD3E]">trashtrekindia@gmail.com</span>
      </p>
    </motion.div>
  );
};

export default PrivacyPolicy;
