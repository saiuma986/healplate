import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    condition: { type: Type.STRING, description: "The name of the disease or condition analyzed." },
    recommendedFoods: { type: Type.ARRAY, description: "List of local, affordable, and seasonal foods that support recovery.", items: { type: Type.OBJECT, properties: { food: { type: Type.STRING }, nutrient: { type: Type.STRING }, reason: { type: Type.STRING } }, required: ["food", "nutrient", "reason"] } },
    mealIdeas: { type: Type.ARRAY, description: "1-2 simple meal ideas using local ingredients.", items: { type: Type.STRING } },
    foodsToAvoid: { type: Type.ARRAY, description: "List of foods to avoid with brief reasons.", items: { type: Type.OBJECT, properties: { food: { type: Type.STRING }, reason: { type: Type.STRING } }, required: ["food", "reason"] } },
    localTip: { type: Type.STRING, description: "A practical, affordable suggestion relevant to local (Indian) context." },
    imageAnalysis: { type: Type.OBJECT, nullable: true, description: "Analysis of the uploaded food image, if provided.", properties: { foodDetected: { type: Type.STRING }, suitability: { type: Type.STRING, enum: ["Good", "Moderate", "Bad"] }, reason: { type: Type.STRING }, compatibilityScore: { type: Type.STRING } } },
    extraAdvice: { type: Type.STRING, description: "A balanced, motivational closing line." }
  },
  required: ["condition", "recommendedFoods", "mealIdeas", "foodsToAvoid", "localTip", "extraAdvice"]
};

const languageMap: { [key: string]: string } = {
  en: 'English',
  te: 'Telugu',
  hi: 'Hindi',
  ta: 'Tamil',
  ml: 'Malayalam',
  ja: 'Japanese',
  ko: 'Korean',
};

export const getNutritionAdvice = async (condition: string, image?: { mimeType: string; data: string }, language: string = 'en'): Promise<AnalysisResult> => {
  const selectedLanguage = languageMap[language] || 'English';
  const systemInstruction = `You are an AI Nutrition and Health Advisor specializing in connecting diseases, local Indian foods, and sustainable nutrition.
  - Your entire response, including all food names, reasons, tips, and advice, must be strictly in the ${selectedLanguage} language.
  - Your goal is to provide practical, food-based advice.
  - Never recommend supplements or medicines.
  - Always use simple, encouraging language.
  - Prefer plant-based, low-cost, sustainable options.
  - Focus on foods commonly available in India, considering seasonality.
  - Adhere strictly to the provided JSON schema for your response.
  - If the user input is vague, ask for more details instead of making assumptions.
  - If an image is provided, your entire analysis must revolve around the compatibility of that food with the specified condition.`;
  
  const promptParts = [];
  
  if (image) {
    promptParts.push({ inlineData: { mimeType: image.mimeType, data: image.data } });
    promptParts.push({ text: `Analyze the food in this image for a person with this condition: "${condition}".` });
  } else {
    promptParts.push({ text: `Analyze this condition and provide food advice: "${condition}".` });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts: promptParts },
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema,
      },
    });
    
    const jsonText = response.text;
    if (!jsonText) {
        throw new Error("API returned an empty response.");
    }

    const sanitizedJsonText = jsonText.replace(/^```json\s*|```\s*$/g, '').trim();
    return JSON.parse(sanitizedJsonText) as AnalysisResult;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to get nutritional advice: ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching advice.");
  }
};
