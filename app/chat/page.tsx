'use client';

import { useMemo, useState } from 'react';
import ChatArea from './_components/ChatArea';
import ChatInput from './_components/ChatInput';
import ApiKeyInput from './_components/ApiKeyInput';
import { useStream, FetchStreamTransport } from "@langchain/langgraph-sdk/react";
import { Message } from '@/app/chat/types';

export default function Page() {
    const [apiKey, setApiKey] = useState<string>('');

    const transport = useMemo(() => {
        return new FetchStreamTransport({
            apiUrl: "/api/llm",
            onRequest: async (_url: string, init: RequestInit) => {
                if (init.body) {
                    const body = JSON.parse(init.body as string);
                    return {
                        ...init,
                        body: JSON.stringify({
                            ...body,
                            apiKey: apiKey,
                        }),
                    };
                }
                return init;
            }
        })
    }, [apiKey]);

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
        if (!apiKey) {
            alert('Please configure your OpenAI API Key first');
            return;
        }
        stream.submit({
            messages: [{ content: text, type: "human" }],
        });
    };

    const handleApiKeyChange = (key: string) => {
        setApiKey(key);
    };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto">
      <div className="bg-blue-500 text-white p-4">
        <h1 className="text-2xl font-bold">🐕 DoggyChat</h1>
      </div>
      <div className="p-4">
        <ApiKeyInput onApiKeyChange={handleApiKeyChange} />
      </div>
      <ChatArea messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}
