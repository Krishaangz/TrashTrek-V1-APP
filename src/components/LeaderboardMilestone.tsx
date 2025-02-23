import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import { Trees as Tree, Trophy, Star } from 'lucide-react';

// LeaderboardMilestone Component
const LeaderboardMilestone = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [milestone, setMilestone] = useState<{ rank: number } | null>(null);
  const user = useAuthStore(state => state.user);

  useEffect(() => {
    const unsubscribe = useAuthStore.subscribe((state, prevState) => {
      const iconicRanks = [10000, 1000, 750, 500, 250, 100, 50, 20, 10, 1];
      const prevRank = prevState.user?.leaderboardPosition?.global || 9999;
      const currentRank = state.user?.leaderboardPosition?.global || 9999;

      const achievedRank = iconicRanks.find(rank => currentRank <= rank && prevRank > rank);
      
      if (achievedRank) {
        setMilestone({ rank: achievedRank });
        setShowOverlay(true);

        // Auto-hide after animation
        setTimeout(() => setShowOverlay(false), 5000);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AnimatePresence>
      {showOverlay && milestone && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          <div className="bg-blue-900/80 backdrop-blur-lg rounded-xl p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotateZ: [0, -5, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-yellow-400"
              >
                <Trophy size={64} />
              </motion.div>

              <h2 className="text-2xl font-bold text-white">
                Incredible Achievement!
              </h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-blue-200 text-lg"
              >
                You've reached the top {milestone.rank} players globally!
              </motion.p>

              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-t from-blue-400/20 to-transparent rounded-xl"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeaderboardMilestone;