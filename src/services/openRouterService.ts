
import { toast } from "@/components/ui/use-toast";

interface AnalyzePerformanceParams {
  athleteData: {
    name: string;
    sport: string;
    performanceStats: any;
    recentGames: any[];
  };
  analysisType: 'performance trends' | 'improvement areas' | 'detailed breakdown';
}

interface PerformanceInsights {
  analysis: string;
  recommendations: string[];
}

class OpenRouterService {
  config: {
    apiKey: string | null;
    baseUrl: string;
  };

  constructor() {
    this.config = {
      apiKey: localStorage.getItem('openrouter-api-key'),
      baseUrl: 'https://openrouter.ai/api/v1',
    };
  }

  isConfigured() {
    return !!this.config.apiKey;
  }

  getConfig() {
    return this.config;
  }

  setApiKey(apiKey: string) {
    this.config.apiKey = apiKey;
    localStorage.setItem('openrouter-api-key', apiKey);
  }

  clearApiKey() {
    this.config.apiKey = null;
    localStorage.removeItem('openrouter-api-key');
  }

  async analyzePerformance(params: AnalyzePerformanceParams): Promise<PerformanceInsights> {
    if (!this.config.apiKey) {
      throw new Error('API key not configured');
    }

    try {
      // In a real app, we'd make an API call to OpenRouter here
      // For this demo, we'll simulate a response
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // This is mock data, in a real app you'd get this from the API response
      return {
        analysis: `${params.athleteData.name}'s ${params.analysisType} analysis shows consistent improvement in key metrics over the past month. ${params.athleteData.sport}-specific skills have improved by approximately 12% based on performance data.`,
        recommendations: [
          'Increase focus on endurance training to improve late-game performance',
          'Consider implementing additional recovery protocols to reduce fatigue',
          'Work on technical skills in specific areas based on recent performance data'
        ]
      };
    } catch (error) {
      console.error('Error analyzing performance:', error);
      toast({
        title: 'Analysis Failed',
        description: 'Unable to generate AI insights. Please try again later.',
        variant: 'destructive',
      });
      throw error;
    }
  }
}

export const openRouterService = new OpenRouterService();
