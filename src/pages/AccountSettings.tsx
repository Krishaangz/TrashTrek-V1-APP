import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Bell, Lock, Trash2, LogOut, Upload, Camera, Shield, Eye, Globe, Gamepad, UserCheck } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ProfilePictureManager from './ProfilePictureManager';

const AccountSettings = () => {
  const { user, logout, updateUser, updateUserSettings } = useAuthStore();
  const navigate = useNavigate();
  
  
  const [formData, setFormData] = useState({
    username: user?.username || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  // Initialize state from the user settings
  const [notifications, setNotifications] = useState(user?.settings?.notifications || {
    email: true,
    push: true,
    updates: true
  });

  const [securitySettings, setSecuritySettings] = useState(user?.settings?.security || {
    twoFactorAuth: false,
    biometricLogin: true,
    rememberDevice: true,
    autoLogout: false
  });

  const [privacySettings, setPrivacySettings] = useState(user?.settings?.privacy || {
    profileVisibility: 'friends' as 'public' | 'friends' | 'private', // Type assertion
    onlineStatus: true,
    activityFeed: true,
    friendRequests: true,
    dataCollection: true
  });

  const [gameSettings, setGameSettings] = useState(user?.settings?.game || {
    crossPlatformPlay: true,
    autoMatchmaking: true,
    voiceChat: true,
    pushNotifications: true,
    soundEffects: true,
    vibration: true
  });

  // Sync with user settings if they change
  useEffect(() => {
    if (user?.settings) {
      setNotifications(user.settings.notifications);
      setSecuritySettings(user.settings.security);
      setPrivacySettings(user.settings.privacy);
      setGameSettings(user.settings.game);
    }
  }, [user?.settings]);

  const handleLogout = () => {
    logout();
    navigate('/register');
    toast.success('Logged out successfully');
  };

  const validatePasswordChange = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New passwords do not match');
      return false;
    }
    if (formData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return false;
    }
    return true;
  };

  const handleSaveChanges = async () => {
    if (formData.newPassword && !validatePasswordChange()) {
      return;
    }

    try {
      // Save all settings at once
      await updateUserSettings({
        notifications,
        security: securitySettings,
        privacy: privacySettings,
        game: gameSettings
      });


      // If password change is requested
      if (formData.newPassword) {
        // Here you would typically call your password update API
        console.log('Password update would happen here');
      }

      toast.success('Settings saved successfully');
      
      // Reset password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));

      // Redirect to Profile.tsx
      navigate('/profile');
    } catch (error) {
      toast.error('Failed to save changes');
      console.error('Error saving changes:', error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirmed) {
      try {
        // Here you would typically call your account deletion API
        toast.success('Account deleted successfully');
        logout();
        navigate('/register');
      } catch (error) {
        toast.error('Failed to delete account');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex items-center space-x-4 mb-8">
        <Settings className="text-[#D0FD3E]" size={32} />
        <h1 className="text-3xl font-bold text-[#D0FD3E]">Account Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Settings */}
        <motion.section
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6 text-[#D0FD3E]">Profile Information</h2>
            
            {/* Profile Picture */}
            <ProfilePictureManager />

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#D0FD3E] focus:border-transparent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#D0FD3E] focus:border-transparent transition-colors"
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center space-x-4 mb-6">
              <Bell className="text-[#D0FD3E]" />
              <h2 className="text-xl font-semibold text-[#D0FD3E]">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Email Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D0FD3E]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Push Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.push}
                    onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D0FD3E]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Product Updates</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.updates}
                    onChange={(e) => setNotifications({ ...notifications, updates: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D0FD3E]"></div>
                </label>
              </div>
            </div>
          </div>
          
          {/* Privacy Settings */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center space-x-4 mb-6">
              <Eye className="text-[#D0FD3E]" />
              <h2 className="text-xl font-semibold text-[#D0FD3E]">Privacy</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Profile Visibility
                </label>
                <select
                  value={privacySettings.profileVisibility}
                  onChange={(e) => setPrivacySettings({ 
                    ...privacySettings, 
                    profileVisibility: e.target.value as 'public' | 'friends' | 'private'
                  })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#D0FD3E] focus:border-transparent transition-colors"
                >
                  <option value="public">Public</option>
                  <option value="friends">Friends Only</option>
                  <option value="private">Private</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Show Online Status</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacySettings.onlineStatus}
                    onChange={(e) => setPrivacySettings({ ...privacySettings, onlineStatus: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D0FD3E]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Show Activity Feed</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacySettings.activityFeed}
                    onChange={(e) => setPrivacySettings({ ...privacySettings, activityFeed: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D0FD3E]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Allow Friend Requests</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacySettings.friendRequests}
                    onChange={(e) => setPrivacySettings({ ...privacySettings, friendRequests: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D0FD3E]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Allow Data Collection</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacySettings.dataCollection}
                    onChange={(e) => setPrivacySettings({ ...privacySettings, dataCollection: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D0FD3E]"></div>
                </label>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Security and Game Settings */}
        <motion.section
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center space-x-4 mb-6">
              <Lock className="text-[#D0FD3E]" />
              <h2 className="text-xl font-semibold text-[#D0FD3E]">Security</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#D0FD3E] focus:border-transparent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#D0FD3E] focus:border-transparent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg focus:ring-2 focus:ring-[#D0FD3E] focus:border-transparent transition-colors"
                />
              </div>
            </div>
          </div>
          
          {/* Enhanced Security Settings */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center space-x-4 mb-6">
              <Shield className="text-[#D0FD3E]" />
              <h2 className="text-xl font-semibold text-[#D0FD3E]">Enhanced Security</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Two-Factor Authentication</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={securitySettings.twoFactorAuth}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, twoFactorAuth: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D0FD3E]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Biometric Login</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={securitySettings.biometricLogin}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, biometricLogin: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D0FD3E]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Remember Device</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={securitySettings.rememberDevice}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, rememberDevice: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D0FD3E]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Auto Logout (after 30 min)</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={securitySettings.autoLogout}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, autoLogout: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D0FD3E]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Game Settings */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center space-x-4 mb-6">
              <Gamepad className="text-[#D0FD3E]" />
              <h2 className="text-xl font-semibold text-[#D0FD3E]">Game Settings</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Cross-Platform Play</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={gameSettings.crossPlatformPlay}
                    onChange={(e) => setGameSettings({ ...gameSettings, crossPlatformPlay: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D0FD3E]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Auto Matchmaking</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={gameSettings.autoMatchmaking}
                    onChange={(e) => setGameSettings({ ...gameSettings, autoMatchmaking: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D0FD3E]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Voice Chat</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={gameSettings.voiceChat}
                    onChange={(e) => setGameSettings({ ...gameSettings, voiceChat: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D0FD3E]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Push Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={gameSettings.pushNotifications}
                    onChange={(e) => setGameSettings({ ...gameSettings, pushNotifications: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D0FD3E]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Sound Effects</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={gameSettings.soundEffects}
                    onChange={(e) => setGameSettings({ ...gameSettings, soundEffects: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D0FD3E]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Vibration</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={gameSettings.vibration}
                    onChange={(e) => setGameSettings({ ...gameSettings, vibration: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D0FD3E]"></div>
                </label>
              </div>
            </div>
          </div>      

          {/* Danger Zone */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center space-x-4 mb-6">
              <Trash2 className="text-red-500" />
              <h2 className="text-xl font-semibold text-red-500">Danger Zone</h2>
            </div>
            <div className="space-y-4">
              <button
                onClick={handleDeleteAccount}
                className="w-full p-4 text-left text-red-500 border border-red-500/20 rounded-lg hover:bg-red-500/10 transition-colors"
              >
                Delete Account
              </button>
              <button
                onClick={handleLogout}
                className="w-full p-4 text-left border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <LogOut size={20} />
                  <span>Logout</span>
                </div>
              </button>
            </div>
          </div>
        </motion.section>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSaveChanges} 
          className="px-6 py-3 bg-gradient-to-r from-[#D0FD3E] to-[#2ECC71] text-[#0A1A2F] font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          Save Changes
        </button>
      </div>
    </motion.div>
  );
};

export default AccountSettings;