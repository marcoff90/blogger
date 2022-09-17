import {StrictMode} from 'react';
import * as ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './app/app';
import {theme} from "./app/styles/mui-theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import AuthProvider from "./app/auth/AuthProvider";
import {SnackbarProvider} from "notistack";
import {ReactQueryProvider} from "./app/wrappers/ReactQueryProvider";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            autoHideDuration={3000}
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            maxSnack={3}
          >
            <ReactQueryProvider>
              <CssBaseline/>
              <App/>
            </ReactQueryProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>

  </StrictMode>
);
