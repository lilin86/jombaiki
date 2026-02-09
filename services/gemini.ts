import { GoogleGenAI, Type } from "@google/genai";

// Initialize GoogleGenAI strictly using process.env.API_KEY as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMaintenanceAdvice = async (carModel: string, issue: string) => {
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
    // response.text is a property; ensure we handle potential undefined values
    return JSON.parse(response.text || '{"items": []}');
  } catch (error) {
    console.error("Checklist Error:", error);
    return { items: [] };
  }
};