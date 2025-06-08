import axios from "axios";

const API = axios.create({
    baseURL: 'https://www.alphavantage.co/query'
})
const FYERSAPI = axios.create({
    baseURL: 'https://store-stocks.netlify.app/.netlify/functions/netlifystockfyersbridge/api'
   // baseURL: 'http://192.168.1.6:8888/.netlify/functions/netlifystockfyersbridge/api'
})
const FYERSAPILOGINURL = 'https://store-stocks.netlify.app/.netlify/functions/netlifystockfyersbridge/api/fyerscallback'
//const FYERSAPILOGINURL = 'http://192.168.1.6:8888/.netlify/functions/netlifystockfyersbridge/api/fyerscallback'

const FYERSAPINSECSV = 'https://store-stocks.netlify.app';
//const FYERSAPINSECSV = 'http://192.168.1.6:8888';

export { API , FYERSAPI ,FYERSAPILOGINURL , FYERSAPINSECSV };