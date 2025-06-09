import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import DefinedDataTable from "../components/datacharts/trendingData/TrendingDataTable";
import TopGainersLosersDataTable from "../components/datacharts/trendingData/TopGainersLosersDataTable";
import HistoricalDataTable from "../components/datacharts/historicalData/HistoricalDataTable";
import { useCoinStore } from "../stores/useCoinStore";

export default function Home() {
  const [selectedChart, setSelectedChart] = useState(null);
  const {
    formattedDefinedData,
    fetchGainersLosersData,
    fetchTrendingData,
    fetchHistoryData,
  } = useCoinStore();

  const charts = [
    {
      name: "Trending Coins",
      value: "trending",
      url: "search/trending",
      comp: <DefinedDataTable />,
    },
    {
      name: "Top Coins",
      value: "topcoins",
      url: "coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1",
      comp: <DefinedDataTable />,
    },
    {
      name: "Top Gainers",
      value: "gainers",
      url: "coins/markets?vs_currency=usd&order=market_cap_desc&per_page=500&page=1&price_change_percentage=24h",
      comp: <TopGainersLosersDataTable gainer={true} />,
    },
    {
      name: "Top Losers",
      value: "losers",
      url: "coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&price_change_percentage=24h",

      comp: <TopGainersLosersDataTable gainer={false} />,
    },
    { name: "Most Viewed", value: "most_viewed", comp: <div>Coming Soon</div> },
    {
      name: "Price Change since ATH",
      value: "price_change_ath",
      comp: <div>Coming Soon</div>,
    },
    {
      name: "Historical Lookup",
      value: "historical",
      comp: <HistoricalDataTable />,
    },
  ];

  const handleSelection = (value) => {
    const selected = charts.find((c) => c.value === value);
    if (!selected) return;

    setSelectedChart(selected);

    switch (selected.name) {
      case "Historical Lookup":
        fetchHistoryData(selected.url, selected.value);
        break;

      case "Top Gainers":
      case "Top Losers":
        fetchGainersLosersData(selected.url, selected.value); // Likely the correct function
        break;

      case "Top Coins":
      case "Trending Coins":
        fetchTrendingData(selected.url);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <Dropdown
        value={selectedChart?.value}
        onChange={(e) => handleSelection(e.value)}
        options={charts}
        optionLabel="name"
        optionValue="value"
        placeholder="Select a Chart"
        className="w-full md:w-14rem"
      />
      {selectedChart?.comp}
    </>
  );
}
