import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/generate', async (req, res) => {
    try {
      const { topic } = req.body;
      const response = await fetch(process.env.API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'sonar',
          messages: [
            {
              role: 'system',
              content:
                'You are a LinkedIn content expert. Always respond with EXACTLY 3 LinkedIn post examples separated by "---". Each post should be 3-5 sentences, engaging, professional, and ready to copy-paste. Never explain, just give the 3 posts.'
            },
            {
              role: 'user',
              content: `Generate 3 LinkedIn posts about: ${topic}`
            }
          ],
          max_tokens: 1000,
          temperature: 0.7
        })
      });
  
      const data = await response.json();
      // Extract and parse posts here on the backend
      const generatedText = data.choices[0].message.content;
  
      const posts = generatedText
        .split('---')
        .map(post => post.trim())
        .filter(Boolean)
        .slice(0, 3);
  
      // Send only the posts to React
      res.json({ posts });
  
    } catch (error) {
      console.error('Backend error:', error);
      res.status(500).json({ error: 'Failed to generate posts' });
    }
  });  

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Backend running on ${PORT}`);
  });
