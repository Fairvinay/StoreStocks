import axios from "axios";

const API = axios.create({
    baseURL: 'https://www.alphavantage.co/query'
})

export { API };