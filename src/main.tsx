import React, {useState} from 'react'
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

import {
  RecoilRoot,
  useRecoilValue,
} from 'recoil';
import { themeSelector } from "./atom.ts";
import { CookiesProvider } from 'react-cookie'

const Root = () => {
  // const [themeValue, setThemeValue] = useRecoilState(themeState);

  // const theme = themeValue === true ? lightTheme : darkTheme;

  const theme = useRecoilValue(themeSelector);

  // const theme = themeType === "lightTheme" ? lightTheme : darkTheme;
  
  return (
    <ThemeProvider theme={theme}>
      <CookiesProvider>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </CookiesProvider>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <RecoilRoot>
      <Root />
    </RecoilRoot>
  // </React.StrictMode>
)
