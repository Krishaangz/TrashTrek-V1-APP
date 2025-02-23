import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define types for all settings
interface Post {
  id: string;
  userId: string;
  username: string;
  userImage?: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'audio' | 'file';
  thumbnailUrl?: string;
  likes: number;
  comments: Comment[];
  createdAt: Date;
  isOfficial?: boolean;
}

interface Comment {
  id: string;
  userId: string;
  username: string;
  content: string;
  createdAt: Date;
}

interface NotificationSettings {
  email: boolean;
  push: boolean;
  updates: boolean;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  biometricLogin: boolean;
  rememberDevice: boolean;
  autoLogout: boolean;
}

interface PrivacySettings {
  profileVisibility: 'public' | 'friends' | 'private';
  onlineStatus: boolean;
  activityFeed: boolean;
  friendRequests: boolean;
  dataCollection: boolean;
}

interface GameSettings {
  crossPlatformPlay: boolean;
  autoMatchmaking: boolean;
  voiceChat: boolean;
  pushNotifications: boolean;
  soundEffects: boolean;
  vibration: boolean;
}

interface UserSettings {
  notifications: NotificationSettings;
  security: SecuritySettings;
  privacy: PrivacySettings;
  game: GameSettings;
}

interface Notification {
  id: string;
  type: 'achievement' | 'leaderboard' | 'points' | 'reminder' | 'tree' | 'general';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  content: string;
  type: 'text' | 'gif' | 'image' | 'video' | 'audio';
  mediaUrl?: string;
  timestamp: Date;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  type: 'rank' | 'trees' | 'points' | 'leaderboard' | 'activity';
}

interface DailyEcoData {
  date: string;
  ecoPoints: number;
  treesPlanted: number;
  trashCollected: number;
}

interface LeaderboardPosition {
  global: number;
  local: number;
  lastUpdated: Date;
}

interface TreeMilestone {
  count: number;
  achievedAt: Date;
  latitude?: number;
  longitude?: number;
  species?: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  ecoPoints: number;
  rank: string;
  joinedDate: Date;
  streak: number;
  lastActive: Date;
  achievements: Achievement[];
  notifications: Notification[];
  treeMilestones: TreeMilestone[];
  profileImage?: string;
  settings: UserSettings;
  dailyEcoHistory: DailyEcoData[];
  leaderboardPosition: LeaderboardPosition;
  chatEnabled: boolean;
  lastQuizDate?: string;
  quizStreak: number;
  posts: Post[];
  friends: string[];
  friendRequests: string[];
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  chatMessages: ChatMessage[];
  allPosts: Post[];
  setAuth: (isAuth: boolean, user?: User) => void;
  logout: () => void;
  addEcoPoints: (points: number, trashItems?: number) => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
  updateUserSettings: (settings: Partial<UserSettings>) => Promise<void>;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationAsRead: (notificationId: string) => void;
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  unlockAchievement: (achievement: Omit<Achievement, 'id' | 'unlockedAt'>) => void;
  updateLeaderboardPosition: (position: Partial<LeaderboardPosition>) => void;
  addTreeMilestone: (milestone: Omit<TreeMilestone, 'achievedAt'>) => void;
  updateQuizStatus: (completed: boolean) => void;
  getFormattedJoinDate: () => string;
  getDaysActive: () => number;
  getFormattedDaysActive: () => string;
  getUnreadNotificationsCount: () => number;
  getRecentAchievements: (count?: number) => Achievement[];
  getTreesPlanted: () => number;
  getChatEligibility: () => { eligible: boolean; reason?: string };
  // New media post methods
  addPost: (post: Post) => void;
  updatePost: (postId: string, updates: Partial<Post>) => void;
  deletePost: (postId: string) => void;
}

// Default settings values
const defaultSettings: UserSettings = {
  notifications: {
    email: true,
    push: true,
    updates: true,
  },
  security: {
    twoFactorAuth: false,
    biometricLogin: true,
    rememberDevice: true,
    autoLogout: false,
  },
  privacy: {
    profileVisibility: 'friends',
    onlineStatus: true,
    activityFeed: true,
    friendRequests: true,
    dataCollection: true,
  },
  game: {
    crossPlatformPlay: true,
    autoMatchmaking: true,
    voiceChat: true,
    pushNotifications: true,
    soundEffects: true,
    vibration: true,
  },
};

