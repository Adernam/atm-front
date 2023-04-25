import React, { ReactNode } from 'react'

import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material'

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string
    }
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#202020',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#26a69a',
    },
  },
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}
