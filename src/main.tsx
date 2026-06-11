import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import './index.css'
const App = React.lazy(() => import('./App'))
import { Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Suppress specific React Router future-flag warnings in development console
if (import.meta.env.DEV) {
  const _warn = console.warn.bind(console)
  console.warn = (...args: any[]) => {
    try {
      const msg = String(args[0] ?? '')
      if (
        msg.includes('React Router Future Flag Warning') ||
        msg.includes('v7_startTransition') ||
        msg.includes('v7_relativeSplatPath')
      ) {
        return
      }
    } catch (e) {
      // ignore
    }
    _warn(...args)
  }
}

const router = createBrowserRouter(
  [
    {
      path: '/*',
      element: (
        <Suspense>
          <App />
        </Suspense>
      ),
    },
  ],
  // `future` options opt-in to upcoming v7 behaviors. cast to `any` to avoid typing issues.
  ({ future: { v7_startTransition: true, v7_relativeSplatPath: true } } as any),
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
