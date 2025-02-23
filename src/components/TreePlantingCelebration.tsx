import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trees as Tree, Star } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

const FloatingTree = ({ delay = 0, scale = 1 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 1, 0],
      scale: [0.3, scale, 0.3],
      y: [0, -20, 0],
      x: [0, 10, 0]
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="absolute text-[#D0FD3E]/30"
  >
    <Tree size={24} />
  </motion.div>
);

const TreePlantingCelebration = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [milestone, setMilestone] = useState<{ count: number; species?: string } | null>(null);
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    const unsubscribe = useAuthStore.subscribe((state, prevState) => {
      const prevTrees = prevState.user?.treeMilestones?.length || 0;
      const currentTrees = state.user?.treeMilestones?.length || 0;
      
      if (currentTrees > prevTrees) {
        const latestMilestone = state.user?.treeMilestones[currentTrees - 1];
        setMilestone(latestMilestone);
        setShowOverlay(true);
      }
    });
    
    return () => unsubscribe();
  }, []);

  const handleClose = () => {
    setShowOverlay(false);
  };

  return (
    <AnimatePresence>
      {showOverlay && milestone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          
          <motion.div
            initial={{ scale: 0.5, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.5, y: 100 }}
            className="relative bg-gradient-to-br from-[#0A1A2F]/95 to-[#1A2F4F]/95 p-8 rounded-2xl shadow-2xl backdrop-blur-lg border border-[#D0FD3E]/20 max-w-md w-full mx-4 overflow-hidden"
          >
            {/* Floating Trees Background */}
            <div className="absolute inset-0 overflow-hidden">
              <FloatingTree delay={0} scale={1.2} />
              <div className="absolute top-1/4 right-1/4">
                <FloatingTree delay={1} scale={0.8} />
              </div>
              <div className="absolute bottom-1/4 left-1/4">
                <FloatingTree delay={1.5} scale={1} />
              </div>
              <div className="absolute top-1/3 left-1/3">
                <FloatingTree delay={2} scale={0.9} />
              </div>
              <div className="absolute bottom-1/3 right-1/3">
                <FloatingTree delay={2.5} scale={1.1} />
              </div>
            </div>

            <motion.div
              initial={{ y: -20 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex justify-center mb-6 relative"
            >
              <div className="relative">
                <Tree className="w-24 h-24 text-[#D0FD3E]" />
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-[#D0FD3E]/20 rounded-full blur-xl"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center relative z-10"
            >
              <h2 className="text-3xl font-bold text-[#D0FD3E] mb-2 flex items-center justify-center gap-2">
                <Tree className="w-6 h-6" />
                Tree Planted!
                <Tree className="w-6 h-6" />
              </h2>
              <p className="text-gray-300 mb-4">Congratulations on planting</p>
              <div className="relative inline-block">
                <motion.p
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="text-2xl font-bold bg-gradient-to-r from-[#D0FD3E] to-[#2ECC71] text-transparent bg-clip-text"
                >
                  Tree #{milestone.count}
                </motion.p>
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    opacity: [0, 1, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -inset-4"
                >
                  <Tree className="w-6 h-6 text-[#D0FD3E] absolute top-0 right-0" />
                </motion.div>
              </div>
              
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={handleClose}
              className="mt-8 w-full py-3 px-6 bg-gradient-to-r from-[#D0FD3E] to-[#2ECC71] text-[#0A1A2F] font-semibold rounded-lg hover:opacity-90 transition-all duration-300 relative z-10"
            >
              Continue
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TreePlantingCelebration;