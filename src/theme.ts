import { DefaultTheme } from "styled-components";
import { createTheme } from "@mui/material/styles";


export type themeType = {
    theme: {
        bgColor1: string;
        bgColor2: string;
        textColor1: string;
        textColor2: string;
        textColor3: string;
        borderColor: string;
    }
}

// styled-components
export const lightTheme: DefaultTheme = {
    bgColor1: "#F8F9FA",
    bgColor2: "#FFFFFF",
    textColor1: "#212529",
    textColor2: "#495057",
    textColor3: "#868E96",
    borderColor: "#F1F3F5",
}

// styled-components
export const darkTheme: DefaultTheme = {
    bgColor1: "#121212",
    bgColor2: "#1E1E1E",
    textColor1: "#ECECEC",
    textColor2: "#D9D9D9",
    textColor3: "#ACACAC",
    borderColor: "#2A2A2A",
}