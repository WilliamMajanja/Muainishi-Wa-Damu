export const generateThankYouNote = async (donorName: string): Promise<string> => {
  try {
    const response = await fetch('/.netlify/functions/generate-thank-you', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ donorName }),
    });

    if (!response.ok) {
        throw new Error(`Serverless function failed with status ${response.status}`);
    }

    const result = await response.json();
    return result.message;

  } catch (error) {
    console.error('Error calling generate-thank-you function:', error);
    // Provide a graceful fallback
    return `Dear ${donorName}, thank you for your incredible gift! Your donation can help save up to three lives. You are a true hero. We appreciate you more than words can say.`;
  }
};
