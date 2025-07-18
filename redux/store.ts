import { configureStore } from '@reduxjs/toolkit';
import stockSlice, { StockSliceProps } from './slices/stockSlice';
import miscSlice, {MiscSliceProps} from './slices/miscSlice';
import equitySlice, { EquitySliceProps } from './slices/equitySlice';
import tradeSlice, { TradeSliceProps } from './slices/tradeSlice';
import holdingSlice, { HoldingSliceProps } from './slices/holdingSlice';

export interface GlobalState {
    stock: StockSliceProps;
    misc: MiscSliceProps;
    equity: EquitySliceProps
    trade: TradeSliceProps,
     holding:HoldingSliceProps ,
}
export const store = configureStore({
	reducer: {
        stock: stockSlice,
        misc:miscSlice,
        equity: equitySlice,
        trade:tradeSlice,
        holding:holdingSlice
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
