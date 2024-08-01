import React from 'react'
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    typography: {
      fontFamily: ["Noto Sans Lao", "sans-serif"].join(","),
      fontWeight: 700,
      fontSize: 20,
    },
  });
