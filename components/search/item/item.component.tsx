"use client";
import React from 'react'
import Link from "next/link";
import {useAppDispatch} from "@/providers/ReduxProvider";
import {saveSelectedCard} from "@/redux/slices/stockSlice";
import {useSelector} from "react-redux";
import {GlobalState} from "@/redux/store";

const SearchCard = ({item}: { item: any }) => {
    const dispatch = useAppDispatch();
    const gainers = useSelector((state: GlobalState) => state.stock.gainers)
    const losers = useSelector((state: GlobalState) => state.stock.gainers)

    return (
        <Link href={{
            pathname: `/`
        }}
              onClick={() => {
                  let data;

                  data = gainers.map((elem: any) => elem.ticker === item['1. symbol'])
                  if (!data.length) {
                      data = losers.map((elem: any) => elem.ticker === item['1. symbol'])
                  }
                  if (data.length == 1) {
                      dispatch(saveSelectedCard(data[0]))
                  }
              }}
              className='flex  flex-col md:flex-row hover:opacity-50 transition-all cursor-pointer items-center py-1 my-3 justify-between'>
            <div className='w-full md:w-auto'>
                <p className='text-sm text-black font-semibold dark:text-white'>{item['1. symbol']} ({item['8. currency']})</p>
                <p className='text-xs text-black dark:text-white'>{item['5. marketOpen']} - {item['6. marketClose']}</p>
            </div>
            <div className='text-left md:text-right w-full md:w-auto'>
                <p className='text-sm text-black dark:text-white'>{item['2. name']}</p>
                <p className='text-xs text-black dark:text-white'>{item['4. region']}</p>
            </div>
        </Link>
    )
}

export default SearchCard
