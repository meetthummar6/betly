import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import './index.css'
import { routeTree } from './routeTree.gen'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './auth/AuthContext'

const queryClient= new QueryClient();
const router=createRouter({routeTree})

declare module '@tanstack/react-router' {
  interface RegisterRouter {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    removeDelay: 1000,
    style: {
      background: '#363636',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      iconTheme: {
        primary: 'green',
        secondary: 'black',
      },
      style: {
        background: '#0f0f0f',
        color:'#ccffcc',
        border:'1px solid #00ff99',
        boxShadow: '0 0 8px #00ff99, 0 0 14px #00ff99',
      }
    },
    error: {
      duration: 5000,
      iconTheme: {
        primary: 'red',
        secondary: 'black',
      },
      style: {
        background: '#0f0f0f',
        color:'#ffd6d6',
        border:'1px solid #ff4d4d',
        boxShadow: '0 0 8px #ff4d4d, 0 0 14px #ff4d4d',
      }
    },
  }}
/>
          <RouterProvider router={router} />
          </AuthProvider>
      </QueryClientProvider>
    </StrictMode>,
  )
}
