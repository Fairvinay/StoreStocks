import { API } from "@/libs/client"
import { CommonConstants } from "@/utils/constants"
import toast from "react-hot-toast/headless"
import { convertDateToReadable } from "./chart.functions"
const mapper = {
    "TIME_SERIES_DAILY": "Time Series (Daily)",
    "TIME_SERIES_WEEKLY": "Weekly Time Series",
    "TIME_SERIES_MONTHLY": "Monthly Time Series",
    "TIME_SERIES_INTRADAY": "Time Series (5min)"
}

export const fetchChartData = (
    setLoading: Function,
    fetchFn: any,
    Symbol: string,
    setChartData: Function,
    setAxisMin: Function,
    setAxisMax: Function,
) => {

    return async (dispatch: Function) => {
        try {
            setLoading(true)
            let res;
            if (fetchFn === "TIME_SERIES_INTRADAY") {
                res = await API.get('/', { params: { function: fetchFn, symbol: Symbol, interval:'5min' } })
            } else {
                res = await API.get('/', { params: { function: fetchFn, symbol: Symbol } })
            }
                // @ts-ignore
                const chartDates = res.data[mapper[fetchFn]]
                const chartDateAndClose = Object.keys(chartDates).map((date: string) => {
                    return {
                        Date: convertDateToReadable(date),
                        Close: parseFloat(chartDates[date][CommonConstants.closeDataKey])
                    }
                })
                setChartData(chartDateAndClose)
                setAxisMin(Math.min(...chartDateAndClose.map((item: any) => item.Close)))
                setAxisMax(Math.max(...chartDateAndClose.map((item: any) => item.Close)))
        } catch (err) {
            toast.error("Something went wrong!")
        } finally {
            setLoading(false)
        }
    }
}