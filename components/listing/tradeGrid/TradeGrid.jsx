 
import React, {Suspense, useEffect , useState,useMemo} from "react";
import { CommonConstants } from "@/utils/constants";
import { StorageUtils } from "@/libs/cache";
import {disableLoader, enableLoader} from "@/redux/slices/miscSlice"
//import React, {useEffect, useState} from 'react'
import tradeBook from './tradesample.json';
import './tradestyles.css'; // ✅ No 'tradestyles.'
import {useDispatch, useSelector} from 'react-redux';
import { getTradeData } from "./tradeGridBook.actions";
import {API, FYERSAPI, FYERSAPILOGINURL} from "@/libs/client"


const TradeGrid = ({ tradeDataB   }) => {
  StorageUtils._save(CommonConstants.tradeDataCacheKey,CommonConstants.sampleTradeDataVersion1);
   const currentPlatform = useSelector((state ) => state.misc.platformType)
   const [parsedData, setParsedData] = useState(() => JSON.parse(StorageUtils._retrieve(CommonConstants.tradeDataCacheKey).data));
   // useState(() => []);//StorageUtils._retrieve(CommonConstants.tradeDataCacheKey).data
     const [platformType, setPlatformType] = useState('1')
   const [data, setData] = useState(tradeDataB);
       const tradeData = useSelector((state ) => state.trade.tradeBook)
   const [trades ,setTrades ] =  useState ([]);
     const [sortColumn, setSortColumn] = useState(null); // e.g., "symbol"
  const [sortDirection, setSortDirection] = useState("asc"); // "asc" or "desc"
    let globalUserCheck  = undefined;
    let globalUserTrades  = undefined;
   const [userLogged , setUserLogged ] = useState(false);
  function parseDate(str) {
    // e.g., "14-Jul-2025 09:48:22"
    const [datePart, timePart] = str.split(" ");
    const [day, mon, year] = datePart.split("-");
    const monthMap = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };
    const [hour, min, sec] = timePart.split(":").map(Number);
    return new Date(year, monthMap[mon], day, hour, min, sec);
  }
 const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };
 const sortedData = useMemo(() => {
  if (!userLogged) return parsedData;
  if (!sortColumn) return parsedData;

  const dataToSort = [...parsedData];

  if (sortColumn === 'orderDateTime') {
    return dataToSort.sort((a, b) => {
      const timeA = parseDate(a[sortColumn]).getTime();
      const timeB = parseDate(b[sortColumn]).getTime();

      return sortDirection === "asc"
        ? timeA - timeB
        : timeB - timeA;
    });
  }

  return dataToSort.sort((a, b) => {
    const valA = a[sortColumn];
    const valB = b[sortColumn];

    const isNumeric = !isNaN(parseFloat(valA)) && !isNaN(parseFloat(valB));

    if (isNumeric) {
      return sortDirection === "asc"
        ? parseFloat(valA) - parseFloat(valB)
        : parseFloat(valB) - parseFloat(valA);
    }

    return sortDirection === "asc"
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });
}, [parsedData, sortColumn, sortDirection]);

