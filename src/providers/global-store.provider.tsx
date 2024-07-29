"use client";

import { createContext, type ReactNode, useContext, useRef } from "react";
import { type StoreApi, useStore as useZustandStore } from "zustand";

import {
  createGlobalStore,
  initGlobalStore,
  GlobalStore,
} from "@/state-store/global-store";

export const GlobalStoreContext = createContext<StoreApi<GlobalStore> | null>(
  null
);

export interface GlobalStoreProviderProps {
  children: ReactNode;
}

export const GlobalStoreProvider = ({ children }: GlobalStoreProviderProps) => {
  const storeRef = useRef<StoreApi<GlobalStore>>();
  if (!storeRef.current)
    storeRef.current = createGlobalStore(initGlobalStore());

  return (
    <GlobalStoreContext.Provider value={storeRef.current}>
      {children}
    </GlobalStoreContext.Provider>
  );
};

export const useGlobalStore = <T,>(
  selector: (globalStore: GlobalStore) => T
): T => {
  const stateStoreContext = useContext(GlobalStoreContext);

  if (!stateStoreContext) {
    throw new Error("useGlobalStore must be use within GlobalStoreProvider");
  }

  return useZustandStore(stateStoreContext, selector);
};
