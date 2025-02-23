import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Rocket, 
  Brain, 
  Trophy, 
  User, 
  Info,
  Users,
  AlertCircle
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

interface NavigationProps {
  onClose: () => void;
}

const Navigation = ({ onClose }: NavigationProps) => {
  const location = useLocation();
  const { getChatEligibility } = useAuthStore();
  const { eligible, reason } = getChatEligibility();

  const menuItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { 
      path: '/community', 
      icon: Users, 
      label: 'Community',
      locked: !eligible,
      lockReason: reason
    },
    { path: '/deploy', icon: Rocket, label: 'Get Started' },
    { path: '/trivia', icon: Brain, label: 'Trivia' },
    { path: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/about', icon: Info, label: 'About Us' },
  ];

  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-y-0 left-0 w-64 bg-[#0A1A2F] shadow-lg z-50"
    >
      <div className="p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#D0FD3E]">TrashTrek</h1>
        </div>
        <nav className="space-y-2">
          {menuItems.map(({ path, icon: Icon, label, locked, lockReason }) => (
            <div key={path} className="relative group">
              <Link
                to={locked ? '#' : path}
                onClick={locked ? undefined : onClose}
                className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  locked
                    ? 'opacity-50 cursor-not-allowed'
                    : location.pathname === path
                    ? 'bg-[#D0FD3E] text-[#0A1A2F]'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <Icon size={20} />
                <span>{label}</span>
                {locked && (
                  <AlertCircle size={16} className="ml-auto text-gray-400" />
                )}
              </Link>
              {locked && lockReason && (
                <div className="absolute left-full ml-2 w-48 px-3 py-2 bg-black/90 rounded-lg text-xs text-white invisible group-hover:visible whitespace-normal">
                  {lockReason}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default Navigation;