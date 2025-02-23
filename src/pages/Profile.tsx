import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, ShoppingBag, Gift, Trees as Tree, Award, Zap, Leaf, TrendingUp } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';
import ProfilePictureManager from './ProfilePictureManager';

const Profile = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [activeStatIndex, setActiveStatIndex] = useState(0);

  // Updated statistics using real-time user data including quiz streak
  const statistics = [
    {
      icon: <Award className="text-[#D0FD3E]" size={28} />,
      title: 'Eco Points',
      value: `${user?.ecoPoints || 0}`,
      subtitle: user?.ecoPoints ? `You surpass ${calculatePercentile(user.ecoPoints)}% of users` : 'Start earning points!',
      description: 'Your environmental impact score'
    },
    {
      icon: <Zap className="text-[#D0FD3E]" size={28} />,
      title: 'Energy Saved',
      value: `${calculateEnergySaved(user?.ecoPoints || 0)} kWh`,
      subtitle: 'This month',
      description: `Equivalent to ${Math.floor(calculateEnergySaved(user?.ecoPoints || 0) / 2)} hours of TV`
    },
    {
      icon: <Leaf className="text-[#D0FD3E]" size={28} />,
      title: 'Carbon Offset',
      value: `${calculateCarbonOffset(user?.ecoPoints || 0)} kg`,
      subtitle: 'This year',
      description: `That's ${Math.floor(calculateCarbonOffset(user?.ecoPoints || 0) / 4)} trees worth!`
    },
    {
      icon: <TrendingUp className="text-[#D0FD3E]" size={28} />,
      title: 'Quiz Streak',
      value: `${user?.quizStreak || 0} days`,
      subtitle: getStreakMessage(user?.quizStreak || 0),
      description: 'Complete daily quizzes to maintain your streak!'
    }
  ];

  function calculatePercentile(points: number): number {
    const percentile = Math.min(Math.floor((points / 1000) * 100), 99);
    return Math.max(1, percentile);
  }

  function calculateEnergySaved(points: number): number {
    return Math.floor(points * 0.1);
  }

  function calculateCarbonOffset(points: number): number {
    return Number((points * 0.05).toFixed(1));
  }

  function getStreakMessage(streak: number): string {
    if (streak === 0) return 'Take today\'s quiz!';
    if (streak === 1) return 'First day achieved!';
    if (streak < 5) return 'Keep it going!';
    if (streak < 10) return 'You\'re on fire! 🔥';
    return 'Impressive streak! 🌟';
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStatIndex((prevIndex) => (prevIndex + 1) % statistics.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [statistics.length]);

  // Updated join date formatting function
  const getFormattedJoinDate = () => {
    if (user?.joinedDate) {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(new Date(user.joinedDate));
    }
    if (user?.dailyEcoHistory?.length > 0) {
      const sortedHistory = [...user.dailyEcoHistory].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(new Date(sortedHistory[0].date));
    }
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Profile Header */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8">
        <div className="flex items-center space-x-6">
          <ProfilePictureManager />
          <div>
            <h1 className="text-2xl font-bold text-[#D0FD3E] mb-2">{user?.username || 'User'}</h1>
            <p className="text-gray-300">{user?.email || 'email@example.com'}</p>
            <p className="text-[#D0FD3E] mt-2">Rank: {user?.rank || 'Eco Rookie'}</p>
            <p className="text-gray-400 text-sm mt-1">
              Joined: {getFormattedJoinDate()}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Account Settings */}
        <section>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center space-x-4 mb-6">
              <Settings className="text-[#D0FD3E]" size={24} />
              <h2 className="text-xl font-bold">Account Settings</h2>
            </div>
            <div className="space-y-4">
              <button
                onClick={() => navigate('/settings')}
                className="w-full p-4 text-left border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
              >
                <p className="font-medium">Edit Profile</p>
                <p className="text-sm text-gray-400">Update your profile information and avatar</p>
              </button>
              <button
                onClick={() => navigate('/settings')}
                className="w-full p-4 text-left border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
              >
                <p className="font-medium">Privacy Settings</p>
                <p className="text-sm text-gray-400">Manage your privacy preferences and data</p>
              </button>
              <button
                onClick={() => navigate('/settings')}
                className="w-full p-4 text-left border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
              >
                <p className="font-medium">Security Settings</p>
                <p className="text-sm text-gray-400">Update password and security preferences</p>
              </button>
              <button
                onClick={() => navigate('/settings')}
                className="w-full p-4 text-left border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
              >
                <p className="font-medium">Notification Preferences</p>
                <p className="text-sm text-gray-400">Customize your notification settings</p>
              </button>
              <button
                onClick={() => navigate('/settings')}
                className="w-full p-4 text-left border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
              >
                <p className="font-medium">Connected Accounts</p>
                <p className="text-sm text-gray-400">Manage linked social accounts and devices</p>
              </button>
            </div>
          </div>
        </section>

        {/* Right Column with Marketplace and Eco Impact */}
        <div className="space-y-8">
          {/* Marketplace */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center space-x-4 mb-6">
              <ShoppingBag className="text-[#D0FD3E]" size={24} />
              <h2 className="text-xl font-bold">Marketplace</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => navigate('/marketplace')}
                className="p-4 border border-white/10 rounded-lg text-center hover:bg-white/5 transition-colors"
              >
                <Gift className="mx-auto text-[#D0FD3E] mb-2" size={24} />
                <p className="font-medium">Gift Cards</p>
                <p className="text-sm text-gray-300">From 500 points</p>
              </button>
              <button
                onClick={() => navigate('/marketplace')}
                className="p-4 border border-white/10 rounded-lg text-center hover:bg-white/5 transition-colors"
              >
                <Tree className="mx-auto text-[#D0FD3E] mb-2" size={24} />
                <p className="font-medium">Plant a Tree</p>
                <p className="text-sm text-gray-300">100 points</p>
              </button>
            </div>
          </div>
          
          {/* Animated Eco Impact Stats */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 relative overflow-hidden">
            <h2 className="text-xl font-bold mb-4">Your Eco Impact</h2>
            
            {/* Main statistic display with animation */}
            <motion.div
              key={activeStatIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <div className="flex items-start space-x-4">
                {statistics[activeStatIndex].icon}
                <div>
                  <h3 className="text-lg font-medium text-[#D0FD3E]">
                    {statistics[activeStatIndex].title}
                  </h3>
                  <p className="text-3xl font-bold mt-1">
                    {statistics[activeStatIndex].value}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {statistics[activeStatIndex].subtitle}
                  </p>
                  <p className="text-gray-300 mt-2">
                    {statistics[activeStatIndex].description}
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Indicator dots */}
            <div className="flex justify-center space-x-2 mt-6">
              {statistics.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStatIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeStatIndex ? 'bg-[#D0FD3E] w-4' : 'bg-white/30'
                  }`}
                  aria-label={`View ${statistics[index].title} statistic`}
                />
              ))}
            </div>
            
            {/* Background pulse animation */}
            <motion.div
              className="absolute inset-0 bg-[#D0FD3E]/5 rounded-xl"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;