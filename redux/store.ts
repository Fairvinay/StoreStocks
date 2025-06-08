import { configureStore } from '@reduxjs/toolkit';
import stockSlice, { StockSliceProps } from './slices/stockSlice';
import miscSlice, {MiscSliceProps} from './slices/miscSlice';
import equitySlice, { EquitySliceProps } from './slices/equitySlice';

export interface GlobalState {
    stock: StockSliceProps;
    misc: MiscSliceProps;
    equity: EquitySliceProps
}
export const store = configureStore({
	reducer: {
        stock: stockSlice,
        misc:miscSlice,
        equity: equitySlice
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;