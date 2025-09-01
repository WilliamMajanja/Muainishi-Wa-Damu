import { GoogleGenAI, Type } from "@google/genai";

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

export interface BloodWorkAnalysis {
  summary: {
    totalUnits: number;
    bloodTypesFound: number;
    mostCommonType: string;
    rarestType: string;
  };
  breakdown: Array<{
    bloodType: string;
    units: number;
    percentage: string;
  }>;
  insights: string[];
}

export const analyzeBloodWorkFile = async (fileContent: string): Promise<BloodWorkAnalysis> => {
  if (!process.env.API_KEY) {
    console.error('API key not configured.');
    throw new Error('API key is not configured.');
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `You are a helpful haematology lab assistant. Analyze the following blood work data, which is provided in CSV format. The columns are BloodType and Units. Perform the following tasks:
1. Calculate the total number of units.
2. Count the number of distinct blood types.
3. Identify the most common and rarest blood types from the sample.
4. Provide a breakdown of units and percentage for each blood type.
5. Generate 2-3 brief, actionable insights based on the data, such as identifying critical shortages (e.g., O- is low) or surpluses.

Data:
---
${fileContent}
---

Return the analysis in JSON format.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.OBJECT,
              properties: {
                totalUnits: { type: Type.INTEGER },
                bloodTypesFound: { type: Type.INTEGER },
                mostCommonType: { type: Type.STRING },
                rarestType: { type: Type.STRING },
              }
            },
            breakdown: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  bloodType: { type: Type.STRING },
                  units: { type: Type.INTEGER },
                  percentage: { type: Type.STRING },
                }
              }
            },
            insights: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        },
      },
    });

    const jsonString = response.text;
    const result = JSON.parse(jsonString);
    return result as BloodWorkAnalysis;

  } catch (error) {
    console.error('Error analyzing blood work file with Gemini:', error);
    throw new Error('The AI analysis failed. Please ensure the file format is correct and try again.');
  }
};

export interface PlateletAnalysisResult {
  summary: {
    plateletCount: string;
    meanPlateletVolume: string;
    plateletDistributionWidth: string;
  };
  interpretation: string;
  recommendations: string[];
}

export const analyzePlateletFile = async (fileContent: string): Promise<PlateletAnalysisResult> => {
    if (!process.env.API_KEY) {
        console.error('API key not configured.');
        throw new Error('API key is not configured.');
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `You are a hematology lab expert analyzing a platelet concentrate report. The data is in CSV format. Extract key metrics like platelet count (PLT), mean platelet volume (MPV), and platelet distribution width (PDW). Provide a concise interpretation of the results and list 2-3 key recommendations or observations regarding its quality or suitability for transfusion.

Data:
---
${fileContent}
---

Return the analysis in JSON format.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        summary: {
                            type: Type.OBJECT,
                            properties: {
                                plateletCount: { type: Type.STRING, description: "Platelet count, e.g., '250 x 10^9/L'" },
                                meanPlateletVolume: { type: Type.STRING, description: "Mean Platelet Volume, e.g., '10.5 fL'" },
                                plateletDistributionWidth: { type: Type.STRING, description: "Platelet Distribution Width, e.g., '16%'" },
                            }
                        },
                        interpretation: {
                            type: Type.STRING,
                            description: "A brief interpretation of the results."
                        },
                        recommendations: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING },
                            description: "Actionable recommendations or observations."
                        }
                    }
                },
            },
        });

        const jsonString = response.text;
        if (!jsonString) {
            throw new Error('Received an empty response from the AI.');
        }
        return JSON.parse(jsonString) as PlateletAnalysisResult;

    } catch (error) {
        console.error('Error analyzing platelet file with Gemini:', error);
        throw new Error('The AI analysis failed. Please ensure the file format is correct and try again.');
    }
};

export interface WhiteCellAnalysisResult {
  summary: {
    totalWBC: string;
    dominantCellType: string;
  };
  breakdown: Array<{
    cellType: string;
    percentage: string;
    absoluteCount: string;
    normalRange: string;
  }>;
  interpretation: string;
  insights: string[];
}

export const analyzeWhiteCellFile = async (fileContent: string): Promise<WhiteCellAnalysisResult> => {
    if (!process.env.API_KEY) {
        console.error('API key not configured.');
        throw new Error('API key is not configured.');
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `You are a clinical hematologist analyzing a leukocyte differential report from a blood sample. The data is in CSV format. Calculate percentages and absolute counts for each white blood cell type (Neutrophils, Lymphocytes, Monocytes, Eosinophils, Basophils). Provide a professional interpretation and 2-3 key insights, such as noting any abnormalities like neutrophilia or lymphopenia.

Data:
---
${fileContent}
---

Return the analysis in JSON format.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        summary: {
                            type: Type.OBJECT,
                            properties: {
                                totalWBC: { type: Type.STRING, description: "Total White Blood Cell count, e.g., '7.5 x 10^9/L'" },
                                dominantCellType: { type: Type.STRING, description: "The most prevalent white cell type." },
                            }
                        },
                        breakdown: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    cellType: { type: Type.STRING },
                                    percentage: { type: Type.STRING },
                                    absoluteCount: { type: Type.STRING },
                                    normalRange: { type: Type.STRING, description: "e.g., '40-60%'" },
                                }
                            }
                        },
                        interpretation: {
                            type: Type.STRING,
                            description: "A professional interpretation of the differential count."
                        },
                        insights: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        }
                    }
                },
            },
        });

        const jsonString = response.text;
        if (!jsonString) {
            throw new Error('Received an empty response from the AI.');
        }
        return JSON.parse(jsonString) as WhiteCellAnalysisResult;

    } catch (error) {
        console.error('Error analyzing white cell file with Gemini:', error);
        throw new Error('The AI analysis failed. Please ensure the file format is correct and try again.');
    }
};
