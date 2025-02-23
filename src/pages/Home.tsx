import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Trees as Tree, Award, Star } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { Link } from 'react-router-dom';
import { externalArticles } from '../data/articles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import CountUp from 'react-countup';

const preprocessUserHistoryData = (user: any) => {
  if (!user?.dailyEcoHistory) return [];

  // Sort history by date
  const sortedHistory = [...user.dailyEcoHistory].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Get today's date
  const today = new Date().toISOString().split('T')[0];
  
  // Add today's data if not present
  if (sortedHistory[sortedHistory.length - 1]?.date !== today) {
    const lastEntry = sortedHistory[sortedHistory.length - 1] || {
      ecoPoints: 0,
      treesPlanted: 0,
      trashCollected: 0
    };
    
    sortedHistory.push({
      date: today,
      ecoPoints: (user.ecoPoints || 0) - (lastEntry.ecoPoints || 0),
      treesPlanted: (user.treeMilestones?.length || 0) - (lastEntry.treesPlanted || 0),
      trashCollected: 0 // Reset for new day
    });
  }

  // Transform data to show daily changes
  return sortedHistory.map((entry, index) => {
    const prevEntry = sortedHistory[index - 1];
    
    // Calculate daily trees planted on this specific date
    const treesPlantedToday = (user.treeMilestones || []).filter(
      (tm: any) => new Date(tm.achievedAt).toISOString().split('T')[0] === entry.date
    ).length;

    return {
      date: entry.date,
      dateFormatted: new Date(entry.date).toLocaleDateString(),
      // For first entry use its values as daily, for others calculate difference
      dailyPoints: index === 0 ? entry.ecoPoints : entry.ecoPoints - (prevEntry?.ecoPoints || 0),
      dailyTrees: treesPlantedToday,
      dailyTrash: index === 0 ? entry.trashCollected : entry.trashCollected - (prevEntry?.trashCollected || 0)
    };
  });
};

