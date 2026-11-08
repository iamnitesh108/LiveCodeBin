import express from 'express'
import type { Express } from 'express'

// Builds the app without listening on a port, so tests can use it directly.
export function createApp(): Express {
  const app = express()

  app.get('/api/hello', (_req, res) => {
    res.json({ message: 'Hello from LiveCodeBin' })
  })

  return app
}
