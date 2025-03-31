
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useAI } from '@/context/AIContext';
import { ChatMessage as ChatMessageType } from '@/services/openRouterService';
import { toast } from 'sonner';

export function ChatInterface() {
  const { aiService, isConfigured } = useAI();
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      role: 'assistant',
      content: 'Hi, I\'m your AI assistant. How can I help you with sports strategy and athlete performance today?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!isConfigured) {
      toast.error('Please configure your OpenRouter API key in Settings first');
      return;
    }
    
    const userMessage: ChatMessageType = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Create a copy of the messages including the system message
      const messagesToSend: ChatMessageType[] = [
        { 
          role: 'system', 
          content: 'You are a helpful AI assistant specializing in sports strategy and athlete performance analysis. Provide concise, accurate information to help coaches and athletes improve their performance.' 
        },
        ...messages.filter(m => m.role !== 'system'),
        userMessage
      ];
      
      const response = await aiService.sendChatMessage(messagesToSend);
      setMessages(prev => [...prev, response.message]);
    } catch (error) {
      console.error('Error in chat:', error);
      toast.error('Failed to get response');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-[calc(100vh-12rem)]">
      <CardContent className="p-0 flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
}
