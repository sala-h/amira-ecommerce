// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    // For now, let's return a simple response without OpenAI
    // This ensures the API works even without the OpenAI key
    const response = {
      response: `مرحباً! تلقيت رسالتك: "${message}". كيف يمكنني مساعدتك اليوم؟`
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error in chat API:', error);
    res.status(500).json({ 
      message: 'حدث خطأ في معالجة طلبك. يرجى المحاولة مرة أخرى.',
      error: error.message 
    });
  }
}
