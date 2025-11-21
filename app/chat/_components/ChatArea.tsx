'use client';

import { Message } from "@/app/chat/types";
import MessageComponent from "@/app/chat/_components/Message";

export default function ChatArea({ messages }: { messages: Message[]}) {
    return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          No messages yet. Send one to start the conversation.
        </div>
      ) : (
        messages.map(message => <MessageComponent key={message.id} message={message} />)
      )}
    </div>
    );
}
