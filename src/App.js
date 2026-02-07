import { useState } from 'react';
import { generateLinkedInPosts } from './services/ai-service.js';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const handleGenerate = async () => {
    if (!inputText.trim()) return;
    
    setLoading(true);
    setPosts([]);
    
    try {
      const generatedPosts = await generateLinkedInPosts(inputText);
      setPosts(generatedPosts);
    } catch (error) {
      setPosts(['Error: Check your API key and network.']);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-8">
      <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-10 w-full max-w-2xl border border-white/50">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 drop-shadow-lg">
          LinkedIn Post Generator
        </h1>
        
        <div className="space-y-6">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter topic (e.g., 'Azure DevOps best practices')"
            className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-transparent shadow-lg transition-all duration-300 hover:shadow-xl bg-gradient-to-r from-gray-50 to-white"
            onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
          />
          
          <button
            onClick={handleGenerate}
            disabled={loading || !inputText.trim()}
            className="w-full py-4 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg rounded-2xl shadow-xl hover:from-indigo-700 hover:to-purple-700 transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? 'Generating...' : 'Generate Posts'}
          </button>
        </div>

        {posts.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your 3 LinkedIn Posts:</h2>
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <div 
                  key={index}
                  className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-indigo-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 group"
                  onClick={() => navigator.clipboard.writeText(post)}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                      {index + 1}
                    </div>
                    <span className="text-indigo-600 font-semibold">Copy Post</span>
                  </div>
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap group-hover:text-indigo-900 transition-colors">{post}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;