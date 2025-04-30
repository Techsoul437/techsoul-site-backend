import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const getBotReply = async (userMessage) => {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',  
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: userMessage }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000', 
          'X-Title': 'TechSoul Chatbot'
        }
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Chatbot Error:', error.response?.data || error.message);
    throw new Error('AI Chatbot failed to respond');
  }
};
