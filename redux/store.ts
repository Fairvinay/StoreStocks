import { configureStore } from '@reduxjs/toolkit';
import stockSlice, { StockSliceProps } from './slices/stockSlice';
import miscSlice, {MiscSliceProps} from './slices/miscSlice';

export interface GlobalState {
    stock: StockSliceProps;
    misc: MiscSliceProps
}
export const store = configureStore({
	reducer: {
        stock: stockSlice,
        misc:miscSlice
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;