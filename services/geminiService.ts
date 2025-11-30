import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateWorkoutForDay = async (day: number): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Create a fun, short, and effective field hockey fitness drill or bodyweight exercise for Day ${day} of an Advent Calendar.
      Keep it under 30 words.
      Focus on agility, legs, or core.
      Make it fun or hockey themed.
      Return ONLY the activity text, no introductory phrases.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating workout:", error);
    return `50 Drag Flicks (Air) and 20 Burpees. Get low!`;
  }
};