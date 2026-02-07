const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const generateLinkedInPosts = async (topic) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });
  
      if (!response.ok) {
        throw new Error('Request failed');
      }
  
      const posts = await response.json();
      return posts.posts;
    } catch (error) {
      console.error('Backend error:', error);
      throw error;
    }
  };
  
