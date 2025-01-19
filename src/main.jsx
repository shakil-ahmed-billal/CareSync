import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import AuthProvider from './provider/AuthProvider'
import router from './router/router'


// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="dark:bg-dark1  bg-light2">
          <RouterProvider router={router} />
        </div>
        <Toaster position='top-right' reverseOrder={false} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
