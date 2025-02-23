import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuthStore } from './stores/authStore';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Home from './pages/Home';
import Deploy from './pages/Deploy';
import Trivia from './pages/Trivia';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import AboutUs from './pages/AboutUs';
import TrashpediaSearch from './pages/TrashpediaSearch';
import FAQs from './pages/FAQs';
import ContactSupport from './pages/ContactSupport';
import AccountSettings from './pages/AccountSettings';
import Marketplace from './pages/Marketplace';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import TrashTrekRulebook from './pages/TrashTrekRulebook';
import Community from './pages/Community';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route 
            path="/register" 
            element={isAuthenticated ? <Navigate to="/home" /> : <Register />} 
          />
          <Route element={<Layout />}>
            <Route 
              path="/home" 
              element={isAuthenticated ? <Home /> : <Navigate to="/register" />} 
            />
            <Route path="/community" element={isAuthenticated ? <Community /> : <Navigate to="/register" />} />
            <Route path="/deploy" element={<Deploy />} />
            <Route path="/trivia" element={<Trivia />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/trashpedia" element={<TrashpediaSearch />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/contact" element={<ContactSupport />} />
            <Route path="/settings" element={<AccountSettings />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/trashtrek-rulebook" element={<TrashTrekRulebook />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;