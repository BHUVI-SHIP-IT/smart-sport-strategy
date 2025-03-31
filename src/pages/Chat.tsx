
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { ChatInterface } from '@/components/chat/ChatInterface';

const Chat = () => {
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">AI Chat</h1>
      </div>
      <ChatInterface />
    </Layout>
  );
};

export default Chat;
