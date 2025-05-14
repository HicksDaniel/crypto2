import React, { useState, useEffect } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useCoinStore } from '../../../stores/useCoinStore.jsx';
import { CoinDataStructure } from './common/CoinDataStructure.jsx';
import { dataTableStyles } from './common/passThroughStyles.jsx';
import {
    imageBodyTemplate,
    displayNameTemplate,
    marketCapTemplate,
    currentPriceDataTemplate,
    priceChangeDataTemplate
} from './common/tableBodyStyles.jsx';


export default function TrendingDataTable() {
    const { fetchTrendingData, trendingData } = useCoinStore();
    const [trendingCoins, setTrendingCoins] = useState([])


    useEffect(() => {
        fetchTrendingData()
        const tempArray = []
        trendingData.map(async (res) => {
            const finessedData = CoinDataStructure(res)
            tempArray.push(finessedData)

            setTrendingCoins(tempArray)
        })
    }, [JSON.stringify(trendingData)])

    return (
        <>
            <div>This is Your Home Now!</div>
            <button onClick={() => console.log(trendingCoins)}>Click for trending</button>
            <div className="flex bg-primary-600 justify-content-center p-0 m-0 w-9">

                <DataTable pt={dataTableStyles} sortable value={trendingCoins}>

                    <Column body={displayNameTemplate} header="Company" />
                    <Column sortable body={marketCapTemplate} field="marketCapRank" header="MC Rank" />
                    <Column body={imageBodyTemplate} header="Quantity" />
                    <Column sortable body={currentPriceDataTemplate} field="currentPrice" header="Current Price" />
                    <Column sortable body={priceChangeDataTemplate} field="priceChange24h" header="24h Price Change" />
                    <Column field="totalVolume" header="Total Volume" />
                </DataTable>
            </div>

        </>
    )
}
