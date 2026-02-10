

import { GoogleGenAI, Type } from "@google/genai";

// Standard initialization as per @google/genai guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Provides maintenance advice based on car model and issue.
 */
export const getMaintenanceAdvice = async (carModel: string, issue: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `I have a ${carModel}. Issue: ${issue}. Provide professional automotive advice for a Malaysian context, mentioning common parts needed and estimated costs in MYR.`,
      config: { thinkingConfig: { thinkingBudget: 0 } }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to the garage right now.";
  }
};

/**
 * Fetches live automotive news using Google Search grounding.
 * Extracts URLs from groundingChunks as required by guidelines.
 */
export const fetchLiveAutoNews = async () => {
  try {
    // Step 1: Search for news
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Find the 4 most recent and important automotive news stories in Malaysia from the last 7 days. Focus on Perodua, Proton, JPJ regulations, or fuel prices.",
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    
    // Step 2: Extract grounding chunks for compliance
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sourceUrls = groundingChunks.map((chunk: any) => chunk.web?.uri).filter(Boolean);
    
    // Step 3: Format the response into structured JSON
    const summaryResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Transform this search result into a JSON array of 4 objects with keys: title, category, excerpt, date, hot (boolean), and url. Use the most relevant URL from the available source URLs for each item. 
      Raw search info: ${response.text}
      Available source URLs: ${sourceUrls.join(', ')}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              category: { type: Type.STRING },
              excerpt: { type: Type.STRING },
              date: { type: Type.STRING },
              hot: { type: Type.BOOLEAN },
              url: { type: Type.STRING }
            },
            required: ["title", "category", "excerpt", "date", "hot", "url"]
          }
        }
      }
    });
    
    return JSON.parse(summaryResponse.text || '[]');
  } catch (error) {
    console.error("Live News Error:", error);
    return [];
  }
};

/**
 * Generates a maintenance checklist for a specific mileage.
 */
export const getPartChecklist = async (carModel: string, mileage: number) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `List necessary maintenance parts and service items for a ${carModel} at ${mileage}km mileage. Output in a clear structured format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  partName: { type: Type.STRING },
                  action: { type: Type.STRING },
                  urgency: { type: Type.STRING }
                },
                required: ["partName", "action", "urgency"]
              }
            }
          }
        }
      }
    });
    return JSON.parse(response.text || '{"items": []}');
  } catch (error) {
    console.error("Checklist Error:", error);
    return { items: [] };
  }
};

/**
 * Summarizes news titles into concise bullet points.
 */
export const getNewsSummary = async (newsTitles: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize these Malaysian auto headlines: ${newsTitles.join(' | ')}. Concise bullet points.`,
      config: { thinkingConfig: { thinkingBudget: 0 } }
    });
    return response.text;
  } catch (error) {
    console.error("Summary Error:", error);
    return "Failed to generate summary.";
  }
};