import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette:{
      primary:{
          main:'#ffffff'
      },
      secondary:{
          main:'#000000'
      },
  }
})



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
     <App />
    </ThemeProvider>
  </React.StrictMode>,
)
