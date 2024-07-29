"use client";

import { createTheme, PaletteMode } from "@mui/material";
const primaryDark = '#6a1b9a';
const primaryLight = '#4a148c';

export const getTheme = (mode: PaletteMode) => {
  return createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
          primary: {
            main: primaryLight,
          },
        }
        : {
          // palette values for dark mode
          primary: {
            main: primaryDark,
          },
        })
    },
    typography: {
      // In Chinese and Japanese the characters are usually larger,
      // so a smaller fontsize may be appropriate.
      fontSize: 11,
    },
  });
};
