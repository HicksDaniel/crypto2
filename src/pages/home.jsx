import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { Dropdown } from "primereact/dropdown";

import DefinedDataTable from "../components/datacharts/trendingData/TrendingDataTable";
import HistoricalDataTable from "../components/datacharts/historicalData/HistoricalDataTable";

import { useCoinStore } from "../stores/useCoinStore";

export default function Home() {
  const [selectedChart, setSelectedChart] = useState([]);
  const { fetchDefinedData } = useCoinStore();
  const cities = [
    {
      name: "Trending Coins",
      value: "trending",
      comp: <DefinedDataTable trending />,
    },
    {
      name: "Top Gainers",
      value: "top_gainers_losers",
      comp: <DefinedDataTable info="gainers" />,
    },
    {
      name: "Top Losers",
      value: "trending",
      comp: <DefinedDataTable info="losers" />,
    },
    { name: "Most Viewed", value: "trending", comp: "IST" },
    { name: "Price Change since ATH", value: "trending", comp: "PRS" },
    {
      name: "Historical Lookup",
      value: "historical",
      comp: <HistoricalDataTable />,
    },
  ];

  const handleSelection = (value) => {
    setSelectedChart(value);
    fetchDefinedData(value);
  };

  const renderCascadeMenu = () => {
    return (
      <>
        <Dropdown
          value={selectedChart}
          onChange={(e) => handleSelection(e.value)}
          options={cities}
          optionLabel="name"
          placeholder="Select a Chart"
          className="w-full md:w-14rem"
        />

        {selectedChart.comp}
      </>
    );
  };

  return <>{renderCascadeMenu()}</>;
}
