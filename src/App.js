import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import theme from './theme';
import { AppProvider } from './context/AppContext';
import MainLayout from './components/Layout/MainLayout';
import Pricing from './pages/Pricing';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Analytics from './pages/Analytics';
import Store from './pages/Store';
import Settings from './pages/Settings';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
  prepend: true, // This is important for RTL
});

function App() {
  return (
    <CacheProvider value={cacheRtl}>
      <AppProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <MainLayout>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/store" element={<Store />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </MainLayout>
          </BrowserRouter>
        </ThemeProvider>
      </AppProvider>
    </CacheProvider>
  );
}

export default App;
