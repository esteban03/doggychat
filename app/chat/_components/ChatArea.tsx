'use client';

interface Message {
  id: number;
  text: string;
  timestamp: Date;
}

interface ChatAreaProps {
  messages: Message[];
}

export default function ChatArea({ messages }: ChatAreaProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          No hay mensajes. Envía uno para comenzar.
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className="bg-gray-100 rounded-lg p-3 max-w-2xl"
          >
            <p className="text-gray-800">{message.text}</p>
            <span className="text-xs text-gray-500">
              {message.timestamp.toLocaleTimeString()}
            </span>
          </div>
        ))
      )}
    </div>
  );
}
