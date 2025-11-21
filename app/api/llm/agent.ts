import { ChatOpenAI } from "@langchain/openai";
import { createAgent, type BaseMessage } from "langchain";
import {LangGraphRunnableConfig, MemorySaver} from "@langchain/langgraph"

const checkpointer = new MemorySaver();

export async function getAgent(options: { input: Record<string, unknown>; apiKey: string; config: LangGraphRunnableConfig }) {
    const model = new ChatOpenAI({model: "gpt-5.1-2025-11-13"});

    const agent = createAgent({
        model: model,
        checkpointer,
        systemPrompt: "Eres un vendedor de perros de raza, asesoras en base a la personalidad que se busca",
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