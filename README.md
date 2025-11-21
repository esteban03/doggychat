# Chat Interface con Next.js y LangGraph

Un ejemplo completo de cómo crear una interfaz de chat para LLMs o agentes utilizando **Next.js**, **LangChain**, **LangGraph** y **LangGraph SDK**, aprovechando las herramientas de streaming del SDK para implementar respuestas en tiempo real.

## 🚀 Características

- ✅ Interfaz de chat moderna y responsiva con React y Tailwind CSS
- ✅ Streaming en tiempo real usando LangGraph SDK
- ✅ Integración con OpenAI GPT mediante LangChain
- ✅ Agente conversacional con memoria persistente (MemorySaver)
- ✅ API Route de Next.js para manejar las peticiones
- ✅ TypeScript para type safety
- ✅ Componentes React reutilizables y modulares

## 📋 Tecnologías Utilizadas

- **[Next.js 16](https://nextjs.org/)** - Framework React con App Router
- **[LangChain](https://js.langchain.com/)** - Framework para construir aplicaciones con LLMs
- **[LangGraph](https://langchain-ai.github.io/langgraph/)** - Librería para crear agentes con estado y memoria
- **[LangGraph SDK](https://github.com/langchain-ai/langgraph-sdk)** - SDK para integrar agentes LangGraph con streaming
- **[OpenAI](https://openai.com/)** - Modelo de lenguaje GPT
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone <tu-repo-url>
cd nextjs-api
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. Crea un archivo `.env.local` en la raíz del proyecto:
```env
OPENAI_API_KEY=tu_api_key_de_openai_aqui
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador y navega a `/chat` para ver la interfaz de chat.

## 📁 Estructura del Proyecto

```
nextjs-api/
├── app/
│   ├── api/
│   │   └── llm/
│   │       ├── agent.ts          # Configuración del agente LangGraph
│   │       └── route.ts          # API Route de Next.js
│   ├── chat/
│   │   ├── _components/
│   │   │   ├── ChatArea.tsx      # Componente principal del área de chat
│   │   │   ├── ChatInput.tsx     # Componente de input para mensajes
│   │   │   └── Message.tsx       # Componente para renderizar mensajes
│   │   ├── page.tsx              # Página principal del chat
│   │   └── types.ts              # Tipos TypeScript para mensajes
│   ├── layout.tsx
│   └── page.tsx
├── .env.local                     # Variables de entorno (no incluido en el repo)
├── package.json
└── README.md
```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
OPENAI_API_KEY=sk-...
```

**Nota:** El archivo `.env.local` está en `.gitignore` y no se subirá al repositorio. Nunca compartas tu API key públicamente.

### Personalizar el Agente

Puedes modificar el comportamiento del agente editando `app/api/llm/agent.ts`:

```typescript
const agent = createAgent({
    model: model,
    checkpointer,
    systemPrompt: "Tu prompt personalizado aquí",
})
```

También puedes cambiar el modelo de OpenAI:

```typescript
const model = new ChatOpenAI({
    model: "gpt-4", // o cualquier otro modelo disponible
});
```

## 🎯 Cómo Funciona

### Flujo de Streaming

1. **Cliente (Frontend)**: El usuario escribe un mensaje en `ChatInput`
2. **API Route**: El mensaje se envía a `/api/llm` mediante `POST`
3. **Agente LangGraph**: El agente procesa el mensaje usando el modelo de OpenAI
4. **Streaming**: La respuesta se envía como un stream de eventos (`text/event-stream`)
5. **LangGraph SDK**: El SDK maneja el stream y actualiza el estado en tiempo real
6. **UI React**: Los mensajes se renderizan automáticamente conforme llegan

### LangGraph SDK - Componentes Clave

Este proyecto utiliza el **LangGraph SDK para React** (`@langchain/langgraph-sdk/react`) que proporciona hooks y utilidades para integrar agentes LangGraph con interfaces React de manera sencilla.

#### `FetchStreamTransport`

El `FetchStreamTransport` es la clase que configura la conexión de streaming entre el cliente React y el servidor. Maneja automáticamente las peticiones HTTP y el parsing del stream de eventos:

```typescript
const transport = useMemo(() => {
    return new FetchStreamTransport({
        apiUrl: "/api/llm",  // URL del endpoint que maneja el streaming
        onRequest: async (_url: string, init: RequestInit) => init  // Hook para modificar requests
    })
}, []);
```

**Características:**
- Maneja automáticamente las peticiones POST al endpoint especificado
- Parsea el stream `text/event-stream` recibido del servidor
- Gestiona la reconexión y el manejo de errores
- Permite personalizar las peticiones mediante `onRequest`

#### `useStream` Hook

El hook `useStream` es el corazón de la integración React. Proporciona un estado reactivo que se actualiza automáticamente cuando llegan nuevos mensajes del stream:

```typescript
const stream = useStream({ transport })
```

**Propiedades del objeto `stream`:**

- **`stream.messages`**: Array reactivo de mensajes que se actualiza automáticamente conforme llegan del servidor. Cada mensaje tiene:
  - `content`: El contenido del mensaje (string o objeto)
  - `type`: Tipo del mensaje (`"human"` o `"ai"`)
  - `id`: Identificador único del mensaje

- **`stream.submit()`**: Método para enviar nuevos mensajes al agente:
  ```typescript
  stream.submit({
      messages: [{ content: "Hola", type: "human" }]
  })
  ```

- **`stream.status`**: Estado actual del stream (`"idle"`, `"streaming"`, `"error"`, etc.)

- **`stream.error`**: Objeto de error si algo falla durante el streaming

**Ventajas del hook:**
- ✅ Estado reactivo que se actualiza automáticamente
- ✅ No necesitas manejar manualmente el EventSource o fetch
- ✅ Integración perfecta con React (re-renderiza cuando cambia el estado)
- ✅ Manejo automático de la deserialización de mensajes

#### Integración en el Componente

En el código, el hook se usa así:

```typescript
const stream = useStream({ transport })

// Los mensajes se transforman para el formato de la UI
const messages = useMemo((): Message[] => {
    if (!stream.messages) return [];
    
    return stream.messages.map((m, index) => ({
        id: index,
        text: typeof m.content === 'string' ? m.content : JSON.stringify(m.content),
        timestamp: new Date(),
        type: m.type,
    }));
}, [stream.messages]);  // Se recalcula cuando stream.messages cambia

// Enviar un nuevo mensaje
const handleSendMessage = (text: string) => {
    stream.submit({
        messages: [{ content: text, type: "human" }],
    });
};
```

#### `agent.stream()` (Backend)

En el servidor, el agente LangGraph expone el método `stream()` que genera el stream de eventos:

```typescript
const stream = await agent.stream(
    options.input as { messages: BaseMessage[] },
    {
        encoding: "text/event-stream",  // Formato del stream
        streamMode: ["values", "updates", "messages"],  // Qué eventos enviar
        configurable: options.config.configurable,  // Configuración del checkpointer
        recursionLimit: 10  // Límite de recursión del agente
    }
);

return new Response(
    stream,
    { headers: { "Content-Type": "text/event-stream" } }
);
```

**Configuración del stream:**
- `encoding: "text/event-stream"`: Formato Server-Sent Events (SSE)
- `streamMode`: Controla qué eventos se envían:
  - `"messages"`: Envía los mensajes del agente
  - `"updates"`: Envía actualizaciones del estado del grafo
  - `"values"`: Envía los valores finales de cada nodo

## 🎨 Personalización

### Cambiar el Estilo

Los componentes usan Tailwind CSS. Puedes modificar los estilos en:
- `app/chat/_components/Message.tsx` - Estilos de los mensajes
- `app/chat/_components/ChatInput.tsx` - Estilos del input
- `app/chat/page.tsx` - Estilos del contenedor principal

### Recomendaciónes para Agregar Funcionalidades y aprender

- **Historial de conversaciones**: Implementa persistencia usando el `checkpointer` de LangGraph
- **Múltiples agentes**: Crea diferentes agentes con diferentes prompts
- **Markdown rendering**: Renderiza respuestas con formato Markdown

## 📚 Recursos

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de LangChain](https://js.langchain.com/)
- [Documentación de LangGraph](https://langchain-ai.github.io/langgraph/)
- [LangGraph SDK en GitHub](https://github.com/langchain-ai/langgraph-sdk)
- [LangGraph SDK - useStream para React](https://docs.langchain.com/langsmith/use-stream-react) - Documentación oficial del hook `useStream`
- [Great Langchain youtube tutorial to use streaming](https://www.youtube.com/watch?v=piK5WTXAEAQ&t=284s)


