# 🐕 DoggyChat - AI Chat using Next.js and LangGraph

> A simple educational project to learn how to create chat interfaces with LLMs using real-time streaming.

**DoggyChat** is an AI-powered chat that works as an expert advisor on dog breeds, helping you choose the perfect puppy based on your personality and lifestyle.

This project is perfect for **learning** how to integrate language models (like OpenAI's GPT) into a modern web application with **Next.js** and the **LangChain/LangGraph** ecosystem.


https://github.com/user-attachments/assets/4df56c24-0ad0-4e10-8ffd-3e7f08f3bfd6


## 🎯 What will you learn?

- ✅ How to create a chat interface with React
- ✅ How to implement real-time streaming (responses appear word by word)
- ✅ How to use LangGraph SDK to easily connect with AI agents
- ✅ How to create an API in Next.js that handles LLMs
- ✅ How to use TypeScript in AI projects

## 🛠️ Getting Started is Easy

### Prerequisites
- Node.js installed (I used node v23.11.0).
- An OpenAI account with an API key.

### Installation

**1. Clone the repository:**
```bash
git clone <your-repo-url>
cd doggychat
```

**2. Install dependencies:**
```bash
npm install
```

**3. Configure your API key:**

Create a `.env` file in the project root:
```env
OPENAI_API_KEY=sk-your_api_key_here
```

⚠️ **Important:** Never share your API key. The `.env.local` file is in `.gitignore` to protect it.

**4. Start the project:**
```bash
npm run dev
```

**5. Open your browser:**
Go to [http://localhost:3000/chat](http://localhost:3000/chat) and start chatting with the dog advisor 🐕🎉

Try questions like:
- "What dog breed is good for a small apartment?"
- "I'm looking for an active dog for exercising"
- "What's the best breed for families with children?"

## 📂 Project Structure (simple)

```
doggychat/
├── app/
│   ├── api/llm/              # Backend: the AI agent lives here
│   │   ├── agent.ts          # LangGraph agent configuration
│   │   └── route.ts          # API endpoint that receives messages
│   │
│   └── chat/                 # Frontend: the chat interface
│       ├── _components/      # React chat components
│       │   ├── ChatArea.tsx      # Area where messages appear
│       │   ├── ChatInput.tsx     # Input to write messages
│       │   └── Message.tsx       # Individual message component
│       ├── page.tsx          # Main chat page
│       └── types.ts          # TypeScript types
│
├── .env               # Your API key (not uploaded to GitHub)
└── package.json
```

## 🔍 How does it work? (simple explanation)

### The complete flow:

```
User writes message
    ↓
ChatInput captures the text
    ↓
Sent to /api/llm via POST
    ↓
LangGraph agent processes with OpenAI
    ↓
Response is sent as a "stream" (little by little)
    ↓
SDK's useStream updates the UI automatically
    ↓
User sees the response appear word by word ✨
```

### Key pieces of the LangGraph SDK

This project uses the **LangGraph SDK for React** which does the heavy lifting for you. Here are the 2 main pieces:

#### 1️⃣ `FetchStreamTransport` - Connects to the server

```typescript
const transport = new FetchStreamTransport({
    apiUrl: "/api/llm",  // Your API that handles the chat
})
```

This configures the connection between your React app and the server. It automatically handles:
- HTTP requests
- Data streaming
- Errors and reconnections

#### 2️⃣ `useStream` - The magical React hook

```typescript
const stream = useStream({ transport })
```

This hook gives you:
- **`stream.messages`**: Array with all messages (updates automatically when new ones arrive)
- **`stream.submit()`**: Function to send a new message

**Real usage example:**

```typescript
// Get current messages
const messages = stream.messages; // [{content: "Hello", type: "human"}, ...]

// Send a new message
stream.submit({
    messages: [{ content: "What dog breeds are good for families?", type: "human" }]
});
```

That's it! You don't need to handle fetch, EventSource, or anything complicated. The SDK does it for you.

## 🎨 Customize the agent

### Change the chat topic

By default, the agent is a **dog breed advisor**. You can change it to any topic you want.

Open `app/api/llm/agent.ts` and modify the `systemPrompt`:

```typescript
const agent = createAgent({
    model: model,
    checkpointer,
    systemPrompt: "You are an expert assistant on dog breeds...", // 👈 Change this
})
```

**Examples of other topics:**
- Expert chef: `"You are a professional chef who helps with recipes and cooking techniques"`
- Programming tutor: `"You are a patient tutor who teaches programming to beginners"`
- Travel advisor: `"You are a travel expert who recommends personalized destinations"`

### Change the OpenAI model

```typescript
const model = new ChatOpenAI({
    model: "gpt-5.1-2025-11-13", // Options: "gpt-4", "gpt-3.5-turbo", etc.
});
```

## 🚀 Ideas to keep learning

Once you understand how it works, try adding:

1. **Conversation history**: Save conversations in a database
2. **Different agents**: Create multiple agents with different personalities
3. **Markdown**: Render responses with formatting (bold, lists, code)
4. **Dark mode**: Add a button to switch themes
5. **Visual streaming**: Show an indicator when the AI is "typing"

## 📚 Resources to learn more

### Official documentation:
- [Next.js](https://nextjs.org/docs) - Web framework
- [LangChain JS](https://js.langchain.com/) - Framework for LLMs
- [LangGraph](https://langchain-ai.github.io/langgraph/) - Create agents with memory
- [LangGraph SDK](https://github.com/langchain-ai/langgraph-sdk) - React integration
- [useStream Hook](https://docs.langchain.com/langsmith/use-stream-react) - Hook documentation

### Recommended tutorials:
- [Streaming tutorial with LangChain (video)](https://www.youtube.com/watch?v=piK5WTXAEAQ&t=284s)

## 💡 Technologies used

- **Next.js 16**
- **LangChain** 
- **LangGraph** 
- **LangGraph SDK** 
- **OpenAI** 
- **TypeScript** 
- **Tailwind CSS** 

## ⚠️ Important notes

- **Costs**: Using the OpenAI API has costs. Check pricing on their official page.
- **API Key**: Never upload your API key to GitHub or share it publicly.
- **Production**: This is an educational project. For production you would need to add authentication, usage limits, etc.

## 🤝 Contributions

If you find ways to improve this educational project, pull requests are welcome!

---

**Questions?** Open an issue in the repository.

**Did this project help you?** Give it a ⭐ to help others find it.
