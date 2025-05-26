import React, { useEffect } from 'react'
import { useCoinStore } from '../../../stores/useCoinStore'
import { calculatePercentageChange } from '../../../assets/common/utils'

export function ChangeOverTime() {
    const { data, fetchData, searchCoin, timeLine, updateTimeLine, selectedDataKey } = useCoinStore()

    const currentData = calculatePercentageChange(data?.marketData?.pricing)

    const handleClick = (value) => {
        if (value === timeLine) return;
        updateTimeLine(value);
    };


    useEffect(() => {
        const InitializeCOT = async () => {
            const coin = searchCoin
            fetchData(coin)

        }
        InitializeCOT();
    }, [fetchData, searchCoin])




    return (

        <div className="flex justify-content-around bg-black-alpha-10 flex-row w-11">
            {currentData?.map((item, index) => (
                <div key={index} className="flex border-1 justify-content-center flex-column w-2 text-center p-2 h-8rem">
                    <div onClick={() => handleClick(item.value)} className="flex cursor-pointer justify-content-center align-items-center h-4rem font-bold">{item.label}</div>
                    <div className="flex justify-content-center align-items-center h-4rem font-bold">
                        {item.changeValue != null
                            ? item.label === "Current"
                                ? `$${item.changeValue}`
                                : `${item.changeValue.toFixed(2)}%`
                            : "N/A"}
                    </div>
                </div>
            ))}


        </div>

    )
}
