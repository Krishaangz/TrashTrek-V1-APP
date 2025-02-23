import React, { useState, useRef, useEffect } from 'react';
import { Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import toast from 'react-hot-toast';

const FriendsPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('friends'); // 'friends' or 'requests'
  const panelRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const TabButton = ({ id, label, active }: { id: string; label: string; active: boolean }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex-1 py-2 text-sm font-medium transition-colors ${
        active 
          ? 'text-[#D0FD3E] border-b-2 border-[#D0FD3E]' 
          : 'text-gray-400 hover:text-gray-300'
      }`}
    >
      {label}
    </button>
  );

  const FriendsTab = () => (
    <div className="text-gray-400 text-center py-4">
      No friends online
    </div>
  );

  const RequestsTab = () => (
    <div className="space-y-4">
      <div className="border-b border-white/10 pb-4">
        <h3 className="text-sm font-medium text-gray-400 mb-2">Incoming Requests</h3>
        <div className="text-gray-400 text-center py-2">
          No incoming requests
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-400 mb-2">Outgoing Requests</h3>
        <div className="text-gray-400 text-center py-2">
          No outgoing requests
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Toggle friends panel"
      >
        <Users className="text-[#D0FD3E]" size={24} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-72 bg-[#0A1A2F] rounded-lg shadow-lg border border-white/10 overflow-hidden"
            role="dialog"
            aria-label="Friends panel"
          >
            <div className="border-b border-white/10">
              <div className="flex">
                <TabButton 
                  id="friends" 
                  label="Friends" 
                  active={activeTab === 'friends'} 
                />
                <TabButton 
                  id="requests" 
                  label="Requests" 
                  active={activeTab === 'requests'} 
                />
              </div>
            </div>
            
            <div className="p-4">
              {activeTab === 'friends' ? <FriendsTab /> : <RequestsTab />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FriendsPanel;