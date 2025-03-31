
import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/avatar';
import { User, Bot } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '@/services/openRouterService';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={cn(
      "flex w-full gap-3 p-4",
      isUser ? "bg-muted/50" : "bg-background"
    )}>
      <Avatar className={cn(
        "h-8 w-8 rounded-md",
        isUser ? "bg-primary" : "bg-blue-500"
      )}>
        <div className="flex h-full items-center justify-center text-white">
          {isUser ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
        </div>
      </Avatar>
      <div className="flex-1 space-y-2">
        <div className="text-sm font-medium">
          {isUser ? 'You' : 'AI Assistant'}
        </div>
        <div className="prose-sm prose-slate max-w-none">
          <p className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.content}
          </p>
        </div>
      </div>
    </div>
  );
}
