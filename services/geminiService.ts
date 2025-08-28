import { GoogleGenAI } from "@google/genai";

export const generateThankYouNote = async (donorName: string): Promise<string> => {
  try {
    // The API key is assumed to be available in the environment as process.env.API_KEY
    if (!process.env.API_KEY) {
      console.error('API key not configured.');
      // Fallback to default message if API key is missing
      throw new Error('API key is not configured.');
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `You are a compassionate representative of the Muainishi wa Damu Blood Donation service in Kenya. Write a short, heartfelt, and inspiring thank you message to a blood donor named ${donorName}. Mention the incredible impact their single donation can have, potentially saving up to three lives. Keep the tone warm, personal, and encouraging. The message should be a single paragraph. Do not use markdown.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });

    if (response.text) {
        return response.text;
    } else {
        throw new Error('No text in Gemini response');
    }

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    // Provide a graceful fallback
    return `Dear ${donorName}, thank you for your incredible gift! Your donation can help save up to three lives. You are a true hero. We appreciate you more than words can say.`;
  }
};
