# 💬 Chat con IA usando Next.js y LangGraph

> Un proyecto simple y educativo para aprender a crear interfaces de chat con LLMs usando streaming en tiempo real.

Este proyecto es perfecto para **aprender** cómo integrar modelos de lenguaje (como GPT de OpenAI) en una aplicación web moderna con **Next.js** y el ecosistema de **LangChain/LangGraph**.

## 🎯 ¿Qué aprenderás?

- ✅ Cómo crear una interfaz de chat con React
- ✅ Cómo implementar streaming en tiempo real (las respuestas aparecen palabra por palabra)
- ✅ Cómo usar LangGraph SDK para conectar fácilmente con agentes de IA
- ✅ Cómo crear una API en Next.js que maneja LLMs
- ✅ Cómo usar TypeScript en proyectos con IA

## 🛠️ Empezar es fácil

### Requisitos previos
- Node.js instalado (cree este proyecto con la versión v23.11.0)
- Una cuenta en OpenAI con una API key ([consíguela aquí](https://platform.openai.com/api-keys))

### Instalación

**1. Clona el repositorio:**
```bash
git clone <tu-repo-url>
cd nextjs-api
```

**2. Instala las dependencias:**
```bash
npm install
```

**3. Configura tu API key:**

Crea un archivo `.env.local` en la raíz del proyecto:
```env
OPENAI_API_KEY=sk-tu_api_key_aqui
```

⚠️ **Importante:** Nunca compartas tu API key. El archivo `.env` está en `.gitignore` para protegerla.

**4. Inicia el proyecto:**
```bash
npm run dev
```

**5. Abre tu navegador:**
Ve a [http://localhost:3000/chat](http://localhost:3000/chat) y empieza a chatear con la IA 🎉

## 📂 Estructura del Proyecto (simple)

```
nextjs-api/
├── app/
│   ├── api/llm/              # Backend: aquí vive el agente de IA
│   │   ├── agent.ts          # Configuración del agente LangGraph
│   │   └── route.ts          # API endpoint que recibe los mensajes
│   │
│   └── chat/                 # Frontend: la interfaz del chat
│       ├── _components/      # Componentes React del chat
│       │   ├── ChatArea.tsx      # Área donde aparecen los mensajes
│       │   ├── ChatInput.tsx     # Input para escribir mensajes
│       │   └── Message.tsx       # Componente de un mensaje individual
│       ├── page.tsx          # Página principal del chat
│       └── types.ts          # Tipos TypeScript
│
├── .env.example               # Tu API key (no se sube a GitHub)
└── package.json
```

## 🔍 ¿Cómo funciona? (explicación simple)

### El flujo completo:

```
Usuario escribe mensaje
    ↓
ChatInput captura el texto
    ↓
Se envía a /api/llm mediante POST
    ↓
El agente LangGraph procesa con OpenAI
    ↓
La respuesta se envía como "stream" (poco a poco)
    ↓
useStream del SDK actualiza la UI automáticamente
    ↓
El usuario ve la respuesta aparecer palabra por palabra ✨
```

### Las piezas clave del SDK de LangGraph

Este proyecto usa el **LangGraph SDK para React** que hace el trabajo pesado por ti. Aquí están las 2 piezas principales:

#### 1️⃣ `FetchStreamTransport` - Conecta con el servidor

```typescript
const transport = new FetchStreamTransport({
    apiUrl: "/api/llm",  // Tu API que maneja el chat
})
```

Esto configura la conexión entre tu React y el servidor. Maneja automáticamente:
- Las peticiones HTTP
- El streaming de datos
- Los errores y reconexiones

#### 2️⃣ `useStream` - El hook mágico de React

```typescript
const stream = useStream({ transport })
```

Este hook te da:
- **`stream.messages`**: Array con todos los mensajes (se actualiza solo cuando llegan nuevos)
- **`stream.submit()`**: Función para enviar un nuevo mensaje

**Ejemplo de uso real:**

```typescript
// Obtener los mensajes actuales
const messages = stream.messages; // [{content: "Hola", type: "human"}, ...]

// Enviar un nuevo mensaje
stream.submit({
    messages: [{ content: "¿Qué razas de perro son buenas para familias?", type: "human" }]
});
```

¡Eso es todo! No necesitas manejar fetch, EventSource, ni nada complicado. El SDK lo hace por ti.

## 🎨 Personaliza el agente

### Cambiar la personalidad del agente

Abre `app/api/llm/agent.ts` y modifica el `systemPrompt`:

```typescript
const agent = createAgent({
    model: model,
    checkpointer,
    systemPrompt: "¡Escribe aquí la personalidad que quieras! Por ejemplo: Eres un chef experto que ayuda con recetas",
})
```

### Cambiar el modelo de OpenAI

```typescript
const model = new ChatOpenAI({
    model: "gpt-4", // Opciones: "gpt-4", "gpt-3.5-turbo", etc.
});
```

## 🚀 Ideas para seguir aprendiendo

Una vez que entiendas cómo funciona, intenta agregar:

1. **Historial de conversaciones**: Guarda las conversaciones en una base de datos
2. **Diferentes agentes**: Crea múltiples agentes con diferentes personalidades
3. **Markdown**: Renderiza las respuestas con formato (negritas, listas, código)
4. **Modo oscuro**: Agrega un botón para cambiar el tema
5. **Streaming visual**: Muestra un indicador cuando la IA está "escribiendo"

## 📚 Recursos para aprender más

### Documentación oficial:
- [Next.js](https://nextjs.org/docs) - Framework web
- [LangChain JS](https://js.langchain.com/) - Framework para LLMs
- [LangGraph](https://langchain-ai.github.io/langgraph/) - Crear grafos de agentes complejos
- [LangGraph SDK](https://github.com/langchain-ai/langgraph-sdk) - Kit de herramientas para js/typescript
- [useStream Hook](https://docs.langchain.com/langsmith/use-stream-react) - Documentación del hook

### Tutoriales recomendados:
- [Tutorial de streaming con LangChain (video)](https://www.youtube.com/watch?v=piK5WTXAEAQ&t=284s)

## 💡 Tecnologías usadas

- **Next.js 16**
- **LangChain**
- **LangGraph**
- **LangGraph SDK**
- **OpenAI**
- **TypeScript**
- **Tailwind CSS**

## ⚠️ Notas importantes

- **API Key**: Nunca subas tu API key a GitHub ni la compartas públicamente.
- **Producción**: Este es un proyecto educativo. Para producción necesitarías agregar muchas mas cosas.


**¿Te sirvió el proyecto?** Dale una ⭐ para ayudar a otros a encontrarlo.
