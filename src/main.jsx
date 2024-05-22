import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import{extendTheme} from '@chakra-ui/react' // import theme from ChakraUi
import {mode} from '@chakra-ui/theme-tools' // importing the mode of colors from chakara for our theme bg
import { BrowserRouter } from 'react-router-dom'

// This is the setting background color for our mode
const styles = {
  global: (props) =>({
    // First value is in light mode second is in dark mode
    body:{
      bg:mode('gray.100', '#000')(props), // This handles the bg color for the body.
      color:mode("gray.800", "whiteAlpha.900")(props) // This is the color of text in each mode.
    }
  })
}

// Add our color mode config
const config = {
  initialColorMode:'dark',
  useSystemColorMode: false,
}

// extend the theme
const theme = extendTheme({config, styles})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ChakraProvider theme={theme}>
    <App />
    </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
