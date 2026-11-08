import { useHello } from './hooks/useHello.ts'
import type { HelloState } from './hooks/useHello.ts'

type GreetingProps = {
  state: HelloState
  onRetry: () => void
}

function Greeting({ state, onRetry }: GreetingProps) {
  if (state.status === 'loading') {
    return <p className="muted">Loading…</p>
  }

  if (state.status === 'error') {
    return (
      <>
        <p className="error">Couldn't reach the server.</p>
        <button type="button" className="button" onClick={onRetry}>
          Retry
        </button>
      </>
    )
  }

  return <h1 className="greeting">{state.message}</h1>
}

export function App() {
  const { state, retry } = useHello()

  return (
    <>
      <header className="header">
        {/* The browser picks the file that matches the colour scheme; only one is downloaded. */}
        <picture>
          <source srcSet="/logo-dark.svg" media="(prefers-color-scheme: dark)" />
          <img src="/logo.svg" alt="LiveCodeBin" width="200" height="32" />
        </picture>
      </header>
      <main className="main">
        {/* Stays in the page while its content changes, so screen readers announce each new state. */}
        <div className="status" aria-live="polite">
          <Greeting state={state} onRetry={retry} />
        </div>
      </main>
    </>
  )
}
