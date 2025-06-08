
const  otherData = JSON.stringify([ {
    "symbol": "SBET",
            "ticker": "SBET",
            "price": "35.83",
            "change_amount": "29.11",
            "change_percentage": "433.1845%",
            "volume": "53992986"
        },
        {
            "symbol": "LVWR",
            "ticker": "LVWR+",
            "price": "0.0403",
            "change_amount": "0.0302",
            "change_percentage": "299.0099%",
            "volume": "1545706"
        },
        {

            "symbol": "MBAVW",
            "ticker": "MBAVW",
            "price": "1.31",
            "change_amount": "0.91",
            "change_percentage": "227.5%",
            "volume": "1764512"
        } ]);
const  otherObjData =JSON.parse(otherData);
const loserData = JSON.stringify(    [
        {
            "symbol": "RCKT",
            "ticker": "RCKT",
            "price": "2.33",
            "change_amount": "-3.94",
            "change_percentage": "-62.8389%",
            "volume": "54260255"
        },
        { "symbol": "RVMDW",
            "ticker": "RVMDW",
            "price": "0.1275",
            "change_amount": "-0.1625",
            "change_percentage": "-56.0345%",
            "volume": "344544"
        },
        {  "symbol": "QVCGP",
            "ticker": "QVCGP",
            "price": "7.66",
            "change_amount": "-7.75",
            "change_percentage": "-50.292%",
            "volume": "1046241"
        }])
const loserObjData= JSON.parse(loserData);

export const CommonConstants = {
    chartDataKey: "Time Series (Daily)",
    closeDataKey: '4. close',
    typeDataKey: '3. type',
    symbolDataKey: '1. symbol',
     recentSearchesKey: 'recentSearches',
     recentEquitiesKey: 'recentEquities',
   // recentSearchesKey: 'CKFRQC4GPZQUB56W',
   // stockDataCacheKey: 'stockData',
    stockDataCacheKey:   'stockData' ,
    fyersToken :"fyersToken",
    platFormKey:   'api-key' ,
    sampleData :  JSON.stringify( { "top_gainers":  otherData ,  "top_losers":loserData } ),
    //stockDataCacheKey: 'CKFRQC4GPZQUB56W',
    companyDataCacheKey: 'companyData',
    // companyDataCacheKey: 'CKFRQC4GPZQUB56W',
     apiKey: 'CKFRQC4GPZQUB56W',
     sampleDataVersion1 :  JSON.stringify( { "top_gainers":  otherObjData ,  "top_losers":loserObjData } ),
}

/*  JSON.stringify( { "top_gainers":  otherData ,  "top_losers":loserData } )
stockData
{"top_gainers":"[{\"ticker\":\"SBET\",\"price\":\"35.83\",\"change_amount\":\"29.11\",\"change_percentage\":\"433.1845%\",\"volume\":\"53992986\"},{\"ticker\":\"LVWR+\",\"price\":\"0.0403\",\"change_amount\":\"0.0302\",\"change_percentage\":\"299.0099%\",\"volume\":\"1545706\"},{\"ticker\":\"MBAVW\",\"price\":\"1.31\",\"change_amount\":\"0.91\",\"change_percentage\":\"227.5%\",\"volume\":\"1764512\"}]","top_losers":"[{\"ticker\":\"RCKT\",\"price\":\"2.33\",\"change_amount\":\"-3.94\",\"change_percentage\":\"-62.8389%\",\"volume\":\"54260255\"},{\"ticker\":\"RVMDW\",\"price\":\"0.1275\",\"change_amount\":\"-0.1625\",\"change_percentage\":\"-56.0345%\",\"volume\":\"344544\"},{\"ticker\":\"QVCGP\",\"price\":\"7.66\",\"change_amount\":\"-7.75\",\"change_percentage\":\"-50.292%\",\"volume\":\"1046241\"}]"}

*/