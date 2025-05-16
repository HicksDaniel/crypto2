import React, { useState, useEffect } from "react";

import TrendingDataTable from "../components/datacharts/trendingData/TrendingDataTable";
import HistoricalDataTable from "../components/datacharts/historicalData/HistoricalDataTable";

export default function Home() {
    return (
        <>
            {/* <TrendingDataTable /> */}
            <HistoricalDataTable search="bitcoin" date="15-12-2024" localCurrency="usd" />
            {/* <HistoricalDataTable search="bitcoin" /> */}
        </>
    );
}
