import classnames from "classnames";
import { Message as ChatMessage } from "@/app/chat/types";

export default function Message({ message }: { message: ChatMessage }) {
    return (
        <div
            key={message.id}
            className={classnames("rounded-lg p-3 max-w-2xl whitespace-pre-wrap", {"bg-gray-100": message.type === "human", "bg-blue-100": message.type === "ai"})}
        >
            <p className="text-gray-800">{message.text}</p>
            <span className="text-xs text-gray-500">
              {message.timestamp.toLocaleTimeString()}
            </span>
        </div>
    )
}