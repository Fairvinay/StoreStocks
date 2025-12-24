"use client";
import React, {useEffect} from 'react'
import StockCard from '../stockCard/card.component'
import {useSelector} from 'react-redux';
import {GlobalState} from '@/redux/store';
import {ArrowDown2} from 'iconsax-react';
import {ScreenLoader} from '../../loader/screenLoader/loader.component';
import {fetchMoreStocks, fetchStockList} from './grid.actions';
import {useAppDispatch} from '@/providers/ReduxProvider';
import TradeTable from '@/components/company/trade/TradeTable';
import TradeGrid from '../tradeGrid/TradeGrid';
import TradeGridPlotterPDFCSV from '../tradeGrid/TradeGridPlotterPDFCSVbckp';
const StockGrid = () => {
    const gainers = useSelector((state: GlobalState) => state.stock.gainers)
    const losers = useSelector((state: GlobalState) => state.stock.losers)
    const activelyTraded = useSelector((state: GlobalState) => state.stock.activelyTraded)
    const tradeData = useSelector((state: GlobalState) => state.trade.tradeBook)
    const holdings = useSelector((state: GlobalState) => state.holding.holdingBook)
    const tab = useSelector((state: GlobalState) => state.misc.tab)
    const dispatch = useAppDispatch()
    const loader = useSelector((state: GlobalState) => state.misc.loader)


    const fetchMoreData = async () => {
        dispatch(fetchMoreStocks(gainers, losers, activelyTraded))
    }

    useEffect(() => {
        dispatch(fetchStockList())
    }, [dispatch])

     useEffect(() => {
         handleCustomGridCols(tab)
    }, [tab])
    const handleCustomGridCols = (seletab:any) => { 
        let cls= `grid w-11/12 gap-4 mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-5 justify-between`;
        let  trdCls = `grid w-11/12 gap-4 mx-auto grid-cols-1 justify-between`;
        let clsUse = cls;
         if((seletab === "Top Gainers") || (seletab === "Top Losers") )
         {  clsUse = cls;

         } else {   
            clsUse = trdCls;
         }
        return clsUse
    }

    if (!gainers || !losers) {
        return null;
    }
    return (
        <div> {/* sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-5  */}
            {/*<StockCard key={item.symbol} stock={item}/>*/}
            <div
                className={handleCustomGridCols(tab)}>
                {
                    tab === "Top Gainers" ? gainers.map((item: any) => {
                        return <StockCard key={item.symbol} stock={item}/>
                    }) : tab === "Top Losers" ? losers.map((item: any) => {
                        return <StockCard key={item.symbol} stock={item}/>  
                    }) :  tab === "Top Trades" ?   (  
                           <TradeGridPlotterPDFCSV tradeDataB={tradeData} />
                       
                     ):    <>  <TradeGrid tradeDataB={tradeData} /> </> 
                }

            </div>
            {
                loader ? <ScreenLoader/> : <h1 onClick={() => fetchMoreData()}
                                               className=' text-black font-regular text-xl transition-all py-10 cursor-pointer p-2  dark:text-white flex items-center justify-center hover:mt-2'>Load
                    more <ArrowDown2 className='ml-2'/></h1>
            }

        </div>
    )
}

export default StockGrid
