import React,{createContext, useState} from 'react'
import { ThemeProvider } from 'styled-components'
import { dark, light } from 'src/theme/theme'
import { GlobalStyle } from 'src/styles/globalStyle'

export const ThemeContext: React.Context<Object> = createContext<Object>({} as Object)

interface Props {
  children: React.ReactNode
}

const Theme: React.FC<Props> = ({children}) => {

  const [isDark, setDark] = useState<Boolean>(true)

  return (
    <ThemeContext.Provider value={{isDark, setDark}}>
      <ThemeProvider theme={isDark? dark : light }>
        <GlobalStyle/>
          {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default Theme