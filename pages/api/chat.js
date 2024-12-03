// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateResponse = async (message) => {
  const systemPrompt = `You are Amira, an AI assistant specialized in Algerian e-commerce.
  You help merchants optimize their online businesses.
  You are knowledgeable about:
  - Algerian market trends
  - Local payment methods (CCP, EDAHABIA, Baridimob)
  - Shipping services in Algeria
  - Local business regulations
  - Popular products and categories
  Always respond in Arabic and be helpful, professional, and concise.`;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 250,
    });

    return completion.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    if (error.response?.status === 401) {
      return 'عذراً، هناك مشكلة في تكوين المساعد. يرجى التواصل مع مسؤول النظام.';
    }
    return 'عذراً، حدث خطأ في معالجة طلبك. حاول مرة أخرى.';
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!process.env.OPENAI_API_KEY) {
      // Fallback response if no API key is configured
      return res.status(200).json({
        response: 'مرحباً! أنا أميرة. كيف يمكنني مساعدتك في تجارتك الإلكترونية اليوم؟'
      });
    }

    const response = await generateResponse(message);
    res.status(200).json({ response });
  } catch (error) {
    console.error('Error in chat API:', error);
    res.status(500).json({ 
      message: 'حدث خطأ في معالجة طلبك. يرجى المحاولة مرة أخرى.',
      error: error.message 
    });
  }
}
