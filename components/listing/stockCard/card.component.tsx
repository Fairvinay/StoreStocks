import React from 'react'
import Logo from '../../common/stockLogo/logo.component'
import Link from 'next/link'
import {useDispatch} from 'react-redux'
import {saveSelectedCard} from '@/redux/slices/stockSlice'
import {DocumentDownload} from 'iconsax-react'

const StockCard = ({stock}: { stock: any }) => {
    const dispatch = useDispatch()
    const {ticker, volume, price, change_amount, change_percentage} = stock
    return (
        <Link href={`/company/${'IBM'}`} onClick={() => {
            dispatch(saveSelectedCard({...stock, ticker: 'IBM'}))
        }}>
            <div className='rounded-xl mx-auto transition-all cursor-pointer p-4 border-2 border-greylight  my-3'
                 style={{maxWidth: 300}}>
                <div className='flex items-start justify-between'>
                    <Logo name={ticker}/>
                    <p className='text-right font-semibold text-black dark:text-white'>{volume}+ available </p>
                </div>
                <h1 className='text-black dark:text-white text-lg font-semibold mt-2'>{ticker}</h1>
                <h1 className='text-black dark:text-white text-md font-semibold '>
                    ${price}
                    {change_amount.includes('-')
                        ? <span className='text-sm ml-2 text-red'>{change_amount}▼</span>
                        : <span className='text-sm ml-2 text-green'>+{change_amount}▲</span>
                    }
                </h1>
                <Link
                    style={{fontSize: 9, width: 'fit-content'}}
                    title=' Company earnings expected in the next 3 months'
                    href={`/download?next_url=https://www.alphavantage.co/query?function=EARNINGS_CALENDAR&symbol=${ticker}&horizon=3month&apikey=demo`}
                    className='text-xs text-white w-1/2 flex items-center justify-end ml-auto bg-brandblue p-1 px-2 rounded-lg'>
                    Download Report
                    <DocumentDownload className='ml-2' size={12}/>
                </Link>
            </div>
        </Link>
    )
}

export default StockCard
