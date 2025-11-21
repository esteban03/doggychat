import { ChatOpenAI } from "@langchain/openai";
import { createAgent, type BaseMessage } from "langchain";
import {LangGraphRunnableConfig, MemorySaver} from "@langchain/langgraph"

const checkpointer = new MemorySaver();

export async function getAgent(options: { input: Record<string, unknown>; apiKey: string; config: LangGraphRunnableConfig }) {
    const model = new ChatOpenAI({
        model: "gpt-5.1-2025-11-13",
        apiKey: options.apiKey,
    });

    const agent = createAgent({
        model: model,
        checkpointer,
        systemPrompt: "You are an expert assistant in dog breeds. You help users choose the best breed according to their personality and lifestyle. Be concise in both your answers and your questions, keeping everything easy to understand.",
    })

    const stream = await agent.stream(
        options.input as { messages: BaseMessage[] },
        {
            encoding: "text/event-stream",
            streamMode: ["values", "updates", "messages"],
            configurable: options.config.configurable,
            recursionLimit: 10
        }
    );

    return new Response(
        stream,
        {headers: { "Content-Type": "text/event-stream" }}
    )
}