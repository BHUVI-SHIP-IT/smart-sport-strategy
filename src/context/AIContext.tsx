
import React, { createContext, useContext, useState, useEffect } from 'react';
import { OpenRouterService, openRouterService } from '../services/openRouterService';

interface AIContextType {
  apiKey: string;
  isConfigured: boolean;
  setApiKey: (key: string) => void;
  model: string;
  setModel: (model: string) => void;
  temperature: number;
  setTemperature: (temp: number) => void;
  maxTokens: number;
  setMaxTokens: (tokens: number) => void;
  aiService: OpenRouterService;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export function useAI() {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
}

export function AIProvider({ children }: { children: React.ReactNode }) {
  const [apiKey, setApiKeyState] = useState<string>('');
  const [model, setModel] = useState<string>('anthropic/claude-3-haiku');
  const [temperature, setTemperature] = useState<number>(0.7);
  const [maxTokens, setMaxTokens] = useState<number>(500);
  const [isConfigured, setIsConfigured] = useState<boolean>(false);

  const setApiKey = (key: string) => {
    setApiKeyState(key);
    localStorage.setItem('openrouter_api_key', key);
    openRouterService.config = {
      ...openRouterService.config, 
      apiKey: key
    };
    setIsConfigured(!!key);
  };

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('openrouter_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  // Update OpenRouter service configuration when settings change
  useEffect(() => {
    openRouterService.config = {
      apiKey,
      model,
      temperature,
      maxTokens
    };
  }, [apiKey, model, temperature, maxTokens]);

  const value = {
    apiKey,
    isConfigured,
    setApiKey,
    model,
    setModel,
    temperature,
    setTemperature,
    maxTokens,
    setMaxTokens,
    aiService: openRouterService
  };

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
}
