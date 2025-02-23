import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, X, Check, Trophy, Trees as Tree, Star, 
  MessageCircle, Award, ShoppingBag, BookOpen
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import toast from 'react-hot-toast';

// Types
type NotificationCategory = 'all' | 'achievements' | 'eco' | 'marketplace' | 'promotional' | 'quiz';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface AuthUser {
  id: string;
  notifications: Notification[];
  ecoPoints: number;
  quizStreak: number;
  rank: string;
  lastQuizDate: string;
  treeMilestones: any[];
}

interface AuthStore {
  user: AuthUser | null;
  getUnreadNotificationsCount: () => number;
  markNotificationAsRead: (id: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  getTreesPlanted: () => number;
}

// Constants
const PROMOTIONAL_INTERVAL = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
const LAST_NOTIFICATION_KEY = 'lastPromotionalNotification';

// Eco quotes array
const ecoQuotes = [
  "Every small action counts towards a greener future!",
  "Be the change you wish to see in the environment.",
  "Plant seeds of change today for a sustainable tomorrow.",
  "Your eco-conscious choices make waves of positive impact.",
  "Together, we can turn the tide on climate change.",
  "There is no Planet B, but there is a Plan A: Act now!",
  "Reduce, reuse, recycle… and repeat!",
  "The earth is like a rental car—let’s return it in good condition.",
  "Pollution is not cool. Being green is!",
  "Make Earth smile—pick up that litter!",
  "If trees gave WiFi, we’d plant so many. But they give oxygen… so still, plant them!",
  "Love your planet like you love your WiFi connection.",
  "Stop trashing the planet—it’s not a landfill, it’s home!",
  "Eco-friendly is the new sexy!",
  "Think green, act clean.",
  "Don’t be mean, keep it green.",
  "Nature: Handle with care!",
  "Going green is easier than convincing your parents to buy you a new phone!",
  "Turn off the lights—your future self will thank you!",
  "Do your part, be eco-smart.",
  "It’s not waste until you waste it.",
  "Earth needs you more than Mars does right now!",
  "Recycling: Because throwing away Earth is not an option.",
  "Ditch plastic before it ditches you.",
  "Trees are like best friends—give them some space and they’ll always be there for you.",
  "Don’t let the future be extinct.",
  "A clean Earth is a happy Earth!",
  "Save paper, because trees can’t go on strike… yet.",
  "If the ocean dies, we die too. Just sayin'.",
  "Less plastic, more fantastic!",
  "You can’t eat money, but you can grow food!",
  "Go green or go home (because home won’t exist without it).",
  "Lend a hand to save the land.",
  "Climate change is no joke, but we still need to laugh while fixing it!",
  "It’s not just a trend, it’s a necessity.",
  "The grass is greener where you water it.",
  "Leave nothing but footprints, take nothing but pictures.",
  "Nature doesn’t need us, but we definitely need nature!",
  "Think global, act local.",
  "Don’t be trashy—recycle!",
  "Earth: We break it, we buy it!",
  "Every litter bit hurts.",
  "Make the planet great again!",
  "Be a part of the solution, not the pollution.",
  "Sustainability is the key to a better world.",
  "Green is the new black.",
  "Trees hug back if you hug them enough!",
  "A cooler planet starts with you!",
  "No Earth, no birthday parties. Think about that!",
  "Trash belongs in the bin, not in the ocean!",
  "Mother Earth called—she wants her clean air back.",
  "Composting: Because banana peels deserve a second chance.",
  "The future is bright, as long as it's solar-powered!",
  "Clean air is rare. Let’s not make it extinct.",
  "May the forest be with you.",
  "Think before you print, unless it’s money.",
  "Eco-warriors: The superheroes we actually need!",
  "Small changes, big impact.",
  "Give a hoot, don’t pollute!",
  "The best time to plant a tree was 20 years ago. The second-best time is now.",
  "Sustainability: The only investment with guaranteed returns.",
  "Protect nature—it’s the original influencer.",
  "Going green isn’t just for plants.",
  "Recycling is a never-ending story.",
  "Nature is cheaper than therapy.",
  "Ride a bike—it’s the closest thing to a time machine.",
  "Don’t make me turn this planet around!",
  "The ocean is waving—clean it up!",
  "Green today, alive tomorrow.",
  "Water is life—don’t waste it!",
  "Clean up your mess—Mother Earth isn’t your maid.",
  "The Earth is our home—don’t set it on fire.",
  "Forget diamonds, trees are forever.",
  "Being green is common sense, not rocket science.",
  "Be kind to the planet—it’s the only one with pizza.",
  "Save the Earth—it’s the only planet with chocolate!",
  "A plastic-free ocean is a happy ocean.",
  "Eat, sleep, recycle, repeat.",
  "Mother Nature is watching you. And she’s not happy.",
  "You can’t buy fresh air, so don’t pollute it.",
  "Zero waste is the new black.",
  "The Earth is not an ashtray.",
  "Go green—it’s the least you can do.",
  "Want change? Start with climate change.",
  "Save water—every drop counts!",
  "If you wouldn’t drink it, don’t dump it.",
  "Trees don’t text back, but they listen.",
  "Breathe easy—go eco!",
  "Why be trashy when you can be classy?",
  "Live gently on this planet.",
  "Green habits = Future profits.",
  "Walk, don’t drive. It’s a step in the right direction!",
  "You don’t have to be perfect, just be better!",
  "A cleaner planet starts with you!",
  "Love your home? Then love the planet.",
  "Reuse today, smile tomorrow.",
  "Be the reason someone breathes fresh air tomorrow."
];

const NotificationPanel = () => {
  // Hooks and state
  const {
    user,
    getUnreadNotificationsCount,
    markNotificationAsRead,
    addNotification,
    getTreesPlanted,
  } = useAuthStore() as AuthStore;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<NotificationCategory>('all');
  const panelRef = useRef<HTMLDivElement>(null);
  const promotionalTimerRef = useRef<NodeJS.Timeout>();

  // Memoized values
  const unreadCount = React.useMemo(() => getUnreadNotificationsCount(), [user?.notifications]);
  const treesPlanted = React.useMemo(() => getTreesPlanted(), [user?.treeMilestones]);

  // Previous values tracking
  const prevValuesRef = useRef({
    ecoPoints: user?.ecoPoints || 0,
    treesPlanted: treesPlanted,
    quizStreak: user?.quizStreak || 0,
    rank: user?.rank || ''
  });

  // Send promotional notifications
  const sendPromotionalNotifications = React.useCallback(() => {
    if (!user) return;

    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    // Check quiz completion
    if (user.lastQuizDate !== today) {
      addNotification({
        type: 'reminder',
        title: '📝 Daily Quiz Awaits!',
        message: 'Take today\'s eco quiz and maintain your streak!'
      });
    }

    // Send random eco quote
    const randomQuote = ecoQuotes[Math.floor(Math.random() * ecoQuotes.length)];
    addNotification({
      type: 'general',
      title: '🌱 Eco Inspiration',
      message: randomQuote
    });

    // Update timestamp
    localStorage.setItem(LAST_NOTIFICATION_KEY, now.toISOString());

    // Schedule next notification
    promotionalTimerRef.current = setTimeout(sendPromotionalNotifications, PROMOTIONAL_INTERVAL);
  }, [user, addNotification]);

  // Initialize promotional notifications
  useEffect(() => {
    if (!user) return;

    const now = new Date();
    const lastNotificationTime = localStorage.getItem(LAST_NOTIFICATION_KEY);
    
    if (!lastNotificationTime) {
      // First time - send immediately
      sendPromotionalNotifications();
    } else {
      const timeSinceLastSend = now.getTime() - new Date(lastNotificationTime).getTime();
      
      if (timeSinceLastSend >= PROMOTIONAL_INTERVAL) {
        // More than 4 hours passed - send immediately
        sendPromotionalNotifications();
      } else {
        // Schedule for remaining time
        const remainingTime = PROMOTIONAL_INTERVAL - timeSinceLastSend;
        promotionalTimerRef.current = setTimeout(sendPromotionalNotifications, remainingTime);
      }
    }

    return () => {
      if (promotionalTimerRef.current) {
        clearTimeout(promotionalTimerRef.current);
      }
    };
  }, [user, sendPromotionalNotifications]);

  // Track changes in user data
  useEffect(() => {
    if (!user) return;

    const prevValues = prevValuesRef.current;

    // Check for EcoPoints changes
    if (user.ecoPoints > prevValues.ecoPoints) {
      const pointsGained = user.ecoPoints - prevValues.ecoPoints;
      addNotification({
        type: 'points',
        title: '🌟 EcoPoints Earned!',
        message: `You've earned ${pointsGained} new EcoPoints!`
      });
    }

    // Check for new trees planted
    if (treesPlanted > prevValues.treesPlanted) {
      addNotification({
        type: 'tree',
        title: '🌳 New Tree Planted!',
        message: `You've planted your ${treesPlanted}${
          treesPlanted === 1 ? 'st' : 
          treesPlanted === 2 ? 'nd' : 
          treesPlanted === 3 ? 'rd' : 'th'
        } tree!`
      });
    }

    // Check for quiz streak changes
    if (user.quizStreak > prevValues.quizStreak) {
      addNotification({
        type: 'achievement',
        title: '🎯 Quiz Streak!',
        message: `Amazing! You're on a ${user.quizStreak}-day quiz streak!`
      });
    }

    // Check for rank changes
    if (user.rank !== prevValues.rank) {
      addNotification({
        type: 'achievement',
        title: '🏆 New Rank Achieved!',
        message: `Congratulations! You've reached the rank of ${user.rank}!`
      });
    }

    // Update previous values
    prevValuesRef.current = {
      ecoPoints: user.ecoPoints,
      treesPlanted,
      quizStreak: user.quizStreak,
      rank: user.rank
    };
  }, [user?.ecoPoints, treesPlanted, user?.quizStreak, user?.rank, addNotification]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Helper functions
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'achievement': return <Trophy className="text-[#D0FD3E]" />;
      case 'tree': return <Tree className="text-[#D0FD3E]" />;
      case 'points': return <Star className="text-[#D0FD3E]" />;
      case 'leaderboard': return <Award className="text-[#D0FD3E]" />;
      case 'marketplace': return <ShoppingBag className="text-[#D0FD3E]" />;
      case 'reminder': return <BookOpen className="text-[#D0FD3E]" />;
      default: return <MessageCircle className="text-[#D0FD3E]" />;
    }
  };

