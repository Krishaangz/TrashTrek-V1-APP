import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const TrashTrekRulebook = () => {
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
        <h1 className="text-3xl font-bold text-[#D0FD3E]">Trash Trek Rulebook</h1>
      </div>

      <p className="text-gray-300 mb-8">
        Welcome to the <strong>Trash Trek</strong> Rulebook. This document outlines the guidelines and rules that ensure a fun and fair experience for all participants in our eco-friendly missions and challenges.
      </p>

      {/* Rulebook Sections */}
      <motion.div 
        className="group hover:shadow-[0_0_20px_rgba(208,253,62,0.3)] p-6 mb-8 rounded-lg border border-white/10 transition-all duration-300 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 bg-[#D0FD3E] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        <h2 className="text-2xl font-semibold text-[#D0FD3E]">1. General Guidelines</h2>
        <p className="text-gray-400 mt-2">
          All users must adhere to the following general guidelines when participating in Trash Trek missions and challenges:
        </p>
        <ul className="list-disc pl-6 text-gray-400">
          <li>Respect all participants and the environment.</li>
          <li>Ensure that all trash collection is safe and appropriate.</li>
          <li>Follow the instructions provided by the app for each mission.</li>
          <li>Use the app’s reporting feature to flag inappropriate behavior or content.</li>
        </ul>
      </motion.div>

      <motion.div 
        className="group hover:shadow-[0_0_20px_rgba(208,253,62,0.3)] p-6 mb-8 rounded-lg border border-white/10 transition-all duration-300 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 bg-[#D0FD3E] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        <h2 className="text-2xl font-semibold text-[#D0FD3E]">2. Mission Participation</h2>
        <p className="text-gray-400 mt-2">
          To participate in a mission, you must:
        </p>
        <ul className="list-disc pl-6 text-gray-400">
          <li>Download and sign in to the TrashTrek app.</li>
          <li>Select the desired mission from the available options.</li>
          <li>Follow the guidelines provided for the mission location.</li>
          <li>Use the app’s tracking features to confirm your progress.</li>
        </ul>
      </motion.div>

      <motion.div 
        className="group hover:shadow-[0_0_20px_rgba(208,253,62,0.3)] p-6 mb-8 rounded-lg border border-white/10 transition-all duration-300 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 bg-[#D0FD3E] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        <h2 className="text-2xl font-semibold text-[#D0FD3E]">3. Proper Cleanup Protocol</h2>
        <p className="text-gray-400 mt-2">
          For a successful cleanup:
        </p>
        <ul className="list-disc pl-6 text-gray-400">
          <li>Ensure that all collected trash is disposed of responsibly.</li>
          <li>Use appropriate tools and wear protective gear when necessary.</li>
          <li>Follow local laws and regulations regarding waste disposal.</li>
        </ul>
      </motion.div>

      <motion.div 
        className="group hover:shadow-[0_0_20px_rgba(208,253,62,0.3)] p-6 mb-8 rounded-lg border border-white/10 transition-all duration-300 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 bg-[#D0FD3E] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        <h2 className="text-2xl font-semibold text-[#D0FD3E]">4. Respect for the Environment</h2>
        <p className="text-gray-400 mt-2">
          Always prioritize environmental preservation:
        </p>
        <ul className="list-disc pl-6 text-gray-400">
          <li>Avoid disturbing wildlife or damaging natural habitats.</li>
          <li>Be mindful of weather conditions and avoid risky situations.</li>
          <li>Use eco-friendly cleaning materials wherever possible.</li>
        </ul>
      </motion.div>

      <motion.div 
        className="group hover:shadow-[0_0_20px_rgba(208,253,62,0.3)] p-6 mb-8 rounded-lg border border-white/10 transition-all duration-300 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 bg-[#D0FD3E] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        <h2 className="text-2xl font-semibold text-[#D0FD3E]">5. Inappropriate Behavior</h2>
        <p className="text-gray-400 mt-2">
          Any of the following actions will result in immediate removal from the platform:
        </p>
        <ul className="list-disc pl-6 text-gray-400">
          <li>Harassment or abusive behavior towards other users.</li>
          <li>Deliberate misuse of the app’s features.</li>
          <li>Any activity that negatively impacts the reputation or safety of the TrashTrek community.</li>
        </ul>
      </motion.div>

      <motion.div 
        className="group hover:shadow-[0_0_20px_rgba(208,253,62,0.3)] p-6 mb-8 rounded-lg border border-white/10 transition-all duration-300 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 bg-[#D0FD3E] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        <h2 className="text-2xl font-semibold text-[#D0FD3E]">6. Rewards & Recognition</h2>
        <p className="text-gray-400 mt-2">
          Participants earn Eco-Points based on their engagement in cleanup missions. Points are awarded for:
        </p>
        <ul className="list-disc pl-6 text-gray-400">
          <li>Completing cleanup tasks successfully.</li>
          <li>Contributing positively to the community.</li>
          <li>Participating in challenges and leaderboards.</li>
        </ul>
        Eco-Points can be redeemed for rewards such as tree planting or rewards in the TrashTrek Marketplace.
      </motion.div>

      <motion.div 
        className="group hover:shadow-[0_0_20px_rgba(208,253,62,0.3)] p-6 mb-8 rounded-lg border border-white/10 transition-all duration-300 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 bg-[#D0FD3E] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        <h2 className="text-2xl font-semibold text-[#D0FD3E]">7. Safety First</h2>
        <p className="text-gray-400 mt-2">
          Ensure your safety during all missions:
        </p>
        <ul className="list-disc pl-6 text-gray-400">
          <li>Use the app’s safety tips for guidance before starting any mission.</li>
          <li>Report any hazardous conditions immediately through the app.</li>
          <li>Never engage in activities that put your health or safety at risk.</li>
        </ul>
      </motion.div>

      <p className="text-sm text-gray-500 mt-6">
        Last updated: February 2025 | Questions? Contact us at <span className="text-[#D0FD3E]">trashtrekindia@gmail.com</span>
      </p>
    </motion.div>
  );
};

export default TrashTrekRulebook;
