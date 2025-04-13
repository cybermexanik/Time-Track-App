import ReactDOM from 'react-dom/client'
import App from './App.js';
import React from 'react';
import { SidebarProvider } from './context/sidebarContext.js';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <SidebarProvider>
    <App />
  </SidebarProvider>
)
