import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { queryClient } from './queryClient.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@emotion/react'
import { PenaltyThingTheme } from './theme.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={PenaltyThingTheme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
