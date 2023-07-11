import { createGlobalStyle } from "styled-components";
import {Theme} from "src/theme/theme"

interface GlobalStyleProps {
    theme: Theme;
  }
  

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
    
    *{
        //border: 1px dashed red;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        color: ${props=> props.theme.color.font.primary};
        font-family: ${props=> props.theme.color.font.family};
        font-size: ${props=> props.theme.color.font.size.m};
    }
    a{
        text-decoration: none;
    }
    
    html{
        background-color: ${props=> props.theme.color.primary.main};
        width: 100vw;
        min-height: 100vh;
        height: fit-content;
    }

    body{
        width: 100%;
        height: 100%;
    }

    button{
        cursor: pointer;
    }
`