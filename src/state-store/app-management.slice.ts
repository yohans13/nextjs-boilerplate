import { GlobalStore } from '@/state-store/global-store';
import { PaletteMode } from '@mui/material';
import { StateCreator } from 'zustand';

/*=======================  
 data
=========================*/
// data type
export type AppManagementState = {
    currentTheme_AppManagement: PaletteMode;
    email_AppManagement: string;
};
// default data
export const defaultAppManagementState: AppManagementState = {
    currentTheme_AppManagement: "dark",
    email_AppManagement: ""
};

/*=======================  
 actions
=========================*/
// actions type
export type AppManagementActions = {
    setCurrentTheme_AppManagement(currentTheme_AppManagement: AppManagementState['currentTheme_AppManagement']): void;
    setEmail_AppManagement(email_AppManagement: AppManagementState['email_AppManagement']): void;
    resetAppManagementState(): void;
};

/*=======================  
 slice
=========================*/
// slice type (data type + actions type)
export type AppManagementSlice = AppManagementState & AppManagementActions;
// sclice
export const createAppManagementSlice: StateCreator<GlobalStore, [], [], AppManagementSlice> = set => ({
    ...defaultAppManagementState,
    setCurrentTheme_AppManagement: (currentTheme_AppManagement) => set({ currentTheme_AppManagement }),
    setEmail_AppManagement: (email_AppManagement) => set({ email_AppManagement }),
    resetAppManagementState: () => set(defaultAppManagementState),
});

