import React, { createContext, useEffect, useState } from 'react';
import {AppDispatch, store} from '@/redux/store';
import {Provider, useDispatch, useSelector} from 'react-redux';
import { saveEquities } from '@/redux/slices/equitySlice';
import { saveTradeBook } from '@/redux/slices/tradeSlice';

import { StorageUtils } from '@/libs/cache';
import { CommonConstants } from '@/utils/constants';
import { FYERSAPINSECSV , FYERSAPITRADEBOOKURL} from '@/libs/client';

const CustomContext = createContext<any>(null);
//const EquityContext = React.createContext<any>(null);

export const TradeReduxProvider = ({children}: { children: React.ReactNode }) => {
   const [fyersQuery, setFyersQuery] = useState( '');
   // const [equityState, setEquityState] = useState ( );
   const [tradeState, setTradeState] = useState(() => ({
     ...store
    }));

    const updateEquityState = (newData: Partial<typeof store>) => {
          setTradeState(prev => ({
            ...prev,
            ...newData
          }));
    } ;
     let mt:any[] = [];
       //  const bestMacthes = { "bestMatches" :mt };
      let bestMacthes = { bestMatches: [...mt] }; // 🔁 clone to avoid frozen reference
  const [matches, setMatches] = useState<typeof bestMacthes>( );
  const [localMatches, setLocalMatches] = useState<any[]>([]);
  const [tradeData, setTradeData] = useState< any[]>( );
 // const CSV_URL = 'https://drive.google.com/uc?export=download&id=1UjjQcDHiRIPxbzZOTZaWrLQjKtVzZjp_';
  const TRADE_URL  = [   FYERSAPITRADEBOOKURL  ] ;
  //'https://192.168.1.7:8888/.netlify/functions/netlifystockfyersbridge/api/fyersgettradebook'
  const CSV_URL  = [   FYERSAPINSECSV +'/NSE_CM.csv' ] ;  //'http://localhost:8888/NSE_CM.csv' ,
  const dispatch = useDispatch();

 // // Example usage
 //const line = "1010000000100,AMARA RAJA ENERGY MOB LTD,0,1,0.05,INE885A01032,0915-1530|1815-1915:,2023-11-28,,NSE:ARE&M-EQ,10,10,100,ARE&M,100,-1.0,XX,1010000000100,None";
 //const result = parseLine(line);
  const parseLine = (line: string): Record<string, any>  => {
          const parts = line; //split(',');

          const rawName = parts[0];            // clientId   "AMARA RAJA ENERGY MOB LTD"
          const ordertime = parts[1];                //orderDateTime
           const orderNumber = parts[2];           //  orderNumber
            const exchangeOrderNo = parts[3];           //  exchangeOrderNo
             const exchange = parts[4];           //  exchange
              const side = parts[5];           //  side
               const segment = parts[6];           //  segment
                const orderType = parts[7];           //  orderType
                 const fyToken = parts[8];           //  fyToken
                  const productType = parts[9];           //  productType
            const tradedQty = parts[10];           //  tradedQty
                const tradePrice = parts[11];           //  tradePrice
                 const tradeValue = parts[12];           //  tradeValue
                  const tradeNumber = parts[13];           //  tradeNumber
         const row = parts[14];           //  row
                 const symbol = parts[15];           //  symbol
                  const orderTag = parts[16];           //  orderTag

          //const symbol = parts[9];            // "NSE:ARE&M-EQ"
          const cleaned = symbol.replace(/^NSE:|[-_]EQ$/g, "");
          const sym = { "symbol": `${cleaned}`  };
          let qty = {  "tradedQty": tradedQty  };
          
          let type =  { "orderType": orderType };
          if(symbol.includes('NCD') || rawName.includes('NCD')){
            type =  { "orderType": "NCD" };
          }
          else if(symbol.includes('EQ')){
             type =  { "orderType": "Equity" };
          }
          else if(symbol.includes('BOND')){
             type =  { "orderType": "BOND" };
          }
           else if(symbol.includes('NAV')){
             type =  { "orderType": "BOND" };
          }
           else if(symbol.includes('INDEX')){
             type =  { "orderType": "INDEX" };
          }
          const region =  { "4. region": "India/Bombay" };
          const marketOpen =  { "5. marketOpen": "09:15" };
          const marketClose =  { "6. marketClose": "15:30" };
          const timezone =  {"7. timezone": "UTC+5.5" };
          const currency =  {"8. currency": "INR" };
          const prodtype =  {"productType": productType };
          const price =  {"tradePrice": tradePrice };
          const tvalue =  {"tradeValue": tradeValue };

          /*
          {
        "bestMatches": [
            {
                "1. symbol": "ICICI500.BSE",
            "2. name": "ICICI Prudential S&P BSE 500 ETF",

               "3. type": "ETF",
               "4. region": "India/Bombay",
               "5. marketOpen": "09:15",
               "6. marketClose": "15:30",
               "7. timezone": "UTC+5.5",
              "8. currency": "INR",
              "9. matchScore": "0.6250"
           },
          ]
          */
          // Extract first 3 words from the name, or custom logic
          const name = rawName.split(' ').slice(0, 3).join(' '); // "AMARA RAJA ENERGY"
           // rw = {  "2. name": name  };

      return {  ...sym,
              
              ...type,
              ...qty,
              ...price,
              ...tvalue,
              ...prodtype 
                };
   };
     // Fetch CSV once
   useEffect(() => {
     const fetchTradeBook = async () => {
      for (let endP = 0 ; endP < TRADE_URL.length ; endP ++) { 
       try {
      
         const res = await fetch(TRADE_URL[endP]);
         const text = await res.text();
        // const lines = text.split('\n').filter(Boolean);
           const bestMacthes1 = { bestMatches: [...mt] }; // 🔁 clone to avoid frozen reference
            let json;
            try {
            json = JSON.parse(text);
            console.log('Valid TRADE BOOK :', json);
            } catch (e) {
              console.error('Invalid JSON:', e);
            }
            if( json !==null && json ! == undefined) { 
            const lines = json["tradeBook"];
           const parsed = lines.map((line:any) => {
           //const [symbol, name, ...rest] = line.split(','); // modify based on CSV structure
           const result = parseLine(line);
           //console.log(result); 
           let kt =  Object.keys(result);
            let symbol ='';//Object(result)?.hasProperty["1. symbol"];
           let name  =''; //Object(result)?.hasProperty["2. name"];
           kt.forEach( k => {  //console.log("result ke "+kt); 
                  //console.log(`Key: ${k}, Value: ${result[k]}`);
                 if(symbol == undefined){
                   if(k==='1. symbol'  ){
                        symbol = result[k]
                   }
                    if(  k==='2. name' ){
                        name = result[k]
                   }
                 }
           })                  
          
           if(result !=undefined)
              {  
                
                const stringMap: Record<string, string> = Object.fromEntries(
                  Object.entries(result).map(([key, value]) => [key, String(value)])
                      );
                 if (!Object.isExtensible(bestMacthes1.bestMatches)) {
                    console.warn("bestMatches array is frozen — recreating");
                    bestMacthes1.bestMatches = [...bestMacthes1.bestMatches]; // force new clone
                  }

               bestMacthes1.bestMatches.push(stringMap); // ✅ safe now
              setLocalMatches(prev => [...prev, stringMap]); // ✅ state-based update
            
                   //bestMacthes["bestMatches"].push( stringMap)
              };
              return {  symbol, name };
           });
           if(bestMacthes1["bestMatches"] !==undefined && Array.isArray(bestMacthes1["bestMatches"]) )
           {  
             console.log("bestMacthes total recros " + bestMacthes1["bestMatches"].length);
             console.log("bestMacthes 5 record " + JSON.stringify(bestMacthes1["bestMatches"].slice(0, 5)));
              const lastFive = JSON.stringify(bestMacthes1["bestMatches"].slice(-5));
              console.log("bestMacthes last 5 record "  + lastFive);
                const bestMacthes = { bestMatches: [...bestMacthes1.bestMatches] };
            /* if (!Object.isExtensible(bestMacthes.bestMatches)) {
                    console.warn("bestMatches array is frozen — recreating");
                    bestMacthes.bestMatches = [...bestMacthes1.bestMatches]; // force new clone
              }*/
              StorageUtils._save(CommonConstants.recentTradesKey, bestMacthes.bestMatches) //StorageUtils._save(CommonConstants.recentEquitiesKey);
             
                setTradeData(bestMacthes.bestMatches);
               dispatch(saveTradeBook(bestMacthes.bestMatches)); 
            
            }
         }  // TRADE JSON is not NULL and UNDEFINED 
         else {
            console.error("TRADE BOOK NOT READ PROPERLY }:" );
         }

          // other option to store int the context 
          // updateEquityState({ equities: parsed }); // ✅ Save in context

       } catch (err) {
         console.error("TRADE BOOK  error:", err);
       }
      }
     };
     console.log("TradeReduxProvider initiating RADE BOOK ..");
     fetchTradeBook();
     
   }, []);
   // other option }, [updateEquityState]);
  
     // Filter when query changes
   useEffect(() => {
     if (fyersQuery.length < 3) {
       setMatches({ bestMatches : []});
       return;
     }
 
     const prefix = fyersQuery.toLowerCase().slice(0, 3);
 
     const filtered = tradeData?.filter(
     (item : any)=> item["symbol"].toLowerCase().startsWith(prefix)
     ).slice(0, 5);
      console.log("TradeReduxProvider filtering trade book ..");
      if( filtered !==undefined)
          { setMatches({ bestMatches :  filtered}); }
   }, [fyersQuery, tradeData]);


    return (
        <CustomContext.Provider value={{ tradeState, setTradeState }}>{children}</CustomContext.Provider>
    )
}
//export const useEquity = () => React.useContext(CustomContext);
export const useEquity = () => {
   console.log("TradeReduxProvider fetches trade book ..");
  return useSelector((state: any) => state.equity); // strongly type with RootState if available
};
export const useAppDispatch: () => AppDispatch = useDispatch;
