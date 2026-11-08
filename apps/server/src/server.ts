import { createServer } from 'node:http'
import { createApp } from './app.ts'

const DEFAULT_PORT = 3000
const MAX_PORT = 65535

function exitWithError(message: string): never {
  console.error(message)
  process.exit(1)
}

function readPort(): number {
  const value = process.env.PORT
  if (value === undefined || value === '') {
    return DEFAULT_PORT
  }

  // Digits only, so values like "3e3" or "0x10" are rejected instead of quietly converted.
  const port = Number(value)
  if (!/^\d+$/.test(value) || port < 1 || port > MAX_PORT) {
    exitWithError(`PORT must be an integer between 1 and ${MAX_PORT}`)
  }
  return port
}

function isAddressInUse(error: Error): boolean {
  return 'code' in error && error.code === 'EADDRINUSE'
}

const port = readPort()
const server = createServer(createApp())

server.on('error', (error) => {
  if (isAddressInUse(error)) {
    exitWithError(`Port ${port} is already in use`)
  }
  throw error
})

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
