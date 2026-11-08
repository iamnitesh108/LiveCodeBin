export type HelloResponse = { message: string }

function isHelloResponse(body: unknown): body is HelloResponse {
  return (
    typeof body === 'object' &&
    body !== null &&
    'message' in body &&
    typeof body.message === 'string'
  )
}

export async function getHello(signal?: AbortSignal): Promise<HelloResponse> {
  const response = await fetch('/api/hello', { signal })
  if (!response.ok) {
    throw new Error(`GET /api/hello failed with status ${response.status}`)
  }

  // The server is a separate program, so check the body instead of trusting it.
  const body: unknown = await response.json()
  if (!isHelloResponse(body)) {
    throw new Error('GET /api/hello returned an unexpected body')
  }
  return body
}
