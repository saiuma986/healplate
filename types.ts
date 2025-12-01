
export interface AnalysisResult {
  condition: string;
  recommendedFoods: {
    food: string;
    nutrient: string;
    reason: string;
  }[];
  mealIdeas: string[];
  foodsToAvoid: {
    food: string;
    reason: string;
  }[];
  localTip: string;
  imageAnalysis?: {
    foodDetected: string;
    suitability: 'Good' | 'Moderate' | 'Bad';
    reason: string;
    compatibilityScore: string;
  };
  extraAdvice: string;
}