const Home = () => {
  const { user } = useAuthStore();
  const [graphData, setGraphData] = useState<any[]>([]);
  const [globalRank, setGlobalRank] = useState(1234);

  useEffect(() => {
    if (user) {
      const processedData = preprocessUserHistoryData(user);
      setGraphData(processedData);
    }
  }, [user, user?.ecoPoints, user?.treeMilestones, user?.dailyEcoHistory]);

  // Calculate rank progress
  const rankThresholds = {
    'TrashTrek Grandmaster': 1000000,
    'Master of Restoration': 900000,
    'Global Eco Leader': 800000,
    'Earthian Visionary': 700000,
    'Supreme Savior': 600000,
    'Zero Waste Hero': 500000,
    'Nature’s Guardian': 400000,
    'Environmental Titan': 300000,
    'Eco Pathfinder': 200000,
    'Earth Trailblazer': 150000,
    'Climate Crusader': 100000,
    'Green Sentinel': 75000,
    'Eco Commander': 50000,
    'Planet Pioneer': 25000,
    'Eco Legend': 10000,
    'Environmental Master': 5000,
    'Sustainability Champion': 2500,
    'Green Warrior': 1000,
    'Eco Guardian': 500,
    'Nature Protector': 250,
    'Earth Defender': 100,
    'Eco Rookie': 0
  };

  const currentRankEntry = Object.entries(rankThresholds).find(
    ([_, threshold]) => (user?.ecoPoints || 0) >= threshold
  );

  const nextRankEntry = Object.entries(rankThresholds)
    .reverse()
    .find(([_, threshold]) => (user?.ecoPoints || 0) < threshold);

  const pointsToNextRank = nextRankEntry 
    ? nextRankEntry[1] - (user?.ecoPoints || 0)
    : 0;

  const progressToNextRank = nextRankEntry
    ? ((user?.ecoPoints || 0) - (currentRankEntry?.[1] || 0)) / 
      (nextRankEntry[1] - (currentRankEntry?.[1] || 0)) * 100
    : 100;

  // Get the join date from the first entry in history or user.joinedDate
  const getFormattedJoinDate = () => {
    if (user?.joinedDate) {
      return new Date(user.joinedDate).toLocaleDateString();
    }
    if (user?.dailyEcoHistory?.length > 0) {
      const sortedHistory = [...user.dailyEcoHistory].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      return new Date(sortedHistory[0].date).toLocaleDateString();
    }
    return new Date().toLocaleDateString();
  };

  const formattedJoinDate = getFormattedJoinDate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Dashboard Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-[#D0FD3E]">Dashboard</h2>
        
        {/* Rank Progress Card */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-[#D0FD3E] flex items-center gap-2">
                <Star className="w-5 h-5" />
                Current Rank
              </h3>
              <p className="text-2xl font-bold text-white mt-1">
                {currentRankEntry?.[0] || 'Eco Rookie'}
              </p>
              <p className="text-sm text-gray-300">
                Member since: {formattedJoinDate}
              </p>
            </div>
            {nextRankEntry && (
              <div className="text-right">
                <p className="text-sm text-gray-300">Next Rank</p>
                <p className="text-lg font-semibold text-[#D0FD3E]">{nextRankEntry[0]}</p>
                <p className="text-sm text-gray-300">
                  {pointsToNextRank} points to go
                </p>
              </div>
            )}
          </div>
          
          {/* Progress Bar */}
          <div className="h-4 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressToNextRank}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-[#D0FD3E] to-[#2ECC71] relative"
            >
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-white/20"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
          >
            <div className="flex items-center space-x-4">
              <Trophy className="text-[#D0FD3E]" size={24} />
              <div>
                <p className="text-sm text-gray-300">Eco Points</p>
                <CountUp
                  end={user?.ecoPoints || 0}
                  duration={2}
                  className="text-2xl font-bold"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
          >
            <div className="flex items-center space-x-4">
              <Tree className="text-[#D0FD3E]" size={24} />
              <div>
                <p className="text-sm text-gray-300">Trees Planted</p>
                <CountUp
                  end={user?.treeMilestones?.length || 0}
                  duration={2}
                  className="text-2xl font-bold"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
          >
            <div className="flex items-center space-x-4">
              <Award className="text-[#D0FD3E]" size={24} />
              <div>
                <p className="text-sm text-gray-300">Global Rank</p>
                <motion.p
                  key={globalRank}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold"
                >
                  #{globalRank}
                </motion.p>
              </div>
            </div> </motion.div>
        </div>

        {/* Analytics Graphs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Eco Points Over Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-[#D0FD3E] mb-4">Your Daily Eco-Point Earnings</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={graphData}>
                  <defs>
                    <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D0FD3E" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#D0FD3E" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="dateFormatted" 
                    stroke="#D0FD3E"
                    angle={-45}
                    textAnchor="end"
                    height={70}
                    interval="preserveStartEnd"
                    tickFormatter={(value, index) => {
                      if (index === 0 || index === graphData.length - 1 || index % Math.ceil(graphData.length / 5) === 0) {
                        return value;
                      }
                      return '';
                    }}
                  />
                  <YAxis stroke="#D0FD3E" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(10, 26, 47, 0.9)',
                      border: '1px solid rgba(208, 253, 62, 0.2)',
                      borderRadius: '8px'
                    }}
                    formatter={(value) => [`${value} points`, 'Points Earned']}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="dailyPoints" 
                    stroke="#D0FD3E" 
                    fillOpacity={1}
                    fill="url(#colorPoints)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        
          {/* Trees Planted Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-[#D0FD3E] mb-4">Your Daily Trees Planted</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={graphData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="dateFormatted"
                    stroke="#D0FD3E"
                    angle={-45}
                    textAnchor="end"
                    height={70}
                    interval="preserveStartEnd"
                    tickFormatter={(value, index) => {
                      if (index === 0 || index === graphData.length - 1 || index % Math.ceil(graphData.length / 5) === 0) {
                        return value;
                      }
                      return '';
                    }}
                  />
                  <YAxis stroke="#D0FD3E" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(10, 26, 47, 0.9)',
                      border: '1px solid rgba(208, 253, 62, 0.2)',
                      borderRadius: '8px'
                    }}
                    formatter={(value) => [`${value} trees`, 'Trees Planted']}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="dailyTrees" 
                    stroke="#2ECC71" 
                    strokeWidth={2}
                    dot={{ fill: '#2ECC71' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        
          {/* Trash Collection Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 lg:col-span-2"
          >
            <h3 className="text-lg font-semibold text-[#D0FD3E] mb-4">Your Daily Trash Collection</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={graphData}>
                  <defs>
                    <linearGradient id="colorTrash" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2ECC71" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#2ECC71" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="dateFormatted" 
                    stroke="#D0FD3E"
                    angle={-45}
                    textAnchor="end"
                    height={70}
                    interval="preserveStartEnd"
                    tickFormatter={(value, index) => {
                      if (index === 0 || index === graphData.length - 1 || index % Math.ceil(graphData.length / 5) === 0) {
                        return value;
                      }
                      return '';
                    }}
                  />
                  <YAxis stroke="#D0FD3E" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(10, 26, 47, 0.9)',
                      border: '1px solid rgba(208, 253, 62, 0.2)',
                      borderRadius: '8px'
                    }}
                    formatter={(value) => [`${value} items`, 'Trash Collected']}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="dailyTrash" 
                    stroke="#2ECC71" 
                    fillOpacity={1}
                    fill="url(#colorTrash)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trashpedia Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-[#D0FD3E]">Trashpedia</h2>
          <Link 
            to="/trashpedia"
            className="text-[#D0FD3E] hover:underline"
          >
            Learn More →
          </Link>
        </div>

        <div className="flex overflow-x-auto pb-4 gap-6 scrollbar-hide">
          {externalArticles.slice(0, 10).map(article => (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[300px] border border-white/10 rounded-xl p-6 hover:bg-white/5 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
              <p className="text-gray-300 line-clamp-3">{article.preview}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {article.keywords.slice(0, 2).map(keyword => (
                  <span 
                    key={keyword}
                    className="px-3 py-1 bg-white/5 rounded-full text-sm"
                  >
                    #{keyword}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Home;