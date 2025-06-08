import {API, FYERSAPI} from "@/libs/client"
import {saveRecentSearches} from "@/redux/slices/miscSlice"
import {saveResults} from "@/redux/slices/stockSlice"
import {StorageUtils} from "@/libs/cache";
import {CommonConstants} from "@/utils/constants";
import {NEXT_PUBLIC_API_KEY } from '../../../config'
import React, { useState, useEffect } from 'react';
import { saveStockResults } from "@/redux/slices/equitySlice";
const CSV_URL = 'https://drive.google.com/uc?export=download&id=1UjjQcDHiRIPxbzZOTZaWrLQjKtVzZjp_';


export const fetchSearchResults = (_query: string, equities:any,  setTypes: Function, setLoading: Function, _recentSearches: any) => {
 
  /*  const [fyersQuery, setFyersQuery] = useState(_query ?? '');
  const [matches, setMatches] = useState<{ symbol: string; name: string }[]>([]);
  const [csvData, setCsvData] = useState<{ symbol: string; name: string }[]>([]);
   
    // Fetch CSV once
  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const res = await fetch(CSV_URL);
        const text = await res.text();
        const lines = text.split('\n').filter(Boolean);
        const parsed = lines.map(line => {
          const [symbol, name, ...rest] = line.split(','); // modify based on CSV structure
          return { symbol, name };
        });
        setCsvData(parsed);
      } catch (err) {
        console.error("CSV fetch error:", err);
      }
    };

    fetchCSV();
  }, []);
 
    // Filter when query changes
  useEffect(() => {
    if (fyersQuery.length < 3) {
      setMatches([]);
      return;
    }

    const prefix = fyersQuery.toLowerCase().slice(0, 3);

    const filtered = csvData.filter(
      item => item.name?.toLowerCase().startsWith(prefix)
    ).slice(0, 5);

    setMatches(filtered);
  }, [fyersQuery, csvData]);
 */

    return async (dispatch: Function) => {
        try {
            setLoading(true)
              let tokenauth = StorageUtils._retrieve(CommonConstants.fyersToken);
             let auth_code ='';
             if (tokenauth.isValid && tokenauth.data !== null) {
                       console.log("User is Authorized ");
                      auth_code = tokenauth.data['auth_code'];
                console.log("equities "+JSON.stringify(equities));
                 console.log("_query "+JSON.stringify(_query));
                 let nsesym = `NSE:${_query.toUpperCase()}`;
                  console.log(" searching in euities for  "+JSON.stringify(nsesym));
                const uniqueTypes: Array<string> = Array.from(new Set(equities.bestMatches.map((item: any) =>  {
                  /* if(item.symbol.indexOf(nsesym) > -1 ) {
                     return item.symbol;
                } 
                    item['3. type']*/
                      if (item['1. symbol'].indexOf(_query.toUpperCase()) > -1 ) {
                       console.log(" item['1. symbol'] "+JSON.stringify(item['1. symbol'])+ "_query "+JSON.stringify(_query.toUpperCase()));
                     
                     return item['3. type'];
                   }  }
                 )));
                 const uniqueSearches: Array<string> = Array.from(new Set(equities.bestMatches.map((item: any) => {
                   if (item['2. name'].indexOf(_query.toUpperCase()) > -1 ) {
                     console.log(" item['2. name'] "+JSON.stringify(item['2. name'])+ "_query "+JSON.stringify(_query.toUpperCase()));
                     
                     return item;
                   }  
                    } 
                 )));
                const uniqueTypesArr = ['All', ...uniqueTypes]
                 console.log(" uniqueTypesArr "+JSON.stringify(uniqueTypesArr));
                   console.log(" uniqueSearches "+JSON.stringify(uniqueSearches));
              // not needed as equities already in the global state.
                 //dispatch(saveStockResults(uniqueSearches))
                dispatch(saveRecentSearches(uniqueSearches))
                 setTypes([...uniqueTypesArr])
                if (_recentSearches) {
                  //  console.log("_recentSearches "+JSON.stringify(_recentSearches))
                    if (_recentSearches.includes(_query)) { 
                     /* if(Array.isArray(_recentSearches)){ 
                        const searchs = [ uniqueTypes]
                        if(Array.isArray(searchs) && searchs.length >0){ 
                         if( !Object.isFrozen(_recentSearches ) || !Object.isExtensible(_recentSearches))        // true or false
                          {  //_recentSearches.push(...searchs);
                             try { 
                               _recentSearches.push(...searchs)
                             }catch(errrw)
                              {  console.log("  spread push not supported ");
                                 dispatch(saveRecentSearches([..._recentSearches, ...searchs]));
                                 
                               }

                            }       // true or false
                          else{ 
                            console.log("searched symbols .. trying spread push ")
                            try { 
                              _recentSearches.push(...searchs)
                            }catch(errrw)
                              {  console.log("  spread push not supported ")  }
                          }   
                        }
                       } */
                       return

                    }  
                    dispatch(saveRecentSearches([..._recentSearches, _query]));
                    StorageUtils._save(CommonConstants.recentSearchesKey, [..._recentSearches, _query])
                } else {
                    if( uniqueSearches !== null && uniqueSearches !=undefined) {
                         dispatch(saveRecentSearches([uniqueSearches]));
                    }
                    else  if( uniqueTypes !== null && uniqueTypes !=undefined) {
                         dispatch(saveRecentSearches([uniqueTypes]));
                    }
                    else {
                    
                      
                    }
                   
                }       


               //  const res = await FYERSAPI.get('/fyersgetquote', {params: {function: 'SYMBOL_SEARCH', 
                //    symbol: _query ,  auth_code :auth_code,apikey:NEXT_PUBLIC_API_KEY }})

             }

           /* const res = await API.get('/', {params: {function: 'SYMBOL_SEARCH', keywords: _query, apikey: NEXT_PUBLIC_API_KEY }})

            const uniqueTypes: Array<string> = Array.from(new Set(res.data.bestMatches.map((item: any) => item['3. type'])))
            const uniqueTypesArr = ['All', ...uniqueTypes]
            dispatch(saveResults(res.data.bestMatches))
            setTypes([...uniqueTypesArr])
            if (_recentSearches) {
                if (_recentSearches.includes(_query)) return
                dispatch(saveRecentSearches([..._recentSearches, _query]));
                StorageUtils._save(CommonConstants.recentSearchesKey, [..._recentSearches, _query])
            } else {
                dispatch(saveRecentSearches([_query]));
            } */
        } catch (error) {
            console.log(error)
             let tokenauth = StorageUtils._retrieve(CommonConstants.fyersToken);
             let auth_code ='';
             if (tokenauth.isValid && tokenauth.data !== null) {
                       console.log("User is Authorized ");
                      auth_code = tokenauth.data['auth_code'];
                const uniqueTypes: Array<string> = Array.from(new Set(equities.map((item: any) =>item.symbol.includes(_query))))
                const uniqueTypesArr = ['All', ...uniqueTypes]
              // not needed as equities already in the global state.
              //  dispatch(saveStockResults(equities))
               setTypes([...uniqueTypesArr])
                if (_recentSearches) {
                    if (_recentSearches.includes(_query)) return
                    dispatch(saveRecentSearches([..._recentSearches, _query]));
                    StorageUtils._save(CommonConstants.recentSearchesKey, [..._recentSearches, _query])
                } else {
                    dispatch(saveRecentSearches([_query]));
                }       
                //  const res = await FYERSAPI.get('/fyersgetquote', {params: {function: 'SYMBOL_SEARCH', 
                //    symbol: _query ,  auth_code :auth_code,apikey:NEXT_PUBLIC_API_KEY }})

             }
            
 
            return error
        } finally {
            setLoading(false)
        }
    }
}
