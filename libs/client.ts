import axios from "axios";

const API = axios.create({
    baseURL: 'https://www.alphavantage.co/query'
})
const FYERSAPI = axios.create({
    baseURL: 'https://store-stocks.netlify.app/.netlify/functions/netlifystockfyersbridge/api'
})
const FYERSAPILOGINURL = 'https://store-stocks.netlify.app/.netlify/functions/netlifystockfyersbridge/api/fyerscallback'
export { API , FYERSAPI ,FYERSAPILOGINURL };
