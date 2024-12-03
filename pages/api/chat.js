// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Fallback responses when rate limited
const fallbackResponses = [
  'مرحباً! يمكنني مساعدتك في تحسين تجارتك الإلكترونية.',
  'أنا هنا لمساعدتك في تطوير عملك التجاري.',
  'كيف يمكنني مساعدتك في نمو تجارتك اليوم؟',
  'هل تحتاج إلى مساعدة في إدارة متجرك الإلكتروني؟',
  'يمكنني تقديم نصائح حول التجارة الإلكترونية في الجزائر.'
];

// Get random fallback response
const getFallbackResponse = () => {
  const index = Math.floor(Math.random() * fallbackResponses.length);
  return fallbackResponses[index];
};

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
    console.log('Calling OpenAI API...');
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 250,
    });

    console.log('OpenAI API response received');
    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    if (error.code === 'OPENAI_API_KEY_INVALID') {
      return 'مفتاح API غير صالح. يرجى التحقق من التكوين.';
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
      console.log('No OpenAI API key found');
      return res.status(200).json({
        response: getFallbackResponse()
      });
    }

    const response = await generateResponse(message);
    res.status(200).json({ response });

  } catch (error) {
    console.error('Error in chat API:', error);
    
    if (error.code === 'OPENAI_API_KEY_INVALID') {
      return res.status(500).json({ 
        message: 'مفتاح API غير صالح. يرجى التحقق من التكوين.',
        error: error.message 
      });
    }

    // Handle rate limit error
    if (error.code === 'rate_limit_exceeded' || error.message.includes('rate limit')) {
      return res.status(200).json({ 
        response: getFallbackResponse() + '\n\n(عذراً، النظام مشغول حالياً. سنعود قريباً بكامل الخدمات.)',
        isLimited: true
      });
    }

    res.status(500).json({ 
      message: 'حدث خطأ في معالجة طلبك. يرجى المحاولة مرة أخرى.',
      error: error.message 
    });
  }
}
