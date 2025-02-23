import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Gift, Trees as Tree, Coffee, Book, Leaf } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import toast from 'react-hot-toast';

// Import addNotification from authStore
interface AuthStore {
  user: any;
  addEcoPoints: (points: number) => void;
  addTreeMilestone: (milestone: any) => void;
  addNotification: (notification: {
    type: string;
    title: string;
    message: string;
  }) => void;
}

interface Product {
  id: string;
  name: string;
  description: string;
  points: number;
  icon: React.ReactNode;
  category: 'gift-cards' | 'eco-products' | 'trees';
  stock?: number;
}

const products: Product[] = [
  {
    id: 'gc1',
    name: 'Amazon Gift Card',
    description: '$10 Amazon Gift Card',
    points: 1000,
    icon: <Gift className="text-[#D0FD3E]" size={24} />,
    category: 'gift-cards',
    stock: 50
  },
  {
    id: 'gc2',
    name: 'Starbucks Gift Card',
    description: '$5 Starbucks Gift Card',
    points: 500,
    icon: <Coffee className="text-[#D0FD3E]" size={24} />,
    category: 'gift-cards',
    stock: 100
  },
  {
    id: 'ep1',
    name: 'Eco-Friendly Notebook',
    description: 'Made from recycled materials',
    points: 300,
    icon: <Book className="text-[#D0FD3E]" size={24} />,
    category: 'eco-products',
    stock: 75
  },
  {
    id: 'ep2',
    name: 'Bamboo Utensils Set',
    description: 'Sustainable dining essentials',
    points: 400,
    icon: <Leaf className="text-[#D0FD3E]" size={24} />,
    category: 'eco-products',
    stock: 30
  },
  {
    id: 't1',
    name: 'Plant a Tree',
    description: 'Plant a tree in your name',
    points: 100,
    icon: <Tree className="text-[#D0FD3E]" size={24} />,
    category: 'trees',
    stock: 1000
  }
];

const Marketplace = () => {
  const { user, addEcoPoints, addTreeMilestone, addNotification } = useAuthStore() as AuthStore;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [purchaseInProgress, setPurchaseInProgress] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const handlePurchase = async (product: Product) => {
    if (!user) {
      toast.error('Please log in to make a purchase');
      return;
    }

    if ((user.ecoPoints || 0) < product.points) {
      toast.error(`Not enough points! You need ${product.points - (user.ecoPoints || 0)} more points`);
      return;
    }

    if (product.stock === 0) {
      toast.error('This item is currently out of stock');
      return;
    }

    setPurchaseInProgress(true);
    setSelectedProduct(product);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Deduct points
      addEcoPoints(-product.points);

      // If it's a tree, update the tree milestones
      if (product.category === 'trees') {
        const currentTreeCount = user.treeMilestones?.length || 0;
        addTreeMilestone({
          count: currentTreeCount + 1,
          species: 'Oak',
          latitude: Math.random() * 180 - 90,
          longitude: Math.random() * 360 - 180
        });
      }

      // Add purchase notification
      addNotification({
        type: 'marketplace',
        title: '🛍️ Purchase Successful!',
        message: `You've successfully purchased ${product.name} for ${product.points} points!`
      });

      // If it's a tree, add an additional eco notification
      if (product.category === 'trees') {
        addNotification({
          type: 'tree',
          title: '🌳 New Tree Milestone!',
          message: 'A new tree will be planted in your name!'
        });
      }

      // Show success message
      toast.success(`Successfully redeemed ${product.name}!`, {
        duration: 5000,
        icon: '🎉',
      });

      if (product.category === 'trees') {
        toast.success('A new tree will be planted in your name! 🌳', {
          duration: 5000,
        });
      }
    } catch (error) {
      toast.error('Failed to process purchase. Please try again.');
    } finally {
      setPurchaseInProgress(false);
      setSelectedProduct(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex items-center space-x-4 mb-8">
        <ShoppingBag className="text-[#D0FD3E]" size={32} />
        <h1 className="text-3xl font-bold text-[#D0FD3E]">Marketplace</h1>
      </div>

      {/* Points Display */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-300">Available Points</p>
            <motion.p
              key={user?.ecoPoints}
              initial={{ scale: 1.2, color: '#D0FD3E' }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold text-[#D0FD3E]"
            >
              {user?.ecoPoints || 0}
            </motion.p>
          </div>
          <div className="text-right">
            <p className="text-gray-300">Current Rank</p>
            <p className="text-xl font-semibold text-[#D0FD3E]">{user?.rank || 'Eco Rookie'}</p>
          </div>
        </div>
      </motion.div>

      {/* Category Filter */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {['all', 'gift-cards', 'eco-products', 'trees'].map((category) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? 'bg-[#D0FD3E] text-[#0A1A2F]'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </motion.button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-colors relative overflow-hidden"
          >
            {/* Stock Badge */}
            {product.stock !== undefined && product.stock <= 10 && (
              <div className="absolute top-2 right-2 bg-red-500/80 text-white px-2 py-1 rounded-full text-xs">
                Only {product.stock} left!
              </div>
            )}
            
            <div className="flex items-center space-x-4 mb-4">
              {product.icon}
              <h3 className="text-lg font-semibold">{product.name}</h3>
            </div>
            <p className="text-gray-300 mb-4">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-[#D0FD3E] font-bold">{product.points} points</span>
              <motion.button
                onClick={() => handlePurchase(product)}
                disabled={purchaseInProgress || (product.stock === 0)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 bg-gradient-to-r from-[#D0FD3E] to-[#2ECC71] text-[#0A1A2F] font-semibold rounded-lg transition-all duration-300 ${
                  purchaseInProgress && selectedProduct?.id === product.id
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:opacity-90'
                } ${
                  product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {purchaseInProgress && selectedProduct?.id === product.id ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    ⟳
                  </motion.span>
                ) : product.stock === 0 ? (
                  'Out of Stock'
                ) : (
                  'Redeem'
                )}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Coming Soon Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center"
      >
        <h2 className="text-xl font-semibold text-[#D0FD3E] mb-2">More Coming Soon!</h2>
        <p className="text-gray-300">
          We're working on partnerships to bring you more exciting rewards and eco-friendly products.
          Stay tuned!
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Marketplace;