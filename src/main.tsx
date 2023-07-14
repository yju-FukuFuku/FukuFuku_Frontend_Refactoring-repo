import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import axios from 'axios';
import { Provider } from 'react-redux'
import { store } from './store'

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
)
