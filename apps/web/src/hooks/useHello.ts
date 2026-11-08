import { useEffect, useState } from 'react'
import { getHello } from '../api/hello.ts'

// One union type, so "a message and an error at the same time" can't be written.
export type HelloState =
  | { status: 'loading' }
  | { status: 'ready'; message: string }
  | { status: 'error' }

export function useHello(): { state: HelloState; retry: () => void } {
  const [state, setState] = useState<HelloState>({ status: 'loading' })
  // Each retry bumps this number, which runs the effect again.
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    // Aborted when the component unmounts or a new attempt starts, so an old
    // request can never overwrite newer state. StrictMode makes this happen
    // once on purpose in development.
    const controller = new AbortController()

    getHello(controller.signal).then(
      (hello) => {
        if (controller.signal.aborted) return
        setState({ status: 'ready', message: hello.message })
      },
      (error: unknown) => {
        if (controller.signal.aborted) return
        console.error('Could not load the greeting:', error)
        setState({ status: 'error' })
      },
    )

    return () => controller.abort()
  }, [attempt])

  function retry() {
    setState({ status: 'loading' })
    setAttempt((previous) => previous + 1)
  }

  return { state, retry }
}
