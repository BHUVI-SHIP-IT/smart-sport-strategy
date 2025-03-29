
import React, { useState } from 'react';
import { useAI } from '@/context/AIContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Slider } from '@/components/ui/slider';

export function APIKeySetup() {
  const { apiKey, setApiKey, isConfigured, model, setModel, temperature, setTemperature, maxTokens, setMaxTokens } = useAI();
  const [inputKey, setInputKey] = useState(apiKey);

  const handleSaveKey = () => {
    if (!inputKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }

    setApiKey(inputKey.trim());
    toast.success("API key saved successfully!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>OpenRouter API Configuration</CardTitle>
        <CardDescription>
          Enter your OpenRouter API key to enable AI-powered features.
          {!isConfigured && (
            <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800">
              <p className="text-sm font-medium">API key is required for AI analysis features.</p>
              <p className="text-xs mt-1">You can get an API key from <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" className="underline">OpenRouter.ai</a></p>
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="api-key">
            API Key
          </label>
          <Input
            id="api-key"
            type="password"
            placeholder="Enter your OpenRouter API key"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Model
          </label>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger>
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="anthropic/claude-3-haiku">Claude 3 Haiku</SelectItem>
              <SelectItem value="anthropic/claude-3-sonnet">Claude 3 Sonnet</SelectItem>
              <SelectItem value="anthropic/claude-3-opus">Claude 3 Opus</SelectItem>
              <SelectItem value="openai/gpt-4o">GPT-4o</SelectItem>
              <SelectItem value="mistralai/mistral-large">Mistral Large</SelectItem>
              <SelectItem value="meta-llama/llama-3-8b-instruct">Llama 3 8B</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Temperature: {temperature.toFixed(1)}</label>
          </div>
          <Slider
            min={0}
            max={1}
            step={0.1}
            value={[temperature]}
            onValueChange={(value) => setTemperature(value[0])}
          />
          <p className="text-xs text-muted-foreground">
            Lower values produce more focused outputs, higher values more creative ones.
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Max Tokens: {maxTokens}</label>
          </div>
          <Slider
            min={100}
            max={2000}
            step={100}
            value={[maxTokens]}
            onValueChange={(value) => setMaxTokens(value[0])}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveKey}>Save API Key</Button>
      </CardFooter>
    </Card>
  );
}
