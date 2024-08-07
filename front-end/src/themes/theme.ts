import { createTheme } from "@mui/material/styles";
import WebFont from 'webfontloader';
import React, { useEffect } from 'react';


export const appTheme = createTheme({
  typography: {
    fontFamily: 'Poppins',
  },
  palette: {
    primary: {
      main: "#BB892D",
      contrastText: "#ffffff",
    },
  },
});
