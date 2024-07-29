"use client";

import { useGlobalStore } from "@/providers/global-store.provider";
import { Button } from "@mui/material";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export const ToggleThemeButton: React.FC = () => {
  const globalStore = useGlobalStore((state) => ({
    currentTheme_AppManagement: state.currentTheme_AppManagement,
    setCurrentTheme_AppManagement: state.setCurrentTheme_AppManagement,
  }));

  return (
    <Button
      onClick={() =>
        globalStore.setCurrentTheme_AppManagement(
          globalStore.currentTheme_AppManagement === "light" ? "dark" : "light"
        )
      }
    >
      {globalStore.currentTheme_AppManagement === "light" ? (
        <div className="flex">
          <SunIcon className="relative top-[5px] mr-[8px]" />
          <span>Dark</span>
        </div>
      ) : (
        <div className="flex">
          <MoonIcon className="relative top-[5px] mr-[8px]" />
          <span>Dark</span>
        </div>
      )}
    </Button>
  );
};
