
export const generateLinkedInPosts = async (topic) => {
    try {
      const response = await fetch('/api/generate', {
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
  
