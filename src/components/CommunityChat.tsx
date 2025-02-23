import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Paperclip, Smile } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { motion, AnimatePresence } from 'framer-motion';
import EmojiPicker from 'emoji-picker-react';
import toast from 'react-hot-toast';

const CommunityChat = () => {
  const {
    user,
    chatMessages,
    addChatMessage,
    getChatEligibility
  } = useAuthStore();

  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const chatRef = useRef(null);
  
  const { eligible, reason } = getChatEligibility();

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [chatMessages, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        const isEmojiPicker = event.target.closest('.emoji-picker-react');
        if (!isEmojiPicker) {
          setIsOpen(false);
          setShowEmojiPicker(false);
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClick = () => {
    if (eligible) {
      setIsOpen(true);
    } else {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setShowEmojiPicker(false);
  };

  const handleSend = () => {
    if (message.trim()) {
      addChatMessage({
        userId: user?.id || '',
        username: user?.username || '',
        content: message,
        type: 'text'
      });
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      const mockUploadUrl = `/api/placeholder/400/300`;
      
      const type = file.type.startsWith('image/') ? 'image' :
                   file.type.includes('gif') ? 'gif' :
                   file.type.startsWith('video/') ? 'video' :
                   file.type.startsWith('audio/') ? 'audio' : 'text';

      addChatMessage({
        userId: user?.id || '',
        username: user?.username || '',
        content: '',
        type,
        mediaUrl: mockUploadUrl
      });
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setMessage(prev => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const formatTimestamp = (date) => {
    return new Date(date).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const renderMessage = (msg) => {
    const isOwnMessage = msg.userId === user?.id;

    return (
      <div
        key={msg.id}
        className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div className={`max-w-[70%] ${isOwnMessage ? 'bg-green-600' : 'bg-gray-700'} rounded-lg p-3`}>
          {!isOwnMessage && (
            <div className="text-xs text-gray-300 mb-1">{msg.username}</div>
          )}
          
          {msg.type === 'text' && (
            <p className="text-white break-words">{msg.content}</p>
          )}
          
          {(msg.type === 'image' || msg.type === 'gif') && (
            <img 
              src={msg.mediaUrl} 
              alt="Shared media"
              className="max-w-full rounded-lg"
            />
          )}
          
          {msg.type === 'video' && (
            <video 
              controls 
              className="max-w-full rounded-lg"
              src={msg.mediaUrl}
            />
          )}
          
          {msg.type === 'audio' && (
            <audio 
              controls 
              className="max-w-full"
              src={msg.mediaUrl}
            />
          )}
          
          <div className="text-xs text-gray-300 mt-1 text-right">
            {formatTimestamp(msg.timestamp)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={handleClick}
          type="button"
          className="relative inline-flex items-center justify-center p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          aria-label="Toggle chat"
        >
          <MessageCircle className="text-[#D0FD3E]" />
          {eligible && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
          )}
        </button>

        <AnimatePresence>
          {showPopup && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 top-12 w-64 p-4 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg z-[60]"
            >
              <p className="text-sm text-white">
                You need {1000 - user.ecoPoints} more points to unlock the chat!
              </p>
              {user && (
                <div className="mt-2 text-xs text-gray-300">
                  Progress: {user.ecoPoints} / 1,000 points
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && eligible && (
          <motion.div
            ref={chatRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed bottom-20 right-4 w-96 h-[600px] bg-gray-800 rounded-lg shadow-xl overflow-hidden z-[60] flex flex-col"
          >
            <div className="bg-gray-900 p-4 flex justify-between items-center">
              <h3 className="text-white font-semibold">Community Chat</h3>
              <button
                onClick={handleClose}
                type="button"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map(renderMessage)}
              <div ref={chatEndRef} />
            </div>

            <div className="bg-gray-900 p-4 space-y-4">
              {showEmojiPicker && (
                <div className="absolute bottom-20 right-4">
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  type="button"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Smile size={20} />
                </button>
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  type="button"
                  className="text-gray-400 hover:text-white transition-colors"
                  disabled={isUploading}
                >
                  <Paperclip size={20} />
                </button>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*,video/*,audio/*,.gif"
                />
                
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-700 text-white rounded-lg p-2 resize-none"
                  rows={1}
                />
                
                <button
                  onClick={handleSend}
                  type="button"
                  disabled={!message.trim() && !isUploading}
                  className="text-[#D0FD3E] hover:text-white transition-colors disabled:text-gray-500"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommunityChat;