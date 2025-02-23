import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, ChevronDown } from 'lucide-react';
import { externalArticles } from '../data/articles';

// Available categories/tags
const categories = [
  "All",
  "Plastic",
  "Recycling",
  "Ocean",
  "Pollution",
  "Technology",
  "Sustainability",
  "E-Waste",
  "Circular Economy",
  "Climate Change"
];

const TrashpediaSearch = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [visibleArticles, setVisibleArticles] = useState(10);

  const filteredArticles = externalArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.keywords.some(kw => kw.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || 
                          article.keywords.includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  const loadMoreArticles = () => {
    setVisibleArticles(prev => prev + 10);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-white/10 rounded-lg"
        >
          <ArrowLeft className="text-[#D0FD3E]" />
        </button>
        <h1 className="text-3xl font-bold text-[#D0FD3E]">Trashpedia Search</h1>
      </div>

      {/* Search and Category Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search 500+ environmental articles..."
            className="w-full py-3 px-4 bg-white/5 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D0FD3E]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute right-4 top-3.5 text-gray-400" />
        </div>

        {/* Category Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="flex items-center gap-2 bg-white/5 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            <span>{selectedCategory}</span>
            <ChevronDown className={`transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} size={18} />
          </button>
          
          {isCategoryOpen && (
            <div className="absolute z-10 mt-2 w-56 bg-[#0A1A2F] border border-white/10 rounded-lg shadow-lg">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsCategoryOpen(false);
                    setVisibleArticles(10); // Reset visible articles when category changes
                  }}
                  className={`w-full px-4 py-2 text-left hover:bg-white/10 ${
                    category === selectedCategory ? 'text-[#D0FD3E]' : 'text-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.slice(0, visibleArticles).map(article => (
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-white/10 rounded-xl p-6 hover:bg-white/5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(208,253,62,0.3)] relative overflow-hidden"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-[#D0FD3E] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            
            <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
            <p className="text-gray-300 line-clamp-3">{article.preview}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {article.keywords.map(keyword => (
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

      {filteredArticles.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No articles found matching your search
        </div>
      )}

      {/* Load More Button */}
      {filteredArticles.length > visibleArticles && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMoreArticles}
            className="px-6 py-2 bg-[#D0FD3E] text-[#0A1A2F] rounded-lg hover:opacity-90 transition-opacity"
          >
            Load More Articles
          </button>
        </div>
      )}
    </div>
  );
};

export default TrashpediaSearch;