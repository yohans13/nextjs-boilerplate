import { GlobalStore } from '@/state-store/global-store';
import { StateCreator } from 'zustand';

/*=======================  
 data
=========================*/
// data type
export type QuotationManagementState = {
    quotationType_QuotationManagement: boolean;
};
// default data
export const defaultQuotationManagementState: QuotationManagementState = {
    quotationType_QuotationManagement: false,
};

/*=======================  
 actions
=========================*/
// actions type
export type QuotationManagementActions = {
    setQuotationType_QuotationManagement(quotationType_QuotationManagement: QuotationManagementState['quotationType_QuotationManagement']): void;
    resetQuotationManagementState(): void;
};

/*=======================  
 slice
=========================*/
// slice type (data type + actions type)
export type QuotationManagementSlice = QuotationManagementState & QuotationManagementActions;
// slice
export const createQuotationManagementSlice: StateCreator<GlobalStore, [], [], QuotationManagementSlice> = set => ({
    ...defaultQuotationManagementState,
    setQuotationType_QuotationManagement: quotationType_QuotationManagement => set({ quotationType_QuotationManagement }),
    resetQuotationManagementState: () => set(defaultQuotationManagementState),
});

