import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { ProfilePhotoProvider } from './context/ProfilePhotoContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ProfilePhotoProvider>
        <App />
      </ProfilePhotoProvider>
    </ThemeProvider>
  </StrictMode>,
);

