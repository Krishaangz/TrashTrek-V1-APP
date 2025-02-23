import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I earn Eco Points?",
      answer: "You can earn Eco Points by completing challenges, participating in cleanups, and engaging with educational content."
    },
    {
      question: "What can I do with my Eco Points?",
      answer: "Eco Points can be redeemed for rewards, used to plant trees, or contribute to environmental projects."
    },
    {
      question: "How does the trash detection system work?",
      answer: "Our mobile app uses advanced AI to detect and classify different types of trash through your device's camera."
    },
    {
      question: "Can I participate in cleanups without the mobile app?",
      answer: "While you can organize cleanups independently, the app enhances the experience with tracking, rewards, and community features."
    },
    {
      question: "How often are new challenges released?",
      answer: "New challenges are released monthly, with special event challenges during environmental awareness days."
    },
    {
      question: "What happens to the collected trash data?",
      answer: "The data helps create environmental impact reports and identifies areas needing urgent cleanup attention."
    },
    {
      question: "How can I join the global community?",
      answer: "Reach 1,000 Eco Points to unlock access to our global community chat and worldwide leaderboard."
    },
    {
      question: "Are there team challenges available?",
      answer: "Yes! You can form or join teams for special cleanup events and compete together on the leaderboard."
    },
    {
      question: "How accurate is the trash detection?",
      answer: "Our AI model has a 95% accuracy rate and is continuously improving through machine learning."
    },
    {
      question: "What safety measures should I follow during cleanups?",
      answer: "Always wear gloves, use proper tools, avoid hazardous materials, and follow local safety guidelines."
    },
    {
      question: "Can I suggest new features or improvements?",
      answer: "Yes! Use the feedback form in the app or contact our support team with your suggestions."
    },
    {
      question: "How do I track my environmental impact?",
      answer: "Your profile shows detailed statistics including trash collected, areas cleaned, and total environmental impact."
    },
    {
      question: "What happens if I find hazardous waste?",
      answer: "Report it through the app's hazard reporting feature, and we'll notify relevant authorities."
    },
    {
      question: "How can I verify my cleanup activities?",
      answer: "Take before and after photos through the app, which uses GPS and timestamps for verification."
    },
    {
      question: "What's the minimum age to participate?",
      answer: "Users must be 13 or older to create an account. Younger participants need parent/guardian supervision."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex items-center space-x-4 mb-8">
        <HelpCircle className="text-[#D0FD3E]" size={32} />
        <h1 className="text-3xl font-bold text-[#D0FD3E]">Frequently Asked Questions</h1>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 cursor-pointer"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">{faq.question}</h3>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="text-[#D0FD3E]" />
              </motion.div>
            </div>
            {openIndex === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 text-gray-300"
              >
                {faq.answer}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FAQs;