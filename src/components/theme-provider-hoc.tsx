"use client";

import { ToggleThemeButton } from "@/components/toggle-theme-button";
import { useGlobalStore } from "@/providers/global-store.provider";

import {
  Button,
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from "@mui/material";
import Link from "next/link";

const primaryDark = "#ddd";
const primaryLight = "#000";

export const ThemeProviderHOC = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const globalStore = useGlobalStore((state) => ({
    currentTheme_AppManagement: state.currentTheme_AppManagement,
    setCurrentTheme_AppManagement: state.setCurrentTheme_AppManagement,
  }));

  const getTheme = (mode: PaletteMode) => {
    return createTheme({
      palette: {
        mode,
        ...(mode === "light"
          ? {
              primary: {
                main: primaryLight,
              },
            }
          : {
              primary: {
                main: primaryDark,
              },
            }),
      },
      typography: {
        fontSize: 14,
      },
    });
  };

  return (
    <ThemeProvider theme={getTheme(globalStore.currentTheme_AppManagement)}>
      <CssBaseline />
      <div className="flex w-full justify-end p-[8px] ">
        <ToggleThemeButton />
      </div>
      <div className="flex w-full justify-between p-[32px] pt-[8px]">
        <div>
          <Link href="/">
            <div className="">Logo</div>
          </Link>
        </div>
        <div className="">
          <Button>
            <Link href="/auth/sign-in">Sign In</Link>
          </Button>
          <Button>
            <Link href="/auth/sign-up">Sign Up</Link>
          </Button>
        </div>
      </div>
      <div className="flex justify-center mt-[16px]">{children}</div>
    </ThemeProvider>
  );
};
