import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import NiceModal from '@ebay/nice-modal-react';

import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <NiceModal.Provider>
        <App />
      </NiceModal.Provider>
    </AuthContextProvider>
  </React.StrictMode>
);