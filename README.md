# LiveCodeBin

Share code through a link: write or paste a snippet, get a link, send it, and edit it together.

Early development: right now the web app shows a greeting fetched from the API server.

## Requirements

- Node.js 26 (see `.nvmrc`; with nvm: `nvm use`)
- pnpm 12 (the exact version is pinned in `package.json`, and pnpm switches to it by itself)

## Getting started

```sh
pnpm install
cp apps/server/.env.example apps/server/.env   # optional: change the port
```

Run the API server and the web app in two terminals:

```sh
pnpm dev:server   # http://localhost:3000, restarts when a file changes
pnpm dev:web      # http://localhost:5173
```

Open http://localhost:5173. In development the web app forwards `/api` requests to the server, so both run on one origin.

## Project layout

| Path | What |
|---|---|
| `apps/server` | Express API, TypeScript run directly by Node (no build step) |
| `apps/web` | React app built with Vite |

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev:server` | Start the API server in watch mode |
| `pnpm dev:web` | Start the Vite dev server |
| `pnpm typecheck` | Type-check every app |
| `pnpm build` | Build the web app into `apps/web/dist` |

## Configuration

| Variable | Where | Default | Purpose |
|---|---|---|---|
| `PORT` | `apps/server/.env` | `3000` | Port the API server listens on |
| `API_PROXY_TARGET` | environment of `pnpm dev:web` | `http://localhost:3000` | Where the dev server forwards `/api` requests |
