import React, { useState, useEffect } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useCoinStore } from '../stores/useCoinStore.jsx';


export function structuredCoinData(data) {
    const dataStructure = {
        name: data?.name || null,
        image: data.small || null,
        currentPrice: data?.data?.price.toFixed(14) || null,
        priceChange24h: data?.data?.price_change_percentage_24h?.usd || null,
        totalVolume: data?.data?.total_volume || null,
        marketCapRank: data?.market_cap_rank || null,
        symbol: data?.symbol || null,
    }

    return dataStructure
}



export default function Home() {
    const { fetchTrendingData, trendingData } = useCoinStore();
    const [trendingCoins, setTrendingCoins] = useState([])

    const bodyStyles = {
        bodyCell: {
            style: { padding: "0px 10px", margin: 0 }
        },
        headercell: {
            style: { background: "red" }
        },
    }


    useEffect(() => {
        fetchTrendingData()
        const tempArray = []
        trendingData.map(async (res) => {
            const finessedData = structuredCoinData(res)
            tempArray.push(finessedData)

            setTrendingCoins(tempArray)
        })
    }, [JSON.stringify(trendingData)])



    const RenderedTrendingDataChart = (
        trendingData.map((coin) => {
            return <div style={{ width: "100px", height: "100px" }}> <img src={coin.small} /> </div>
        })
    )

    const imageBodyTemplate = (rowData) => {
        return (

            <div className=" flex justify-content-between align-items-center">
                <div className=" flex align-items-center w-4">

                    <img style={{ borderRadius: '20px' }} src={`${rowData.image}`} size="fit" alt={rowData.image} className="shadow-4" />
                </div>
                <div className=" flex w-7 justify-content-center">

                    {rowData.symbol}
                </div>
            </div>
        )
    };
    const displayNameTemplate = (rowData) => {
        return (

            <div className=" justify-content-center align-items-center">
                {rowData.name}
            </div>
        )
    };




    return (
        <>
            <div>This is Your Home Now!</div>
            <button onClick={() => console.log(trendingCoins)}>Click for trending</button>
            <div className="flex bg-primary-600 h-full justify-content-center p-0 m-0 w-9">

                <DataTable pt={{
                    datatable: {
                        style: { background: "red" }
                    },
                    headercell: {
                        style: { background: "red" }
                    },
                    wrapper: {
                        style: { borderRadius: "20px", outline: "2px solid var(--blue-900)", border: "5px solid var(--primary-color)", height: "100%" }
                    },
                    table: {
                        style: { height: "100%" }
                    },
                    tbody: {
                        style: { margin: "115px", padding: "15px" }
                    },
                    bodyRow: {
                        style: {}
                    },
                    row: {
                        style: {}
                    },


                    tbody: {
                        style: {}
                    }

                }} sortable value={trendingCoins}>

                    <Column pt={bodyStyles} body={displayNameTemplate} header="Company" />
                    <Column pt={bodyStyles} body={imageBodyTemplate} header="Quantity" />
                    <Column pt={bodyStyles} sortable field="currentPrice" header="Current Price" />
                    <Column pt={bodyStyles} field="totalVolume" header="Total Volume" />
                    <Column pt={bodyStyles} field="totalVolume" header="Total Volume" />
                    <Column pt={bodyStyles} field="totalVolume" header="Total Volume" />
                </DataTable>
            </div>

        </>
    )
}