const getSortIndicator = (column) =>
    sortColumn === column ? (sortDirection === "asc" ? " ▲" : " ▼") : "";


     useEffect(() => {
           console.log("TradeTable:   " )
         
           // FETH The recentTRades from storage if above call succeeded data will be there
           let redentTradeData =  StorageUtils._retrieve(CommonConstants.recentTradesKey)
            const dataFromCache = StorageUtils._retrieve(CommonConstants.tradeDataCacheKey)
            let trades = undefined;
            if( redentTradeData['data'] !== ''  && redentTradeData['data'] !== null && redentTradeData['data'] !==undefined){
                     console.log(" recentTrades  trade data empty "+JSON.stringify(redentTradeData))
                     let tr = JSON.parse((JSON.stringify(redentTradeData)));
                     if(tr !==null && tr !== undefined ){
                         if(tr['data'] !==null && tr['data']!== undefined ){
                           trades =tr['data'];
                            console.log(" trades SET to  tr['data'] ")

                         }
                     }
                     
            }else {
               console.log("trade data fro cahce "+JSON.stringify(dataFromCache))
               trades = JSON.parse(dataFromCache.data) ;
            }
           let dataLocal   =   (tradeDataB !== undefined && tradeDataB.length !=0 ) ? tradeDataB : trades;
            console.log("trade data  "+JSON.stringify(dataLocal))
            console.log("trade data length  "+ dataLocal.length )
            try { 
            let parsed = dataLocal /// JSON.parse(data);
             setParsedData(parsed);
             setData(dataLocal)
              console.log("trade data typeof  "+ (typeof dataLocal ) )
               console.log("trade data parsedData  "+ (typeof parsed ) )
            console.log("trade data parsedData length  "+ (  parsed.length ) )
            /* parsed.map( rw => { 
                  console.log("   "+ JSON.stringify(rw) )  
                  console.log("  rw[0]  "+  rw[0] )  
                   console.log("symbol    "+  rw["symbol"] )  
             }   )*/
             }
             catch(er) {
                // show sample trades from json 
                  dataLocal  =   tradeBook.value;
                   let parsed = tradeBook.value;
                 setParsedData(parsed);
                  setData(dataLocal)
                console.log("sample  trade data typeof  "+ (typeof dataLocal ) )
               console.log("sample trade data parsedData  "+ (typeof parsed ) )
              console.log("sample trade data parsedData length  "+ (  parsed.length ) )
             /*  parsed.map( rw => { 
                  console.log("   "+ JSON.stringify(rw) )  
                  console.log("sample  trade  "+  rw[0] )  
                   console.log("sample symbol    "+  rw["symbol"] )  
             }   )*/

             }

       }, [tradeDataB]);
   /*{
    Instrument: tradeDataB[0] || "SAMPLE",
    Quantity: tradeDataB[1] || "102",
    Price: tradeDataB[2] || "1202",
    "Trade Value": tradeDataB[3] || "14203",
    "Product Type": tradeDataB[4] || "F&O",
  };*/

    const logByPlatform = () => {
        // check platform type is alpha-vantage or fyers
        // currentPlatform
        if (currentPlatform !==  "fyers") {
            const apiKey = StorageUtils._retrieve(CommonConstants.platFormKey)
            if (apiKey.isValid && apiKey.data !== null) {
                
            }
            else {
                console.log("Fyers not logged in ");    
                try {
                    dispatch(enableLoader());

                   let fyerLoginProm =  ( async () => {
                        //{params: {function: 'TOP_GAINERS_LOSERS' , apikey:CommonConstants.apiKey}}

                      //let res =  await FYERSAPI.get('/fyerscallback' )
                      let res =   popupCenter(FYERSAPILOGINURL, "Fyers Signin")
                        return res;
                    }) ;
                    const result = Promise.all([    fyerLoginProm()]);
                     // run a interval to check the fyersToken 
                    globalUserCheck  =  setInterval( async() => {
                        let result =   await FYERSAPI.get('/fyersgloballogin' )
                        console.log("fyers login called ");
                        let data =    result.data.value;
                        StorageUtils._save(CommonConstants.fyersToken,data)
                        const res = StorageUtils._retrieve(CommonConstants.fyersToken);
                        if (res.isValid && res.data !== null) {
                           
                            let auth_code = res.data['auth_code'];
                            if (auth_code&& auth_code !== null && auth_code !== undefined) {
                                console.log("User is Authorized ");
                                setUserLogged (true);
                               clearInterval(globalUserCheck);
                            }
                            else{
                                console.log("User is awaiting authorization ");
                            }
                        }
                     },5000);

                   // const res = StorageUtils._retrieve(CommonConstants.fyersToken );
                    
                } catch (error) {
                    // @ts-ignore
                    const {message} = error
                    //toast.error(message ? message : "Something went wrong!")
                    console.log(error)
                    return error
                } finally {
                    dispatch(disableLoader())
                }

                //dispatch(loginFyers([]));
               
            }
           // const sortedData = [...gainers].sort((a: any, b: any) => {
           //     return parseFloat(b.change_amount) - parseFloat(a.change_amount)
           // })
           // dispatch(saveGainers(sortedData))
        } 

    }
      const dispatch = useDispatch();
    
        const popupCenter = (url , title ) => {
            const dualScreenLeft = window.screenLeft ?? window.screenX;
            const dualScreenTop = window.screenTop ?? window.screenY;
        
            const width =
              window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;
        
            const height =
              window.innerHeight ??
              document.documentElement.clientHeight ??
              screen.height;
        
            const systemZoom = width / window.screen.availWidth;
        
            const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
            const top = (height - 550) / 2 / systemZoom + dualScreenTop;
        
            const newWindow = window.open(
              url,
              title,
              `width=${500 / systemZoom},height=${550 / systemZoom
              },top=${top},left=${left}`
            );
            newWindow?.window.addEventListener('load', () => {
                newWindow?.window.addEventListener('unload', () => {
                    console.log("unload the popup ")
                   // ftech the globallogin boject 
                   let globaProm =    ( async () => { 
                     let login = await FYERSAPI.get('/fyersgloballogin'); 
                     console.log("fyers login called ");
                     return login;
                    }) 
                    const res = Promise.all([ globaProm()]);
                    res.then((values) => {
                        StorageUtils._save(CommonConstants.fyersToken,values)
                         console.log("fyers login token saved ")
                     //DON'T call immediately as Fyers Login make take time 
                     // so Using setTimeout or setInterval 
                       globalUserTrades  =  setInterval( async () => { 

                         //TRIIGER the trade Book Fetch again 
                         dispatch(getTradeData('adfg'));
                        let redentTradeData =  StorageUtils._retrieve(CommonConstants.recentTradesKey)
                                const dataFromCache = StorageUtils._retrieve(CommonConstants.tradeDataCacheKey)
                                if( redentTradeData !== null && redentTradeData !==undefined){
                    
                                }else {
                                console.log("trade data fro cahce ")
                                redentTradeData = dataFromCache;
                                }
                                console.log(" TradeGrid after login state.trade.tradeBook "+JSON.stringify(tradeData))
                            let tradeLocal  =   tradeData !== undefined? tradeData : redentTradeData;
                            if(tradeData !==undefined &&  Array.isArray(tradeData ) ){
                                setTrades( tradeData );
                                  setParsedData(tradeData);
                            }
                            else if(redentTradeData.data !==undefined &&  Array.isArray(redentTradeData.data )) {
                            console.log("TradeGrid after login recenTrades  "+JSON.stringify(redentTradeData.data))
                                setTrades( redentTradeData.data );
                                   setParsedData(redentTradeData.data );
                            }
                            clearInterval(globalUserTrades);
                         }   ,5000);

                    })
                   
                    // window.location.reload();
                });
            });
            
            newWindow?.focus();
          };
  return (
    <div className="overflow-x-auto w-full bg-zinc-100">
        <br/>
        <br/>
      <h1 className='text-black font-semibold mb-2 dark:text-white text-lg'>Trade Book</h1>
       <div className="hidden md:flex relative items-center">
                 {/* 
                  <select className="p-2 rounded-lg bg-greylight dark:bg-greydark text-gretdark dark:text-white focus-visible:outline-none">
                  md:hidden
                 Alpha-Advantange or Fyers selection */}
                <select value={platformType} onChange={(e) => {
                                    if (e.target.value == '1') {
                                        console.log(" selected " + e.target.value)
                                    } else {
                                        logByPlatform()
                                        console.log(" selected " + e.target.value)
                                    }
                                    setPlatformType(e.target.value)
                  }}  
                    className='p-2 focus-visible:outline-none block  rounded-lg bg-greylight dark:bg-greydark text-gretdark  dark:active:text-green-700  '> {/* dark:text-white */}
                <option value={1}>Alph-Vantage</option>
                <option value={2}>Fyers</option>
               </select>
             </div>

      <table className="min-w-full text-sm text-left border border-gray-200 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700 font-semibold">
          <tr>
            <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort("symbol")}>Instrument{getSortIndicator("symbol")}</th>
            <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort("productType")}>Product Type{getSortIndicator("productType")}</th>
            <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort("tradedQty")}>Quantity{getSortIndicator("tradedQty")}</th>
            <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort("tradePrice")}>Price{getSortIndicator("tradePrice")}</th>
            <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort("orderDateTime")}>Time{getSortIndicator("orderDateTime")}</th>
            <th className="py-2 px-4 border-b cursor-pointer" onClick={() => handleSort("tradeValue")}>Trade Value{getSortIndicator("tradeValue")}</th>
            <th className="py-2 px-4 border-b">Buy/Sell</th>
          </tr>
        </thead>

        <tbody>
          { (Array.isArray(sortedData) &&  sortedData.length > 0 && userLogged  ) ? sortedData?.map((row, index) => (
            <tr key={index} className={`hover:bg-gray-50 transition ${row['side'] === '-1' ? 'trade-row-sell' : 'trade-row-buy'}`}>
              <td className="py-2 px-4 border-b">{row["symbol"]}</td>
              <td className="py-2 px-4 border-b">{row["productType"]}</td>
              <td className="py-2 px-4 border-b">{row["tradedQty"]}</td>
              <td className="py-2 px-4 border-b">{row["tradePrice"]}</td>
              <td className="py-2 px-4 border-b">{row["orderDateTime"]}</td>
              <td className="py-2 px-4 border-b">{row["tradeValue"]}</td>
              <td className="py-2 px-4 border-b">{row['side'] === '-1' ? 'SELL' : 'BUY'}</td>
            </tr>
          )) : (
            <tr><td colSpan="7" className="text-center py-4">No trades found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TradeGrid;
