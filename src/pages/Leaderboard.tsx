import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, MapPin, Globe } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

const Leaderboard = () => {
  const { user } = useAuthStore();
  const hasGlobalAccess = (user?.ecoPoints || 0) >= 1000;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Local Leaderboard */}
      <section className="mb-8">
        <div className="flex items-center space-x-4 mb-6">
          <MapPin className="text-[#D0FD3E]" size={32} />
          <h2 className="text-2xl font-bold text-[#D0FD3E]">Local Rankings</h2>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((rank) => (
              <div
                key={rank}
                className="flex items-center justify-between p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-[#D0FD3E]">#{rank}</span>
                  <div>
                    <p className="font-medium">User {rank}</p>
                    <p className="text-sm text-gray-300">Local Hero</p>
                  </div>
                </div>
                <p className="font-bold">{1000 - (rank * 100)} pts</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Leaderboard */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Globe className="text-[#D0FD3E]" size={32} />
            <h2 className="text-2xl font-bold text-[#D0FD3E]">Global Rankings</h2>
          </div>
          {!hasGlobalAccess && (
            <span className="text-sm text-gray-300">
              Unlock at 1,000 Eco-Points
            </span>
          )}
        </div>
        <div className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 ${!hasGlobalAccess ? 'opacity-50' : ''}`}>
          {hasGlobalAccess ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((rank) => (
                <div
                  key={rank}
                  className="flex items-center justify-between p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl font-bold text-[#D0FD3E]">#{rank}</span>
                    <div>
                      <p className="font-medium">Global User {rank}</p>
                      <p className="text-sm text-gray-300">Master Recycler</p>
                    </div>
                  </div>
                  <p className="font-bold">{5000 - (rank * 500)} pts</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Trophy className="mx-auto text-[#D0FD3E] mb-4" size={48} />
              <p className="text-xl font-medium mb-2">Global Rankings Locked</p>
              <p className="text-gray-300">Collect more Eco-Points to unlock global rankings!</p>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default Leaderboard;