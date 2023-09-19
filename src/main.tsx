import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import axios from 'axios';
import { Provider } from 'react-redux'
import { persistor, store } from './store'

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true

import { CookiesProvider } from 'react-cookie'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CookiesProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </CookiesProvider>
  </React.StrictMode>
)