  const filterNotifications = (notifications: Notification[]) => {
    if (selectedCategory === 'all') return notifications;

    const categoryMap: Record<NotificationCategory, string[]> = {
      achievements: ['achievement', 'leaderboard'],
      eco: ['tree', 'points'],
      marketplace: ['marketplace'],
      promotional: ['general'],
      quiz: ['reminder']
    };

    return notifications.filter(notification => 
      categoryMap[selectedCategory]?.includes(notification.type)
    );
  };

  const handleNotificationClick = (notificationId: string) => {
    markNotificationAsRead(notificationId);
  };

  const clearAllNotifications = () => {
    if (!user?.notifications) return;
    
    user.notifications.forEach(notification => {
      if (!notification.read) {
        markNotificationAsRead(notification.id);
      }
    });
    toast.success('All notifications marked as read');
  };

  // Render component
  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-white/10 rounded-lg transition-colors relative"
      >
        <Bell className="text-[#D0FD3E]" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute right-0 top-12 w-96 bg-[#0A1A2F] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50"
          >
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Notifications</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearAllNotifications}
                  className="text-sm text-[#D0FD3E] hover:text-white transition-colors"
                >
                  Mark all as read
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-2 border-b border-white/10 flex gap-2 overflow-x-auto">
              {(['all', 'achievements', 'eco', 'marketplace', 'promotional', 'quiz'] as NotificationCategory[]).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-[#D0FD3E] text-black'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {user?.notifications && filterNotifications(user.notifications).length > 0 ? (
                filterNotifications(user.notifications).map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer ${
                      !notification.read ? 'bg-white/5' : ''
                    }`}
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-[#D0FD3E]">
                          {notification.title}
                        </h4>
                        <p className="text-sm text-gray-300 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-[#D0FD3E]" />
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-400">
                  <Bell className="mx-auto mb-4 opacity-50" size={32} />
                  <p>No notifications in this category</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationPanel;