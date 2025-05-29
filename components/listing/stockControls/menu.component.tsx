"use client";
import React, {useState} from 'react'
import Chip from '../../common/textChip/chip.component'
import {useDispatch, useSelector} from 'react-redux';
import {changeTab} from '@/redux/slices/miscSlice';
import {GlobalState} from '@/redux/store';
import {saveActivelyTraded, saveGainers, saveLosers} from '@/redux/slices/stockSlice';

const arr = [
    {key: 1, title: "Top Gainers"},
    {key: 2, title: "Top Losers"},
]
const sortMapper = [
    {key: 1, title: "Sort by percentage"},
    {key: 2, title: "Sort by price"},
]

const Menu = () => {
    const [sortType, setSortType] = useState('1')
    const tab = useSelector((state: GlobalState) => state.misc.tab)
    const gainers = useSelector((state: GlobalState) => state.stock.gainers)
    const losers = useSelector((state: GlobalState) => state.stock.losers)
    const activelyTraded = useSelector((state: GlobalState) => state.stock.activelyTraded)
    const dispatch = useDispatch();


    const sortByPercentage = () => {
        if (tab === "Top Gainers") {
            const sortedData = [...gainers].sort((a: any, b: any) => {
                return parseFloat(b.change_percentage) - parseFloat(a.change_percentage)
            })
            dispatch(saveGainers(sortedData))
        } else if (tab === 'Top Losers') {
            const sortedData = [...losers].sort((a: any, b: any) => {
                return parseFloat(b.change_percentage) - parseFloat(a.change_percentage)
            })
            dispatch(saveLosers(sortedData))
        } else {
            const sortedData = [...activelyTraded].sort((a: any, b: any) => {
                return parseFloat(b.change_percentage) - parseFloat(a.change_percentage)
            })
            dispatch(saveActivelyTraded(sortedData))
        }
    }
    const sortByPrice = () => {
        if (tab === "Top Gainers") {
            const sortedData = [...gainers].sort((a: any, b: any) => {
                return parseFloat(b.change_amount) - parseFloat(a.change_amount)
            })
            dispatch(saveGainers(sortedData))
        } else if (tab === 'Top Losers') {
            const sortedData = [...losers].sort((a: any, b: any) => {
                return parseFloat(b.change_amount) - parseFloat(a.change_amount)
            })
            dispatch(saveLosers(sortedData))
        } else {
            const sortedData = [...activelyTraded].sort((a: any, b: any) => {
                return parseFloat(b.change_amount) - parseFloat(a.change_amount)
            })
            dispatch(saveActivelyTraded(sortedData))
        }
    }
    return (
        <div className='flex flex-wrap gap-2 bg-white dark:bg-black items-center justify-between w-11/12 mx-auto my-3'>
            <select value={tab} onChange={(e) => {
                dispatch(changeTab(e.target.value))
            }}
                    className='p-2 focus-visible:outline-none block md:hidden rounded-lg bg-greylight dark:bg-greydark text-gretdark dark:text-white '>
                <option>Top Gainers</option>
                <option>Top Losers</option>
                <option>Most Actively Traded</option>
            </select>
            <div className='hidden md:flex relative flex-wrap items-center justify-between'>
                {
                    arr.map(item => {
                        return <button key={item.key} onClick={() => {
                            dispatch(changeTab(item.title))
                        }} className={` mx-3 hover:scale-105 transition-all cursor-pointer toggle-tab`}>
                            <h1 className='text-md text-black dark:text-white font-semibold'>{item.title}</h1>
                        </button>
                    })
                }
                <div
                    className={`hidden md:block toggle-line ${tab === "Top Losers" ? 'move-line' : tab === 'Most Actively Traded' ? 'move-2next' : ''}`}></div>
            </div>
            <div className='hidden md:flex flex-wrap items-center justify-between'>
                {
                    sortMapper.map(item => {
                        return <Chip key={item.key} isSelected={sortType === String(item.key)} text={item.title}
                                     onClick={() => {
                                         if (item.key === 1) {
                                             sortByPercentage()
                                         } else {
                                             sortByPrice()
                                         }
                                         setSortType(String(item.key))
                                     }}/>
                    })
                }
            </div>
            <select value={sortType} onChange={(e) => {
                if (e.target.value == '1') {
                    sortByPercentage()
                } else {
                    sortByPrice()
                }
                setSortType(e.target.value)
            }}  
                    className='p-2 focus-visible:outline-none block md:hidden rounded-lg bg-greylight dark:bg-greydark text-gretdark  dark:active:text-green-700  '> {/* dark:text-white */}
                <option value={1}>Sort by Percentage</option>
                <option value={2}>Sort by Price</option>
            </select>

        </div>
    )
}

export default Menu
