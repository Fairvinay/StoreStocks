"use client";
import React from 'react'
import Link from "next/link";
import {useAppDispatch} from "@/providers/ReduxProvider";
import {saveSelectedCard} from "@/redux/slices/stockSlice";
import {useSelector} from "react-redux";
import {GlobalState} from "@/redux/store";
import { FYERSAPI } from '@/libs/client';
import { StorageUtils } from '@/libs/cache';
import { CommonConstants } from '@/utils/constants';
import { useRouter } from 'next/navigation';

const SearchCard = ({item}: { item: any }) => {
    const dispatch = useAppDispatch();
    const gainers = useSelector((state: GlobalState) => state.stock.gainers)
    const losers = useSelector((state: GlobalState) => state.stock.gainers)
      const router = useRouter();
      /*  <Link href={`/company/${ ticker}`} onClick={() => {
            dispatch(saveSelectedCard({...stock, ticker:ticker}))
        }}>
     */
    return (
        <Link href={{
            pathname: `/`
        }}
              onClick={() => {
                  let data;
                   ( async () => {
                    //{params: {function: 'TOP_GAINERS_LOSERS' , apikey:CommonConstants.apiKey}}
                     let tokenauth = StorageUtils._retrieve(CommonConstants.fyersToken);
                     let auth_code ='';
                    if (tokenauth.isValid && tokenauth.data !== null) {
                        console.log("User is Authorized ");
                          auth_code = tokenauth.data['auth_code'];
                    }
                  //let res =  await FYERSAPI.get('/fyerscallback' )
                  let sy = item['1. symbol'].substring(0, item['1. symbol'].indexOf(   "."));
                  console.log("symbol "+sy);
                   // '/fyersgetquote' 
                  let res =     await FYERSAPI.get('/fyersquicklogin', {params: {auth_code :auth_code , symbol:sy , apikey:CommonConstants.apiKey}})
                  //  popupCenter(FYERSAPILOGINURL, "Fyers Signin")

                  let data = await res .data; 
                  console.log("click data "+JSON.stringify(data))
                  if( data ===undefined){
                    data =  gainers[0]; // gainers.map((elem: any) => elem.ticker === "SBET")
                    if (!data.length) {
                        data = losers.map((elem: any) => elem.ticker === item['1. symbol'])
                    }
                    if (data.length == 1) {
                        console.log( "click data length ==1 : "+JSON.stringify(data))
                        dispatch(saveSelectedCard(data[0]))
                    }
                    console.log( "click data "+JSON.stringify(data))
                    console.log( "click item "+JSON.stringify(item))
                    if( item !==undefined){
                       if (!data.length) {
                          let stock =  data['2. symbol'];
                          let ticker = stock;
                           dispatch(saveSelectedCard({ ...stock, ticker:ticker }));
                             router.push(`/company/${ticker}`);
                         //  dispatch(saveSelectedCard(data))
                       }
                       else {  dispatch(saveSelectedCard(data[0]));
                       }
                    }
                  }
                  else {
                     console.log( "data not undefined "+JSON.stringify(data.length))
                      if (!data.length) {
                          let stock =    data["Meta Data"]["2. Symbol"]; //data['2. symbol'];
                          let ticker = stock;
                           console.log( "stock "+JSON.stringify(stock))
                           console.log( "ticker "+JSON.stringify(ticker))
                            console.log( "{ ...stock, ticker:ticker } "+JSON.stringify({ ...stock, ticker:ticker }))
                           dispatch(saveSelectedCard({ ...stock, ticker:ticker }));
                             router.push(`/company/${ticker}`);
                         //  dispatch(saveSelectedCard(data))
                       }
                  }
                  return res;
                }) ();
                //const result =  Promise.all([    fyerLoginProm()]);  
                //result.then((res) => {
                //    let data = res[0].data; 
                //    console.log("click data "+JSON.stringify(data))
               // });
                 // data = gainers.map((elem: any) => elem.ticker === item['1. symbol'])
                
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
