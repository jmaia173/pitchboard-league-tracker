import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { LeaguesProvider } from './contexts/LeaguesProvider.jsx';
import { FollowProvider } from './contexts/FollowProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LeaguesProvider>
        <FollowProvider>
          <App />
        </FollowProvider>
      </LeaguesProvider>
    </BrowserRouter>
  </StrictMode>
);
