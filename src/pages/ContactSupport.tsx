import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactSupport = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex items-center space-x-4 mb-8">
        <Mail className="text-[#D0FD3E]" size={32} />
        <h1 className="text-3xl font-bold text-[#D0FD3E]">Contact Support</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="space-y-8">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold mb-6 text-[#D0FD3E]">
              Contact Information
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Mail className="text-[#D0FD3E] mt-1" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-300">trashtrekindia@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="text-[#D0FD3E] mt-1" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-gray-300">+91 62610 26345</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="text-[#D0FD3E] mt-1" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-gray-300">
                    TrashTrek Headquarters<br />
                    Bhilai, Chhattisgarh<br />
                    India - 490006
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Clock className="text-[#D0FD3E] mt-1" />
                <div>
                  <h3 className="font-medium">Support Hours</h3>
                  <p className="text-gray-300">
                    Monday - Friday<br />
                    9:00 AM - 6:00 PM IST
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold mb-4 text-[#D0FD3E]">
              Quick Response
            </h2>
            <p className="text-gray-300">
              We typically respond within 24 hours. For immediate assistance,
              try our AI chatbot or check our FAQs section.
            </p>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold mb-6 text-[#D0FD3E]">
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#D0FD3E] focus:border-transparent transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Your Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#D0FD3E] focus:border-transparent transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Your Message
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#D0FD3E] focus:border-transparent transition-colors"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-[#D0FD3E] to-[#2ECC71] text-[#0A1A2F] font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactSupport;