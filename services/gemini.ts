
import { GoogleGenAI, Type } from "@google/genai";

// Safe API key retrieval
const getApiKey = () => {
  try {
    return (typeof process !== 'undefined' && process.env.API_KEY) || '';
  } catch (e) {
    return '';
  }
};

const apiKey = getApiKey();
// We only initialize the client if we have a key to avoid construction errors
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getMaintenanceAdvice = async (carModel: string, issue: string) => {
  if (!ai) return "AI Mechanic is currently offline. Please check your connection.";
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `I have a ${carModel}. Issue: ${issue}. Provide professional automotive advice for a Malaysian context, mentioning common parts needed and estimated costs in MYR.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to the garage right now. Please try again later.";
  }
};

export const getPartChecklist = async (carModel: string, mileage: number) => {
  if (!ai) return { items: [] };
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
                  action: { type: Type.STRING, description: "e.g., Replace, Inspect, Clean" },
                  urgency: { type: Type.STRING, description: "High, Medium, Low" }
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

export const getNewsSummary = async (newsTitles: string[]) => {
  if (!ai) return "Unable to generate summary at this time.";
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a Malaysian automotive expert. Summarize the following news headlines into a 4-bullet point trend report for today. Headlines: ${newsTitles.join(' | ')}. Keep it concise and professional.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Summary Error:", error);
    return "Failed to generate summary. Please try again.";
  }
};
