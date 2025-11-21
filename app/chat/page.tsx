'use client';

import { useMemo } from 'react';
import ChatArea from './_components/ChatArea';
import ChatInput from './_components/ChatInput';
import { useStream, FetchStreamTransport } from "@langchain/langgraph-sdk/react";
import { Message } from '@/app/chat/types';

export default function Page() {
    const transport = useMemo(() => {
        return new FetchStreamTransport({
            apiUrl: "/api/llm",
            onRequest: async (_url: string, init: RequestInit) => init
        })
    }, []);

    const stream = useStream({transport})

    const messages = useMemo((): Message[] => {
        if (!stream.messages) return [];

        return stream.messages.map((m, index) => ({
            id: index,
            text: typeof m.content === 'string' ? m.content : JSON.stringify(m.content),
            timestamp: new Date(),
            type: m.type,
        }));
    }, [stream.messages]);

    const handleSendMessage = (text: string) => {
        stream.submit({
            messages: [{ content: text, type: "human" }],
        });
    };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto">
      <div className="bg-blue-500 text-white p-4">
        <h1 className="text-2xl font-bold">🐕 DoggyChat</h1>
      </div>
      <ChatArea messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}
