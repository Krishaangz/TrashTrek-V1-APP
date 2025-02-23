import React, { useState, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './Navigation';
import CommunityChat from './CommunityChat';
import NotificationPanel from './NotificationPanel';
import RankUpOverlay from './RankUpOverlay';
import { useAuthStore } from '../stores/authStore';
import TreePlantingCelebration from './TreePlantingCelebration';
import LeaderboardMilestone from './LeaderboardMilestone';
import FriendsPanel from './FriendsPanel';

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Handle clicks outside the navigation menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        navRef.current &&
        !navRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1A2F] to-[#1A2F4F] text-white">
      <header className="fixed top-0 w-full z-50 bg-opacity-90 bg-[#0A1A2F] backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button
            ref={buttonRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <motion.div
              animate={isMenuOpen ? "open" : "closed"}
              className="space-y-1.5"
            >
              {[0, 1, 2].map((index) => (
                <motion.span
                  key={index}
                  className="block h-0.5 w-6 bg-[#D0FD3E]"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: index === 1 
                      ? { opacity: 0 }
                      : { rotate: index === 0 ? 45 : -45, y: index === 0 ? 6 : -6 }
                  }}
                />
              ))}
            </motion.div>
          </button>
          <div className="flex items-center space-x-4">
            <FriendsPanel />
            <NotificationPanel />
            <CommunityChat />
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <div ref={navRef}>
            <Navigation onClose={() => setIsMenuOpen(false)} />
            {/* This overlay captures outside clicks */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsMenuOpen(false)}
            />
          </div>
        )}
      </AnimatePresence>

      <main className="pt-16">
        <Outlet />
      </main>

      <RankUpOverlay />
      <TreePlantingCelebration />
      <LeaderboardMilestone />
    </div>
  );
};

export default Layout;