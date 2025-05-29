import React, {lazy, Suspense} from 'react'
import {ActionLoader} from "@/components/loader/actionLoader/loader.component";
import {NextPageContext} from "next";

const CompanyView = lazy(() => import ("@/components/company/companyInfo/CompanyView"));


const CompanyPage = ({params}: any) => {
    console.log(params)
    return (
        <Suspense fallback={<ActionLoader/>}>
            <div className={''}>
                <CompanyView _id={params.slug}/>
            </div>
        </Suspense>

    )
}

CompanyPage.getInitialProps = async (ctx: NextPageContext) => {
    console.log(ctx.query, "ss")
    return {_id: ctx.query.id};
}

export default CompanyPage