// Helper functions
const formatJoinDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const calculateDaysActive = (joinDate: Date): number => {
  const now = new Date();
  const joined = new Date(joinDate);
  const diffTime = Math.abs(now.getTime() - joined.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const formatDaysActive = (days: number): string => {
  if (days === 0) return 'Just joined today!';
  if (days === 1) return '1 day';
  if (days < 30) return `${days} days`;
  const months = Math.floor(days / 30);
  const remainingDays = days % 30;
  if (months === 1) {
    return remainingDays > 0 ? `1 month, ${remainingDays} days` : '1 month';
  }
  return remainingDays > 0 ? `${months} months, ${remainingDays} days` : `${months} months`;
};

// Ranking system
export const calculateRank = (points: number): string => {
  if (points >= 1000000) return 'TrashTrek Grandmaster';
  if (points >= 900000) return 'Master of Restoration';
  if (points >= 800000) return 'Global Eco Leader';
  if (points >= 700000) return 'Earthian Visionary';
  if (points >= 600000) return 'Supreme Savior';
  if (points >= 500000) return 'Zero Waste Hero';
  if (points >= 400000) return 'Nature’s Guardian';
  if (points >= 300000) return 'Environmental Titan';
  if (points >= 200000) return 'Eco Pathfinder';
  if (points >= 150000) return 'Earth Trailblazer';
  if (points >= 100000) return 'Climate Crusader';
  if (points >= 75000) return 'Green Sentinel';
  if (points >= 50000) return 'Eco Commander';
  if (points >= 25000) return 'Planet Pioneer';
  if (points >= 10000) return 'Eco Legend';
  if (points >= 5000) return 'Environmental Master';
  if (points >= 2500) return 'Sustainability Champion';
  if (points >= 1000) return 'Green Warrior';
  if (points >= 500) return 'Eco Guardian';
  if (points >= 250) return 'Nature Protector';
  if (points >= 100) return 'Earth Defender';
  return 'Eco Rookie';
};

// Function to get current date in ISO format (YYYY-MM-DD)
const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

// Create store with persistence
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      chatMessages: [],
      allPosts: [], // New field for storing all posts
      
      setAuth: (isAuth, user = null) => {
        if (user) {
          const now = new Date();
          user = {
            ...user,
            settings: user.settings || defaultSettings,
            joinedDate: new Date(user.joinedDate || now),
            lastActive: now,
            achievements: user.achievements || [],
            notifications: user.notifications || [],
            treeMilestones: user.treeMilestones || [],
            posts: user.posts || [], // Initialize posts array
            dailyEcoHistory: user.dailyEcoHistory || [{
              date: now.toISOString().split('T')[0],
              ecoPoints: user.ecoPoints || 0,
              treesPlanted: Math.floor((user.ecoPoints || 0) / 100),
              trashCollected: Math.floor((user.ecoPoints || 0) / 10)
            }],
            leaderboardPosition: user.leaderboardPosition || {
              global: 9999,
              local: 999,
              lastUpdated: now
            },
            streak: user.streak || 0,
            quizStreak: user.quizStreak || 0,
            chatEnabled: (user.ecoPoints || 0) >= 1000
          };
        }
        set({ isAuthenticated: isAuth, user });
      },

      // New post management methods
      addPost: (newPost) => {
        set((state) => ({
          allPosts: [newPost, ...state.allPosts],
          user: state.user ? {
            ...state.user,
            posts: [newPost, ...(state.user.posts || [])]
          } : null
        }));
      },

      updatePost: (postId, updates) => {
        set((state) => {
          const updatedPosts = state.allPosts.map(post =>
            post.id === postId ? { ...post, ...updates } : post
          );
          
          return {
            allPosts: updatedPosts,
            user: state.user ? {
              ...state.user,
              posts: state.user.posts.map(post =>
                post.id === postId ? { ...post, ...updates } : post
              )
            } : null
          };
        });
      },

      deletePost: (postId) => {
        set((state) => ({
          allPosts: state.allPosts.filter(post => post.id !== postId),
          user: state.user ? {
            ...state.user,
            posts: state.user.posts.filter(post => post.id !== postId)
          } : null
        }));
      },
      
      logout: () => set({ isAuthenticated: false, user: null, chatMessages: [], allPosts: [] }),
      
      // Rest of the existing methods remain the same
      addEcoPoints: (points, trashItems = 0) => 
        set((state) => {
          if (!state.user) return state;
          
          const newEcoPoints = (state.user.ecoPoints || 0) + points;
          const newRank = calculateRank(newEcoPoints);
          const oldRank = state.user.rank;
          
          if (newRank !== oldRank) {
            get().addNotification({
              type: 'achievement',
              title: 'New Rank Achieved!',
              message: `Congratulations! You've reached the rank of ${newRank}!`
            });
            
            get().unlockAchievement({
              title: `Reached ${newRank}`,
              description: `Achieved the rank of ${newRank}`,
              icon: '🏆',
              type: 'rank'
            });
          }
          
          const chatEnabled = newEcoPoints >= 1000;
          if (chatEnabled && !state.user.chatEnabled) {
            get().addNotification({
              type: 'general',
              title: 'Global Chat Unlocked!',
              message: 'You can now participate in the global community chat!'
            });
          }
          
          const today = getCurrentDate();
          let dailyEcoHistory = [...(state.user.dailyEcoHistory || [])];
          const todayIndex = dailyEcoHistory.findIndex(entry => entry.date === today);
          
          if (todayIndex >= 0) {
            dailyEcoHistory[todayIndex] = {
              ...dailyEcoHistory[todayIndex],
              ecoPoints: newEcoPoints,
              treesPlanted: Math.floor(newEcoPoints / 100),
              trashCollected: (dailyEcoHistory[todayIndex].trashCollected || 0) + trashItems
            };
          } else {
            dailyEcoHistory.push({
              date: today,
              ecoPoints: newEcoPoints,
              treesPlanted: Math.floor(newEcoPoints / 100),
              trashCollected: (state.user.dailyEcoHistory?.length > 0 
                ? (state.user.dailyEcoHistory[state.user.dailyEcoHistory.length - 1].trashCollected || 0) 
                : 0) + trashItems
            });
          }
          
          return {
            user: {
              ...state.user,
              ecoPoints: newEcoPoints,
              rank: newRank,
              chatEnabled,
              dailyEcoHistory,
              lastActive: new Date()
            }
          };
        }),

      updateUser: async (userData) => {
        set((state) => ({
          user: state.user ? {
            ...state.user,
            ...userData,
            lastActive: new Date()
          } : null
        }));
      },
      
      updateUserSettings: async (newSettings) => {
        set((state) => {
          if (!state.user) return state;
          
          return {
            user: {
              ...state.user,
              settings: {
                ...state.user.settings,
                ...newSettings
              },
              lastActive: new Date()
            }
          };
        });
      },
      
      addNotification: (notification) => 
        set((state) => {
          if (!state.user) return state;
          
          const newNotification: Notification = {
            id: crypto.randomUUID(),
            timestamp: new Date(),
            read: false,
            ...notification
          };
          
          return {
            user: {
              ...state.user,
              notifications: [newNotification, ...state.user.notifications]
            }
          };
        }),
      
      markNotificationAsRead: (notificationId) =>
        set((state) => {
          if (!state.user) return state;
          
          return {
            user: {
              ...state.user,
              notifications: state.user.notifications.map(notif =>
                notif.id === notificationId ? { ...notif, read: true } : notif
              )
            }
          };
        }),
      
      addChatMessage: (message) =>
        set((state) => ({
          chatMessages: [
            ...state.chatMessages,
            {
              id: crypto.randomUUID(),
              timestamp: new Date(),
              ...message
            }
          ]
        })),
      
      unlockAchievement: (achievement) =>
        set((state) => {
          if (!state.user) return state;
          
          const newAchievement: Achievement = {
            id: crypto.randomUUID(),
            unlockedAt: new Date(),
            ...achievement
          };
          
          return {
            user: {
              ...state.user,
              achievements: [newAchievement, ...state.user.achievements]
            }
          };
        }),
      
      updateLeaderboardPosition: (position) =>
        set((state) => {
          if (!state.user) return state;
          
          const newPosition: LeaderboardPosition = {
            ...state.user.leaderboardPosition,
            ...position,
            lastUpdated: new Date()
          };
          
          const iconicRanks = [10000, 1000, 750, 500, 250, 100, 50, 20, 10, 1];
          const oldGlobal = state.user.leaderboardPosition.global;
          const newGlobal = position.global || oldGlobal;
          
          if (newGlobal !== oldGlobal) {
            const achievedRank = iconicRanks.find(rank => newGlobal <= rank && oldGlobal > rank);
            if (achievedRank) {
              get().addNotification({
                type: 'leaderboard',
                title: 'Iconic Rank Achieved!',
                message: `You've reached the top ${achievedRank} players globally!`
              });
            }
          }
          
          return {
            user: {
              ...state.user,
              leaderboardPosition: newPosition
            }
          };
        }),
      
      addTreeMilestone: (milestone) =>
        set((state) => {
          if (!state.user) return state;
          
          const newMilestone: TreeMilestone = {
            ...milestone,
            achievedAt: new Date()
          };
          
          get().addNotification({
            type: 'tree',
            title: 'New Tree Planted!',
            message: `You've successfully planted your ${milestone.count}${
              milestone.count === 1 ? 'st' : 
              milestone.count === 2 ? 'nd' : 
              milestone.count === 3 ? 'rd' : 'th'
            } tree!`
          });
          
          return {
            user: {
              ...state.user,
              treeMilestones: [...state.user.treeMilestones, newMilestone]
            }
          };
        }),
      
      updateQuizStatus: (completed) =>
        set((state) => {
          if (!state.user) return state;
          
          const today = getCurrentDate();
          const wasCompletedToday = state.user.lastQuizDate === today;
          
          if (completed && !wasCompletedToday) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];
            
            const streakContinues = state.user.lastQuizDate === yesterdayStr;
            const newStreak = streakContinues ? state.user.quizStreak + 1 : 1;
            
            if (newStreak > state.user.quizStreak) {
              get().addNotification({
                type: 'achievement',
                title: 'Quiz Streak!',
                message: `You're on a ${newStreak}-day quiz streak!`
              });
            }
            
            return {
              user: {
                ...state.user,
                lastQuizDate: today,
                quizStreak: newStreak
              }
            };
          }
          return state;
        }),

      getFormattedJoinDate: () => {
        const state = get();
        if (!state.user?.joinedDate) return 'N/A';
        return formatJoinDate(state.user.joinedDate);
      },
      
      getDaysActive: () => {
        const state = get();
        if (!state.user?.joinedDate) return 0;
        return calculateDaysActive(state.user.joinedDate);
      },

      getFormattedDaysActive: () => {
        const state = get();
        if (!state.user?.joinedDate) return 'N/A';
        const days = calculateDaysActive(state.user.joinedDate);
        return formatDaysActive(days);
      },
      
      getUnreadNotificationsCount: () => {
        const state = get();
        return state.user?.notifications.filter(n => !n.read).length || 0;
      },
      
      getRecentAchievements: (count = 5) => {
        const state = get();
        return (state.user?.achievements || [])
          .sort((a, b) => b.unlockedAt.getTime() - a.unlockedAt.getTime())
          .slice(0, count);
      },
      
      getTreesPlanted: () => {
        const state = get();
        return state.user?.treeMilestones.length || 0;
      },
      
      getChatEligibility: () => {
        const state = get();
        if (!state.user) {
          return { 
            eligible: false, 
            reason: 'Please log in to access the chat.' 
          };
        }
        if (state.user.ecoPoints < 1000) {
          return { 
            eligible: false, 
            reason: `You need ${1000 - state.user.ecoPoints} more points to unlock the chat.` 
          };
        }
        return { eligible: true };
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        chatMessages: state.chatMessages,
        allPosts: state.allPosts // Include allPosts in persistence
      }),
    }
  )
);