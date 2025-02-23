import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const TermsConditions = () => {
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
        <h1 className="text-3xl font-bold text-[#D0FD3E]">Terms & Conditions</h1>
      </div>

      <p className="text-gray-300 mb-8">
        Welcome to <strong>Trash Trek</strong>. By using our platform, you agree to the following terms and conditions. 
        Please read them carefully before participating in any of our cleanup missions and events.
      </p>

      {/* Terms & Conditions Sections */}
      <motion.div 
        className="group hover:shadow-[0_0_20px_rgba(208,253,62,0.3)] p-6 mb-8 rounded-lg border border-white/10 transition-all duration-300 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 bg-[#D0FD3E] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        <h2 className="text-2xl font-semibold text-[#D0FD3E]">1. Acceptance of Terms</h2>
        <p className="text-gray-400 mt-2">
          By accessing or using Trash Trek, you agree to comply with and be bound by these Terms & Conditions. If you do not agree, please refrain from using our platform.
        </p>
      </motion.div>

      <motion.div 
        className="group hover:shadow-[0_0_20px_rgba(208,253,62,0.3)] p-6 mb-8 rounded-lg border border-white/10 transition-all duration-300 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 bg-[#D0FD3E] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        <h2 className="text-2xl font-semibold text-[#D0FD3E]">2. Account Creation</h2>
        <p className="text-gray-400 mt-2">
          To participate in Trash Trek, you must create an account. You agree to provide accurate and complete information during account registration and to maintain the security and confidentiality of your login credentials.
        </p>
      </motion.div>

      <motion.div 
        className="group hover:shadow-[0_0_20px_rgba(208,253,62,0.3)] p-6 mb-8 rounded-lg border border-white/10 transition-all duration-300 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 bg-[#D0FD3E] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        <h2 className="text-2xl font-semibold text-[#D0FD3E]">3. User Responsibilities</h2>
        <p className="text-gray-400 mt-2">
          You are responsible for your behavior while using Trash Trek, and agree to engage in cleanup missions and challenges respectfully. Misconduct, including but not limited to fraud, spamming, or abusive behavior, may result in the suspension or termination of your account.
        </p>
      </motion.div>

      <motion.div 
        className="group hover:shadow-[0_0_20px_rgba(208,253,62,0.3)] p-6 mb-8 rounded-lg border border-white/10 transition-all duration-300 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 bg-[#D0FD3E] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        <h2 className="text-2xl font-semibold text-[#D0FD3E]">4. Privacy & Data Use</h2>
        <p className="text-gray-400 mt-2">
          We value your privacy. Trash Trek collects and uses data as outlined in our <a href="/privacy-policy" className="text-[#D0FD3E]">Privacy Policy</a>. This may include your location, game data, and user-generated content, which are used to improve gameplay and ensure the safety of the platform.
        </p>
      </motion.div>

      <motion.div 
        className="group hover:shadow-[0_0_20px_rgba(208,253,62,0.3)] p-6 mb-8 rounded-lg border border-white/10 transition-all duration-300 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 bg-[#D0FD3E] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        <h2 className="text-2xl font-semibold text-[#D0FD3E]">5. Rewards & Penalties</h2>
        <p className="text-gray-400 mt-2">
          You may earn rewards such as Eco-Points, badges, or virtual items based on your participation in cleanup activities. Failure to adhere to the platform’s guidelines or engaging in unethical practices may result in penalties or the removal of rewards.
        </p>
      </motion.div>

      <motion.div 
        className="group hover:shadow-[0_0_20px_rgba(208,253,62,0.3)] p-6 mb-8 rounded-lg border border-white/10 transition-all duration-300 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 bg-[#D0FD3E] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        <h2 className="text-2xl font-semibold text-[#D0FD3E]">6. Prohibited Activities</h2>
        <p className="text-gray-400 mt-2">
          You agree not to engage in any prohibited activities, including but not limited to: hacking, cheating, manipulating gameplay mechanics, spamming, or harassing other users. Violations may result in account suspension or permanent ban.
        </p>
      </motion.div>

      <motion.div 
        className="group hover:shadow-[0_0_20px_rgba(208,253,62,0.3)] p-6 mb-8 rounded-lg border border-white/10 transition-all duration-300 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 bg-[#D0FD3E] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        <h2 className="text-2xl font-semibold text-[#D0FD3E]">7. Changes to Terms</h2>
        <p className="text-gray-400 mt-2">
          Trash Trek reserves the right to modify or update these Terms & Conditions at any time. Any significant changes will be communicated to you via email or in-app notifications. By continuing to use the platform, you agree to abide by any updated terms.
        </p>
      </motion.div>

      <motion.div 
        className="group hover:shadow-[0_0_20px_rgba(208,253,62,0.3)] p-6 mb-8 rounded-lg border border-white/10 transition-all duration-300 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 bg-[#D0FD3E] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        <h2 className="text-2xl font-semibold text-[#D0FD3E]">8. Termination & Suspension</h2>
        <p className="text-gray-400 mt-2">
          Trash Trek reserves the right to suspend or terminate your account at any time if you violate these Terms & Conditions or engage in harmful behavior. Upon termination, you may lose access to your account and any associated data or rewards.
        </p>
      </motion.div>

      <motion.div 
        className="group hover:shadow-[0_0_20px_rgba(208,253,62,0.3)] p-6 mb-8 rounded-lg border border-white/10 transition-all duration-300 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 bg-[#D0FD3E] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        <h2 className="text-2xl font-semibold text-[#D0FD3E]">9. Governing Law</h2>
        <p className="text-gray-400 mt-2">
          These Terms & Conditions are governed by the laws of your jurisdiction, and any disputes arising from your use of Trash Trek shall be resolved through arbitration or courts located within the jurisdiction.
        </p>
      </motion.div>

      <div className="text-center text-gray-400 mt-8">
        <p>Last updated: February 2025 | Questions? Contact us at <span className="text-[#D0FD3E]">trashtrekindia@gmail.com</span>
        </p>
      </div>
    </motion.div>
  );
};

export default TermsConditions;
