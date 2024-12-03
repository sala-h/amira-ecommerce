export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    // Here you would typically call your AI service
    // For now, we'll return a simple response
    const response = {
      response: 'شكراً على رسالتك! سأقوم بمساعدتك في تحسين تجارتك الإلكترونية. كيف يمكنني مساعدتك اليوم؟'
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error processing chat:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
