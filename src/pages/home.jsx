import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";


import TrendingDataTable from "../components/datacharts/trendingData/TrendingDataTable";
import HistoricalDataTable from "../components/datacharts/historicalData/HistoricalDataTable";



export default function Home() {
    return (
        <>
            {/* <TrendingDataTable /> */}
            <HistoricalDataTable />

            {/* <HistoricalDataTable search="bitcoin" /> */}
        </>
    );
}
