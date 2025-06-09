import {StorageUtils} from "@/libs/cache"
import {API} from "@/libs/client"
import {disableLoader, enableLoader} from "@/redux/slices/miscSlice"
import {saveCompanyData} from "@/redux/slices/stockSlice"
import {CommonConstants} from "@/utils/constants"
import toast from "react-hot-toast"

export const getCompanyData = (_id: string | string[]) => {
      // SAMPLE TOP GANERS DEFAULT DATA 
      StorageUtils._save (CommonConstants.stockDataCacheKey,CommonConstants.sampleDataVersion1);
    return async (dispatch: Function) => {
        const dataFromCache = StorageUtils._retrieve(CommonConstants.companyDataCacheKey)
        if (dataFromCache.isValid && dataFromCache.data !== null) {
            const parsedData = dataFromCache.data
            if (parsedData.Symbol === _id) {
                dispatch(saveCompanyData(parsedData))
                return;
            }
        }

        dispatch(enableLoader())


        try {
            const res = await API.get('/', {params: {function: 'OVERVIEW', symbol: _id}})

             // Handle rate limit error string inside response
            if (
                res.data?.Information?.includes("We have detected your API key") ||
                res.data.Note?.includes("Thank you for using Alpha Vantage") // fallback
            ) {
                dispatch({ type: 'SHOW_SUBSCRIPTION_POPUP' }); // dispatch popup
               // dispatch(saveCompanyData(null));
            } else {
                dispatch(saveCompanyData(res.data));
                StorageUtils._save(CommonConstants.companyDataCacheKey, res.data);
            }
           // dispatch(saveCompanyData(res.data))
            StorageUtils._save(CommonConstants.companyDataCacheKey, res.data)
        } catch (err) {
            // @ts-ignore
            const {message} = err
            toast.error(message ? message : "Something went wrong!")
            console.log(err)

           // dispatch(saveCompanyData(null))
        } finally {
            dispatch(disableLoader())
        }
    }
}
