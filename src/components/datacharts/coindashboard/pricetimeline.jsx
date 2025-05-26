import { useState, useEffect, useMemo } from "react";
import { Chart } from "primereact/chart";
import { useCoinStore } from "../../../stores/useCoinStore";


import {
    DEFAULT_CHART_DATA,
    prepareDataset,
    createChartData,
    createChartOptions
} from "./common/generateChartDataset";

export default function PriceTimeline() {

    const singleCoinData = useCoinStore(state => state.singleCoinData);
    const searchCoin = useCoinStore(state => state.searchCoin);
    const timeLine = useCoinStore(state => state.timeLine);
    const loading = useCoinStore(state => state.loading);
    const error = useCoinStore(state => state.error);
    const selectedDataKey = useCoinStore(state => state.selectedDataKey);
    const updateDataKey = useCoinStore(state => state.updateDataKey);
    const fetchSingleCoinData = useCoinStore(state => state.fetchSingleCoinData);

    useEffect(() => {
        const Initialize = () => {
            fetchSingleCoinData();
        }
        Initialize();

    }, [selectedDataKey, timeLine, fetchSingleCoinData]);

    const chartDataMemo = useMemo(() => {
        if (!singleCoinData?.[selectedDataKey]?.length) return DEFAULT_CHART_DATA;
        const dataset = prepareDataset(singleCoinData[selectedDataKey]);
        return createChartData(searchCoin, selectedDataKey, dataset);
    }, [singleCoinData, searchCoin, selectedDataKey]);

    const chartOptionsMemo = useMemo(() => {
        return createChartOptions(timeLine, selectedDataKey);
    }, [timeLine, selectedDataKey]);


    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    if (loading) {
        return <div className="loading-message">Loading...</div>;
    }
    return (


        <Chart
            className="flex justify-content-center, w-12"
            key={`${selectedDataKey}`}
            type="line"
            data={chartDataMemo}
            options={chartOptionsMemo}

        />

    );
}
