import React from 'react';
import ReactDOM from "react-dom";
import './index.css';
import App from './App';

import { CssBaseline, ThemeProvider } from '@mui/material'
import { lightTheme } from './themes/light-theme';
import { SnackbarProvider } from 'notistack';
import { AuthProvider } from './context/auth';
import { OrderProvider } from './context/orders';


ReactDOM.render(  
  <AuthProvider>
    <SnackbarProvider maxSnack={3}>
      <OrderProvider>
        <ThemeProvider theme={ lightTheme }>
          <CssBaseline />
          <App /> 
        </ThemeProvider>
      </OrderProvider>
    </SnackbarProvider>
  </AuthProvider>
  ,
document.getElementById("root")
);

