
import React, { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAI } from '@/context/AIContext';
import { SendHorizontal, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const { isConfigured } = useAI();
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t p-4">
      <div className="flex flex-col space-y-4">
        {!isConfigured && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800">
            <p className="text-sm font-medium">API key is required. Configure it in Settings.</p>
          </div>
        )}
        <div className="relative">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={isConfigured ? "Type your message..." : "Configure API key in Settings to use chat"}
            className="pr-12 resize-none min-h-[80px]"
            disabled={!isConfigured || isLoading}
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={!message.trim() || !isConfigured || isLoading}
            className="absolute bottom-2 right-2"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <SendHorizontal className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </form>
  );
}
