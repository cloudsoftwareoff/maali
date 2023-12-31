import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './user';
import { AdminProvider } from './admin/AdminProvider';
import i18n from './locales/i18n';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
 <UserProvider>
  <AdminProvider>
  <I18nextProvider i18n={i18n}>
      <App />
      </I18nextProvider>
  </AdminProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
