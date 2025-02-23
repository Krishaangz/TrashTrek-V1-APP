import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Info, MessageCircle, AlertTriangle, File, Video, Mic, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { aiResponses } from '../data/aiResponses';
import toast from 'react-hot-toast';
import { useAuthStore } from '../stores/authStore';

const AboutUs = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [issueType, setIssueType] = useState('Bug Report');
  const [issueDescription, setIssueDescription] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [showAIError, setShowAIError] = useState(false);

  // Animation variants for the quote
  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const authorVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.2
      }
    }
  };

  //New animation variants for mission cards
  const missionCardVariants = {
    initial: { 
      scale: 1,
      boxShadow: "0px 0px 0px rgba(208, 253, 62, 0)"
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0px 0px 20px rgba(208, 253, 62, 0.3)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    tap: {
      scale: 0.95,
      boxShadow: "0px 0px 10px rgba(208, 253, 62, 0.2)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  // Mission points array
  const missionPoints = [
    {
      id: 1,
      title: "Gamify Environmental Cleanup",
      description: "Transform waste collection into an engaging, rewarding experience"
    },
    {
      id: 2,
      title: "Educate & Inspire",
      description: "Spread awareness about sustainable practices and their impact"
    },
    {
      id: 3,
      title: "Build Global Community",
      description: "Connect eco-conscious individuals worldwide"
    }
  ];

  const handleAIQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (aiQuery.trim().length < 3) {
      setShowAIError(true);
      setTimeout(() => setShowAIError(false), 3000);
      return;
    }

    setIsLoading(true);
    
    const words = aiQuery.toLowerCase().split(' ');
    let bestMatch: string | null = null;
    let maxMatches = 0;

    aiResponses.forEach(response => {
      const matches = response.keywords.filter(keyword => 
        words.some(word => word.includes(keyword.toLowerCase()))
      ).length;
      
      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = response.response;
      }
    });

    setTimeout(() => {
      setAiResponse(bestMatch || "I apologize, but I can only answer questions related to TrashTrek. Please ask about our features, points system, or environmental initiatives.");
      setIsLoading(false);
    }, 1000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  const handleSubmitIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please log in to submit an issue');
      return;
    }

    try {
      const formData = {
        user_email: user.email,
        issue_type: issueType,
        description: issueDescription,
        attachments: attachments.map(file => file.name).join(', '),
      };

      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        formData,
        'YOUR_USER_ID'
      );

      toast.success('Issue reported successfully!');
      setIssueType('Bug Report');
      setIssueDescription('');
      setAttachments([]);
    } catch (error) {
      toast.error('Failed to submit issue. Please try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      {/* About TrashTrek Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Info className="text-[#D0FD3E]" size={32} />
        <h2 className="text-2xl font-bold text-[#D0FD3E]">About TrashTrek</h2>
      </div>

      {/* Main Content Section */}
      <div className="grid gap-8">
        {/* Our Story Section */}
        <section className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
          <h3 className="text-xl font-bold text-[#D0FD3E] mb-4">Our Story</h3>
          <p className="text-gray-300 mb-8">
            TrashTrek was born from the vision of Krishang Saharia, a 15-year-old environmental enthusiast from Bhilai, India. What started as a school project has grown into a global movement to make environmental cleanup engaging and rewarding.
          </p>
          
          {/* Founder Quote - Enhanced with Animation */}
          <motion.div 
            className="bg-gradient-to-br from-[#D0FD3E]/20 to-transparent rounded-xl p-8 border border-[#D0FD3E]/30"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.p 
              variants={quoteVariants}
              className="text-xl text-white italic mb-6"
            >
              "We believe that small actions can create big changes. TrashTrek is more than an app - it's a community of eco-warriors making a difference."
            </motion.p>
            <motion.div 
              variants={authorVariants}
              className="flex items-center gap-4"
            >
              {/* Profile Image Instead of Initials */}
              <img 
                src="/trashtrek.png" alt="Trash Trek Logo"
                className="w-14 h-14 rounded-full object-cover"
              />
  
              {/* Founder Info */}
              <div>
                <p className="text-[#D0FD3E] font-semibold text-lg">Krishang Saharia</p>
                <p className="text-gray-400">Founder</p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Our Mission Section */}
        <section className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
          <h3 className="text-xl font-bold text-[#D0FD3E] mb-6">Our Mission</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {missionPoints.map((point) => (
              <motion.div
                key={point.id}
                className="bg-white/5 rounded-xl p-6 cursor-pointer"
                variants={missionCardVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
              >
                <motion.div 
                  className="w-10 h-10 rounded-full bg-[#D0FD3E]/20 flex items-center justify-center mb-4"
                  animate={{
                    backgroundColor: ["rgba(208, 253, 62, 0.2)", "rgba(208, 253, 62, 0.4)", "rgba(208, 253, 62, 0.2)"]
            }}
                  transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className="text-[#D0FD3E] font-bold">{point.id}</span>
              </motion.div>
              <h4 className="text-[#D0FD3E] font-semibold mb-2">{point.title}</h4>
              <p className="text-gray-300">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

        {/* Our Vision Section with Animated Background */}
        <motion.section 
          className="relative bg-white/10 backdrop-blur-lg rounded-xl p-8 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#D0FD3E]/5 via-transparent to-[#D0FD3E]/5"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{
              backgroundSize: '200% 100%',
            }}
          />
          
          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-[#D0FD3E] mb-4">Our Vision</h3>
            <p className="text-gray-300">
              We envision a future where environmental consciousness is not just a choice, but a way of life. Through technology and community engagement, we're building a platform that makes sustainable living accessible, engaging, and rewarding for everyone.
            </p>
          </div>
        </motion.section>

        {/* Help Center Section */}
        <section className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
          <div className="flex items-center space-x-4 mb-6">
            <MessageCircle className="text-[#D0FD3E]" size={32} />
            <h2 className="text-2xl font-bold text-[#D0FD3E]">Help Center</h2>
          </div>

          <div className="border border-white/10 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">AI Assistant</h3>
            <div className="bg-white/5 rounded-lg p-4">
              <motion.div
                initial={false}
                animate={{
                  scale: isLoading ? [1, 1.02, 1] : 1,
                }}
                transition={{ duration: 0.5, repeat: isLoading ? Infinity : 0 }}
              >
                {aiResponse && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mb-4 p-3 bg-[#D0FD3E]/10 rounded-lg"
                  >
                    <p className="text-gray-300">{aiResponse}</p>
                  </motion.div>
                )}
                
                <form onSubmit={handleAIQuery} className="relative">
                  <input
                    type="text"
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    placeholder="Ask about TrashTrek features, points, or initiatives..."
                    className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#D0FD3E] focus:border-transparent transition-colors pr-12"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-[#D0FD3E] hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Send size={20} />
                  </button>
                  {showAIError && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute -top-8 left-0 text-red-400 text-sm"
                    >
                      Please enter a longer question
                    </motion.p>
                  )}
                </form>
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/faqs')}
              className="p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-gray-300"
            >
              FAQs
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-gray-300"
            >
              Contact Support
            </button>
          </div>
        </section>

        {/* Report Issues Section */}
        <section className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
          <div className="flex items-center space-x-4 mb-6">
            <AlertTriangle className="text-[#D0FD3E]" size={32} />
            <h2 className="text-2xl font-bold text-[#D0FD3E]">Report Issues</h2>
          </div>

          <form onSubmit={handleSubmitIssue} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Issue Type
              </label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#D0FD3E] focus:border-transparent transition-colors text-gray-300"
              >
                <option>Bug Report</option>
                <option>Content Report</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                rows={4}
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#D0FD3E] focus:border-transparent transition-colors text-gray-300"
                placeholder="Describe the issue in detail..."
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Attachments
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center space-x-2 cursor-pointer text-gray-300">
                  <File className="text-[#D0FD3E]" />
                  <span>Add Files</span>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <label className="flex items-center space-x-2 cursor-pointer text-gray-300">
                  <Video className="text-[#D0FD3E]" />
                  <span>Add Video</span>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <label className="flex items-center space-x-2 cursor-pointer text-gray-300">
                  <Mic className="text-[#D0FD3E]" />
                  <span>Add Audio</span>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
              {attachments.length > 0 && (
                <div className="mt-4 space-y-2">
                  {attachments.map((file, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between bg-white/5 p-2 rounded-lg"
                    >
                      <span className="text-gray-300">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => setAttachments(attachments.filter((_, i) => i !== index))}
                        className="text-red-500 hover:text-red-400"
                      >
                        Remove
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-[#D0FD3E] to-[#2ECC71] text-[#0A1A2F] font-semibold rounded-lg transition-opacity hover:opacity-90"
            >
              Submit Report
            </button>
          </form>
        </section>
      </div>
    </motion.div>
  );
};

export default AboutUs;