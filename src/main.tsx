import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { themeState } from "./atom.ts";

const Root = () => {
  const [themeValue, setThemeValue] = useRecoilState(themeState);

  const theme = themeValue === true ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <RecoilRoot>
      <Root />
    </RecoilRoot>
  // </React.StrictMode>,
)
