
import { toast } from "sonner";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1";

export interface OpenRouterConfig {
  apiKey: string;
  temperature?: number;
  maxTokens?: number;
  model?: string;
}

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AnalysisRequest {
  athleteData: any;
  analysisType: string;
  prompt?: string;
}

export interface AnalysisResponse {
  analysis: string;
  recommendations: string[];
  visualizationData?: any;
}

export class OpenRouterService {
  private config: OpenRouterConfig;

  constructor(config: OpenRouterConfig) {
    this.config = {
      temperature: 0.7,
      maxTokens: 500,
      model: "anthropic/claude-3-haiku",
      ...config,
    };
  }

  async analyzePerformance({ athleteData, analysisType, prompt = "" }: AnalysisRequest): Promise<AnalysisResponse> {
    try {
      const systemPrompt = `You are an expert sports analyst and coach. Analyze the following athlete data for ${analysisType}. 
        Provide insightful analysis and actionable recommendations. Format your response as JSON with 'analysis' and 'recommendations' fields.`;
      
      const userPrompt = `${prompt}\nAthlete Data: ${JSON.stringify(athleteData)}`;
      
      const messages: ChatMessage[] = [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ];

      const response = await this.chat(messages);
      
      try {
        // Try to parse the response as JSON
        const jsonResponse = JSON.parse(response);
        return {
          analysis: jsonResponse.analysis || response,
          recommendations: jsonResponse.recommendations || [],
          visualizationData: jsonResponse.visualizationData
        };
      } catch (e) {
        // If parsing fails, return a formatted response
        return {
          analysis: response,
          recommendations: []
        };
      }
    } catch (error) {
      console.error("Error analyzing performance:", error);
      toast.error("Failed to analyze performance data");
      throw error;
    }
  }

  async generateTrainingPlan(athleteData: any, goals: string[]): Promise<string> {
    try {
      const systemPrompt = "You are an expert sports coach specializing in creating personalized training plans. Based on the athlete data and goals provided, create a detailed training plan.";
      
      const userPrompt = `Create a personalized training plan for an athlete with the following data: ${JSON.stringify(athleteData)}. 
        The athlete's goals are: ${goals.join(", ")}.`;
      
      const messages: ChatMessage[] = [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ];

      return await this.chat(messages);
    } catch (error) {
      console.error("Error generating training plan:", error);
      toast.error("Failed to generate training plan");
      throw error;
    }
  }

  async predictInjuryRisk(athleteData: any, recentActivity: any): Promise<{ riskLevel: string; factors: string[]; recommendations: string[] }> {
    try {
      const systemPrompt = "You are an AI specialized in sports medicine and injury prevention. Analyze the athlete data and recent activity to assess injury risk.";
      
      const userPrompt = `Assess injury risk for an athlete with the following data: ${JSON.stringify(athleteData)}. 
        The athlete's recent activity is: ${JSON.stringify(recentActivity)}. 
        Provide risk level (Low, Moderate, High), contributing factors, and preventative recommendations in JSON format.`;
      
      const messages: ChatMessage[] = [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ];

      const response = await this.chat(messages);
      
      try {
        return JSON.parse(response);
      } catch (e) {
        return {
          riskLevel: "Unknown",
          factors: ["Could not analyze data properly"],
          recommendations: ["Please consult with a sports medicine professional"]
        };
      }
    } catch (error) {
      console.error("Error predicting injury risk:", error);
      toast.error("Failed to predict injury risk");
      throw error;
    }
  }

  private async chat(messages: ChatMessage[]): Promise<string> {
    if (!this.config.apiKey) {
      throw new Error("OpenRouter API key is not configured");
    }

    try {
      const response = await fetch(`${OPENROUTER_API_URL}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.config.apiKey}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "Smart Sport Strategy"
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: messages,
          temperature: this.config.temperature,
          max_tokens: this.config.maxTokens
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenRouter API error (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error calling OpenRouter API:", error);
      toast.error("Failed to communicate with AI service");
      throw error;
    }
  }
}

// Create a singleton instance with default empty API key
// The actual API key will be set later from user input
export const openRouterService = new OpenRouterService({ apiKey: "" });
