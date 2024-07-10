import { ThemeProvider, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import { appTheme } from "./themes/theme";
import { useAuthContext } from "./context/AuthContext";
import Login from "./pages/login";
import Layout from "./components/layout";
import WebFont from 'webfontloader';
import React, { useEffect } from 'react';

function App() {
  const { token } = useAuthContext();
  useEffect(() => {
    WebFont.load({
      google: {
        families: [
          'Roboto:400,700',
          'Open Sans:400,700',
          'Lato:400,700',
          'Montserrat:400,700',
          'Merriweather:400,700',
          'Playfair Display:400,700',
          'Poppins:400,700'
        ]
      }
    });
  }, []);
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      {token ? (
        <Layout>
          <Outlet />
        </Layout>
      ) : (
        <Login />
      )}
    </ThemeProvider>
  );
}

export default App;
