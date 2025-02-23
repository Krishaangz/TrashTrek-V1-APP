import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Recycle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const Register = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });
  
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Set authentication state using useAuthStore
    if (isLogin) {
      // TODO: Implement login logic with proper backend
      setAuth(true, { ...formData, ecoPoints: 0 });
    } else {
      // TODO: Implement registration logic with proper backend
      setAuth(true, { ...formData, ecoPoints: 0 });
    }
    
    // Set localStorage for persistent auth
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userData', JSON.stringify({ ...formData, ecoPoints: 0 }));
    
    // Navigate to home
    navigate('/home');
  };

  const floatingIcons = Array(8).fill(null).map((_, i) => ({
    initial: {
      x: Math.random() * dimensions.width - dimensions.width / 2,
      y: Math.random() * dimensions.height - dimensions.height / 2,
      rotate: Math.random() * 360,
      opacity: 0.2
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

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4
      }
    }
  };

  const switchVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      scale: 0.95,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1A2F] to-[#1A2F4F] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Background Icons */}
      <div className="fixed inset-0 pointer-events-none">
        {floatingIcons.map((icon, index) => (
          <motion.div
            key={index}
            initial={icon.initial}
            animate={icon.animate}
            className="absolute left-1/2 top-1/2 will-change-transform"
          >
            <Recycle 
              className="text-[#D0FD3E]/20" 
              size={30 + Math.random() * 30} 
            />
          </motion.div>
        ))}
      </div>

      {/* Glowing Orb Effects */}
      <motion.div
        className="absolute w-[600px] h-[600px] bg-[#D0FD3E]/5 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={formVariants}
        className="w-full max-w-md relative z-10"
      >
        <motion.div
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
          whileHover={{ boxShadow: "0 0 30px rgba(208,253,62,0.2)" }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <img 
              src="/trashtrek.png" alt="Trash Trek Logo"
              className="h-20 w-auto"
            />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'register'}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={switchVariants}
            >
              <motion.h1
                className="text-3xl font-bold text-center mb-8 text-[#D0FD3E]"
              >
                {isLogin ? 'Welcome Back' : 'Join TrashTrek'}
              </motion.h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      required={!isLogin}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-[#D0FD3E] focus:border-transparent transition-all duration-300"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-[#D0FD3E] focus:border-transparent transition-all duration-300"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-[#D0FD3E] focus:border-transparent transition-all duration-300"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(208,253,62,0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 bg-gradient-to-r from-[#D0FD3E] to-[#2ECC71] text-[#0A1A2F] font-semibold rounded-lg transition-all duration-300"
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </motion.button>
              </form>
            </motion.div>
          </AnimatePresence>

          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#D0FD3E] hover:text-[#2ECC71] transition-colors duration-300"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;