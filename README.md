# Cloudflare AI Chat

A production-ready, full-stack AI chat application built on Cloudflare Workers. Features stateful conversations powered by Cloudflare AI Gateway, Durable Objects for session persistence, streaming responses, tool calling, and a modern React UI.

[![Deploy to Cloudflare][![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/paulcx62/zero-trust-access-viewer)]

## ✨ Features

- **Stateful Chat Sessions**: Persistent conversations using Cloudflare Durable Objects and Agents SDK
- **AI Integration**: Supports Gemini models via Cloudflare AI Gateway with streaming and tool calling
- **Tool Calling**: Built-in tools for weather, web search (SerpAPI), and extensible MCP integration
- **Session Management**: Create, list, update, and delete chat sessions with activity tracking
- **Modern UI**: React 18 with shadcn/ui, Tailwind CSS, Tanstack Query, and dark mode support
- **Type-Safe**: Full TypeScript with Workers types and end-to-end type safety
- **Production-Ready**: CORS, logging, error handling, health checks, and client error reporting
- **Extensible**: Easy to add custom routes, tools, and AI extensions via `worker/userRoutes.ts`

## 🛠️ Tech Stack

- **Backend**: Cloudflare Workers, Hono, Durable Objects, Cloudflare Agents SDK
- **AI**: Cloudflare AI Gateway (OpenAI-compatible), Gemini 2.5 models
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui
- **State**: Tanstack Query, Zustand, Immer
- **UI Components**: Radix UI, Lucide React, Framer Motion
- **Tools**: SerpAPI (web search), MCP (Model Context Protocol)
- **Dev Tools**: Bun, Wrangler, ESLint, TypeScript 5

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) installed
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install/) installed
- Cloudflare account with AI Gateway configured

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Configure environment variables in `wrangler.jsonc`:
   ```json
   {
     "vars": {
       "CF_AI_BASE_URL": "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai",
       "CF_AI_API_KEY": "{your_ai_gateway_token}",
       "SERPAPI_KEY": "{your_serpapi_key}" // Optional for web search
     }
   }
   ```

### Local Development

```bash
bun dev
```

Opens at `http://localhost:3000` (or `PORT` env var). The worker runs on a separate port.

Generate Worker types:
```bash
bun run cf-typegen
```

## 📖 Usage

### Chat Interface

- **New Session**: Automatically creates a new chat session on first message
- **Switch Sessions**: Use sidebar to list and switch between sessions
- **Streaming**: Real-time responses with tool execution feedback
- **Model Selection**: Switch between Gemini models mid-conversation
- **Clear Chat**: Reset current session messages

### API Endpoints

All API routes under `/api/`:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/sessions` | GET | List all sessions |
| `/api/sessions` | POST | Create new session |
| `/api/sessions/:id` | DELETE | Delete session |
| `/api/sessions/:id/title` | PUT | Update session title |
| `/api/chat/:sessionId/chat` | POST | Send message (supports streaming) |
| `/api/chat/:sessionId/messages` | GET | Get session state |
| `/api/chat/:sessionId/clear` | DELETE | Clear messages |
| `/api/health` | GET | Health check |

## 🔧 Development

### Project Structure

```
├── src/              # React frontend
├── worker/           # Cloudflare Worker backend
├── tailwind.config.js # Tailwind + shadcn/ui config
└── wrangler.jsonc    # Worker deployment config
```

### Customization

1. **Add Routes**: Edit `worker/userRoutes.ts`
2. **Extend Tools**: Modify `worker/tools.ts` and `worker/chat.ts`
3. **UI Components**: Use shadcn/ui (`npx shadcn-ui@latest add <component>`)
4. **AI Models**: Update `src/lib/chat.ts` MODELS array
5. **Sessions**: Extend `worker/app-controller.ts`

### Scripts

```bash
bun lint      # Lint code
bun build     # Build for production
bun preview   # Preview production build
```

## ☁️ Deployment

Deploy to Cloudflare Workers with zero configuration:

```bash
bun run deploy
```

Or use the [Cloudflare Dashboard](https://dash.cloudflare.com).

[![Deploy to Cloudflare][![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/paulcx62/zero-trust-access-viewer)]

**Post-Deployment**:
1. Bind custom domain (optional)
2. Configure AI Gateway in Workers settings
3. Set environment variables via Wrangler or Dashboard

### Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `CF_AI_BASE_URL` | Yes | AI Gateway endpoint | `https://gateway.ai.cloudflare.com/v1/{account}/{gateway}/openai` |
| `CF_AI_API_KEY` | Yes | AI Gateway token | `your-gateway-token` |
| `SERPAPI_KEY` | No | SerpAPI key for web search | `your-serpapi-key` |

## 🤝 Contributing

1. Fork the repo
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`bun run lint && git commit -m 'Add some AmazingFeature'`)
4. Push and open PR

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙌 Support

Built with ❤️ for Cloudflare developers. Questions? [Cloudflare Workers Discord](https://discord.gg/cloudflaredev).