"use client";
import Chip from "@/components/common/textChip/chip.component";
import CompanyAbout from "@/components/company/companyAbout/about.component";
import Info from "@/components/common/insightBox/info.component";
import React, {Suspense, useEffect} from "react";
import Header from "@/components/common/pageHeader/header.component";
import CompanyHeader from "@/components/company/companyDetails/details.component";
import {useSelector} from "react-redux";
import {GlobalState} from "@/redux/store";
import {getCompanyData} from "@/app/company/[slug]/company.actions";
import {useAppDispatch} from "@/providers/ReduxProvider";
import {ActionLoader} from "@/components/loader/actionLoader/loader.component";

const CompanyChart = React.lazy(() => import('@/components/company/priceChart/CompanyChart'))
const CompanyView = (props: any) => {
    const isDarkMode = useSelector((state: GlobalState) => state.misc.isDarkMode)

    const selectedCard = useSelector((state: GlobalState) => state.stock.selectedCard)
    const companyData = useSelector((state: GlobalState) => state.stock.companyData)
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getCompanyData(props._id))
    }, [dispatch, props._id]);


    if (!companyData) {
        return <p>Loading...</p>
    }

    if (!selectedCard) {
        return <p>{`Can't`} load, please go back.</p>
    }

    return (
        <div className={isDarkMode ? 'dark' : ''}>

            <div className={"bg-white dark:bg-black"}>
                <Header/>
                <CompanyHeader
                    Symbol={selectedCard.ticker || "Sample"}
                    price={selectedCard.price || "Demo"}
                    change_amount={selectedCard.change_amount || "abc"}
                    change_percentage={selectedCard.change_percentage || "ac"}
                    {...companyData}
                />
                <Suspense fallback={<ActionLoader/>}>
                    <CompanyChart Symbol={props._id}/>
                </Suspense>
                <div className="flex flex-wrap gap-2 items-center w-10/12 mx-auto my-3">
                    <Chip isSelected={false} text={`SECTOR: ${companyData.Sector}`}/>
                    <Chip isSelected={false} text={`INDUSTRY: ${companyData.Industry}`}/>
                </div>

                <CompanyAbout {...companyData} />

                <div className="flex gap-3 flex-wrap items-center justify-around w-10/12 mx-auto mt-4 py-4">
                    <Info title={'Price/Earning Ratio '} value={companyData?.PERatio}/>
                    <Info title={'PE to Growth Ratio'} value={companyData?.PEGRatio}/>
                    <Info title={'Dividend per share'} value={companyData?.DividendPerShare}/>
                    <Info title={'Currency'} value={companyData?.Currency}/>
                    <Info title={'Market Capitalization'} value={companyData?.Currency}/>
                </div>
            </div>

        </div>
    )


}

export default CompanyView
