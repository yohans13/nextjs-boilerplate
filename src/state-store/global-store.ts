import { AppManagementSlice, AppManagementState, createAppManagementSlice, defaultAppManagementState } from '@/state-store/app-management.slice';
import { createQuotationManagementSlice, defaultQuotationManagementState, QuotationManagementSlice, QuotationManagementState } from '@/state-store/quotation-management.slice';
import { createStore } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type GlobalStoreState =
    // all data types
    AppManagementState &
    QuotationManagementState;

export type GlobalStore =
    // all slice types
    AppManagementSlice &
    QuotationManagementSlice;

// all default data types
export type DefaultGlobalStoreState =
    typeof defaultAppManagementState &
    typeof defaultQuotationManagementState;

export const initGlobalStore = (): DefaultGlobalStoreState => {
    // all default data
    return {
        ...defaultAppManagementState,
        ...defaultQuotationManagementState,
    };
};

// export const createGlobalStore = (initState: DefaultGlobalStoreState) => {
//     return createStore<GlobalStore>()(persist((set, get, store) => ({
//         ...initState,
//         // all slices
//         ...createAppManagementSlice(set, get, store),
//         ...createQuotationManagementSlice(set, get, store),
//     }), {
//         name: 'globalStore',
//         storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used - other option is "sessionStorage"
//         //skipHydration: true,
//     }));
// };


export const createGlobalStore = (initState: DefaultGlobalStoreState) => {
    return createStore<GlobalStore>()((set, get, store) => ({
        ...initState,
        // all slices
        ...createAppManagementSlice(set, get, store),
        ...createQuotationManagementSlice(set, get, store),
    }));
};