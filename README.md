# Wonder Bridge

[![[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/xiongyan/wonderbridge-a-playful-bridge-card-game)]](https://deploy.workers.cloudflare.com)

A production-ready full-stack web application template powered by Cloudflare Workers and Pages. Features a modern React frontend with TypeScript, Tailwind CSS, shadcn/ui components, and a Hono-based API backend. Includes sidebar layout, theming, error boundaries, TanStack Query, and more.

## ✨ Features

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui (New York style), Lucide icons, Sonner toasts, Framer Motion
- **Backend**: Cloudflare Workers with Hono routing, CORS, logging, health checks, client error reporting
- **State & Data**: TanStack Query, Zustand, React Hook Form, Zod validation
- **UI/UX**: Dark/light theme toggle, responsive sidebar, glassmorphism effects, animations, mobile support
- **Developer Experience**: Hot reload, type generation (`wrangler types`), Bun scripts, ESLint, Tailwind JIT
- **Deployment**: One-command deploy to Cloudflare Workers/Pages, SPA asset handling
- **Production Ready**: Error boundaries, loading states, SEO-friendly, accessible components

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Lucide React |
| **Backend** | Cloudflare Workers, Hono, Cloudflare KV/DO ready |
| **State** | TanStack Query, Zustand, Immer |
| **UI Utils** | class-variance-authority, clsx, tailwind-merge, Framer Motion |
| **Forms** | React Hook Form, Zod |
| **Other** | Recharts, Sonner, Vaul, React Router, Date-fns |

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) installed
- [Cloudflare Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (`bunx wrangler@latest login`)

### Installation

1. Clone the repo
2. Install dependencies:
   ```bash
   bun install
   ```
3. Generate Worker types (if deploying):
   ```bash
   bun run cf-typegen
   ```

### Development

Start the dev server (frontend + worker proxy):
```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) (or `PORT=3001 bun dev`).

- Edit `src/` for frontend
- Add API routes in `worker/userRoutes.ts` (auto-reloads)
- Test API: `curl http://localhost:3000/api/health` or `curl http://localhost:3000/api/test`

### Build for Production

```bash
bun run build
```

Outputs to `dist/` (frontend) and Worker bundle.

Preview production build:
```bash
bun run preview
```

### Linting

```bash
bun run lint
```

## ☁️ Deployment

Deploy to Cloudflare Workers/Pages with one command:

```bash
bun run deploy
```

This builds the app and deploys via Wrangler. Ensure `wrangler.jsonc` has your account ID (auto-detected after login).

**Quick Deploy Button:**
[![[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/xiongyan/wonderbridge-a-playful-bridge-card-game)]](https://deploy.workers.cloudflare.com)

**Manual Steps (Advanced):**

1. Configure `wrangler.toml` or `wrangler.jsonc` with your bindings/secrets
2. Bind custom domain: `wrangler deploy --name your-app`
3. Add KV/DO namespaces: `wrangler kv:namespace create "YOUR_KV"`
4. Update `wrangler.jsonc` and redeploy

Assets are served as SPA with Worker handling `/api/*` routes first.

## 📁 Project Structure

```
├── src/                 # React app (Vite)
│   ├── components/      # shadcn/ui + custom (sidebar, layout, etc.)
│   ├── hooks/           # Custom hooks (theme, mobile)
│   ├── lib/             # Utils, error reporting
│   ├── pages/           # React Router pages
│   └── main.tsx         # Entry point
├── worker/              # Cloudflare Worker
│   ├── index.ts         # Core (DO NOT EDIT)
│   ├── core-utils.ts    # Env types (DO NOT EDIT)
│   └── userRoutes.ts    # 👈 Add your API routes here
├── tailwind.config.js   # Custom theme (gradients, animations)
├── vite.config.ts       # Vite + Cloudflare plugin
└── wrangler.jsonc       # Worker config (DO NOT EDIT core)
```

## 🔧 Customization

- **Theme**: Edit `tailwind.config.js` and `src/index.css` (CSS vars)
- **Sidebar**: Customize `src/components/app-sidebar.tsx` or remove from layout
- **Homepage**: Replace `src/pages/HomePage.tsx`
- **API Routes**: Extend `worker/userRoutes.ts`:
  ```ts
  app.post('/api/users', async (c) => { /* ... */ });
  ```
- **New Pages**: Add to `src/main.tsx` router
- **Components**: Use shadcn CLI: `bunx shadcn@latest add table`

## 🤝 Contributing

1. Fork & clone
2. `bun install`
3. Create feature branch
4. `bun run lint`
5. Submit PR

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.