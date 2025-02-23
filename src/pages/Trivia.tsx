// Trivia.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Lightbulb } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import toast from 'react-hot-toast';
import Confetti from 'react-confetti';
import { funFacts, generateDailyQuiz, QuizQuestion } from '../data/trivia';

const Trivia = () => {
  const { user, addEcoPoints, updateQuizStatus } = useAuthStore();
  const [currentFact, setCurrentFact] = useState(funFacts[0]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeTaken, setTimeTaken] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [nextQuizTime, setNextQuizTime] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [dailyQuestions, setDailyQuestions] = useState<QuizQuestion[]>([]);

  // Generate daily questions using the current date as seed
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const questions = generateDailyQuiz(today);
    setDailyQuestions(questions);
  }, []);

  // Initialize quiz and check daily reset
  useEffect(() => {
    const userQuizKey = `lastQuizDate_${user?.email}`;
    const userQuizCompletedKey = `quizCompleted_${user?.email}`;
    const today = new Date().toDateString();
    const lastQuizDate = localStorage.getItem(userQuizKey);

    if (lastQuizDate !== today) {
      setQuizStarted(false);
      setQuizCompleted(false);
      setCurrentQuestion(0);
      setScore(0);
      localStorage.removeItem(userQuizKey);
      localStorage.removeItem(userQuizCompletedKey);
    } else {
      const completed = localStorage.getItem(userQuizCompletedKey) === 'true';
      if (completed) {
        setQuizCompleted(true);
        const nextQuiz = new Date();
        nextQuiz.setHours(24, 0, 0, 0);
        setNextQuizTime(nextQuiz);
      }
    }
  }, [user?.email]);
  
  // Timer for next quiz
  useEffect(() => {
    if (nextQuizTime) {
      const timer = setInterval(() => {
        const now = new Date();
        const diff = nextQuizTime.getTime() - now.getTime();
        
        if (diff <= 0) {
          setQuizCompleted(false);
          setNextQuizTime(null);
          const userQuizKey = `lastQuizDate_${user?.email}`;
          const userQuizCompletedKey = `quizCompleted_${user?.email}`;
          localStorage.removeItem(userQuizKey);
          localStorage.removeItem(userQuizCompletedKey);
          clearInterval(timer);
        } else {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          setTimeRemaining(`${hours}h ${minutes}m`);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [nextQuizTime, user?.email]);

  // Initialize quiz timer
  useEffect(() => {
    if (quizStarted) {
      setStartTime(Date.now());
    }
  }, [quizStarted]);

  // Handle answer selection
  const handleAnswer = (selectedAnswer: string) => {
    const isCorrect = selectedAnswer === dailyQuestions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      toast.success('Correct answer! +2 points', {
        icon: '🎯',
        style: {
          background: '#D0FD3E',
          color: '#0A1A2F',
        },
      });
    } else {
      toast.error('Incorrect answer', {
        icon: '❌',
      });
    }

    if (currentQuestion === dailyQuestions.length - 1) {
      const timeElapsed = ((Date.now() - (startTime || 0)) / 1000);
      setTimeTaken(timeElapsed);
      setQuizCompleted(true);
      
      // Calculate total points
      let totalPoints = score + (isCorrect ? 1 : 0);
      const finalScore = totalPoints;
      
      // Add bonus points only if all questions were answered correctly (20 points) and completed under 25 seconds
      if (finalScore === 10 && timeElapsed < 25) {
        totalPoints += 5;
        toast.success('Perfect score under 25 seconds! +5 bonus points!', {
          duration: 3000,
          icon: '⭐',
        });
      }
      
      // Add points to user's account
      addEcoPoints(totalPoints);
      setShowConfetti(true);
      
      // Set completion status with user-specific keys
      const userQuizKey = `lastQuizDate_${user?.email}`;
      const userQuizCompletedKey = `quizCompleted_${user?.email}`;
      localStorage.setItem(userQuizKey, new Date().toDateString());
      localStorage.setItem(userQuizCompletedKey, 'true');
      
      const nextQuiz = new Date();
      nextQuiz.setHours(24, 0, 0, 0);
      setNextQuizTime(nextQuiz);
      
      toast.success(`Quiz completed! You earned ${totalPoints} Eco-Points!`, {
        duration: 5000,
        icon: '🎉',
      });
      
      setTimeout(() => setShowConfetti(false), 5000);
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      {showConfetti && <Confetti 
        width={window.innerWidth}
        height={window.innerHeight}
        colors={['#D0FD3E', '#2ECC71', '#ffffff']}
        recycle={false}
      />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Quiz Section */}
        <section>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
          >
            <div className="flex items-center space-x-4 mb-6">
              <Brain className="text-[#D0FD3E]" size={32} />
              <h2 className="text-2xl font-bold text-[#D0FD3E]">Daily Quiz</h2>
            </div>
            <div className="space-y-4">
              {quizCompleted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-bold text-[#D0FD3E]">Quiz Completed!</h3>
                  <p className="text-gray-300">Your score: {score} points</p>
                  <p className="text-gray-300">Time taken: {timeTaken.toFixed(1)} seconds</p>
                  {score === 10 && timeTaken < 25 && (
                    <p className="text-[#D0FD3E]">
                      +5 bonus points for perfect score and fast completion!
                    </p>
                  )}
                  <div className="bg-white/5 p-4 rounded-lg">
                    <p className="text-gray-300">Next quiz available in:</p>
                    <p className="text-2xl font-bold text-[#D0FD3E]">{timeRemaining}</p>
                  </div>
                </motion.div>
              ) : !quizStarted ? (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-gray-300">Test your knowledge and earn eco-points!</p>
                  <ul className="space-y-2 text-gray-300 mt-4">
                    <li>• 10 multiple-choice questions</li>
                    <li>• 1 Eco Point per correct answer</li>
                    <li>• 5 bonus points for perfect score under 25s</li>
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setQuizStarted(true)}
                    className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-[#D0FD3E] to-[#2ECC71] text-[#0A1A2F] font-semibold rounded-lg hover:opacity-90 transition-all duration-300"
                  >
                    Start Quiz
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-gray-300">Question {currentQuestion + 1} of 10</p>
                    <p className="text-[#D0FD3E]">Score: {score}</p>
                  </div>
                  <motion.p
                    key={currentQuestion}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-white text-lg font-semibold"
                  >
                    {dailyQuestions[currentQuestion].question}
                  </motion.p>
                  <div className="grid grid-cols-1 gap-3">
                    {dailyQuestions[currentQuestion].options.map((option, index) => (
                      <motion.button
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(option)}
                        className="w-full py-2 px-4 bg-white/5 text-left rounded-lg transition-all duration-300"
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </section>

        {/* Fun Facts Section */}
        <section>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
          >
            <div className="flex items-center space-x-4 mb-6">
              <Lightbulb className="text-[#D0FD3E]" size={32} />
              <h2 className="text-2xl font-bold text-[#D0FD3E]">Fun Facts</h2>
            </div>
            <div className="space-y-6">
              <motion.div
                key={currentFact}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-[100px] p-4 border border-white/10 rounded-lg"
              >
                <p className="text-gray-300">{currentFact}</p>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentFact(funFacts[Math.floor(Math.random() * funFacts.length)])}
                className="w-full py-3 px-4 bg-white/10 text-[#D0FD3E] font-semibold rounded-lg hover:bg-white/20 transition-all duration-300"
              >
                Generate New Fact
              </motion.button>
            </div>
          </motion.div>
        </section>
      </div>
    </motion.div>
  );
};

export default Trivia;