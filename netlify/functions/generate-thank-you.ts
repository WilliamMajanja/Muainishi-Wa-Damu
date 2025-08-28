import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

export const handler = async (event) => {
  if (!API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'API key not configured.' }) };
  }
   if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body);
    const { donorName } = body;
    
    if (!donorName || typeof donorName !== 'string' || donorName.trim() === '') {
      return { statusCode: 400, body: JSON.stringify({ error: 'donorName is required and must be a non-empty string.' }) };
    }

    const ai = new GoogleGenAI({ apiKey: API_KEY });

    const prompt = `You are a compassionate representative of the Muainishi wa Damu Blood Donation service in Kenya. Write a short, heartfelt, and inspiring thank you message to a blood donor named ${donorName}. Mention the incredible impact their single donation can have, potentially saving up to three lives. Keep the tone warm, personal, and encouraging. The message should be a single paragraph. Do not use markdown.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });

    if (response.text) {
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ message: response.text }),
        };
    } else {
        throw new Error('No text in Gemini response');
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate message.' }),
    };
  }
};
