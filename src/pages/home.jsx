import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { useCoinStore } from "../stores/useCoinStore";
import { Skeleton } from "primereact/skeleton";
import { DisplayCharts } from "../assets/common/utils";

export default function Home() {
  const [selectedChart, setSelectedChart] = useState(null);
  const {
    fetchTopsGainersLosersData,
    fetchTrendingData,
    fetchHistoryData,
    loading,
  } = useCoinStore();

  useEffect(() => {
    if (!selectedChart && DisplayCharts.length > 0) {
      handleSelection(DisplayCharts[0].value);
    }
  }, []);


  const handleSelection = (value) => {
    const selected = DisplayCharts.find((c) => c.value === value);
    if (!selected) return;

 

    setSelectedChart(selected);

    switch (selected.name) {
      case "Historical Lookup":
        fetchHistoryData(selected.url, selected.value);
        break;

      case "Top Gainers":
      case "Top Losers":
      case "Top Coins":
        fetchTopsGainersLosersData(selected.url, selected.value);
        break;

      case "Trending Coins":
        fetchTrendingData(selected.url);
        break;

      default:
        break;
    }
  };

  const SelectedComponent = selectedChart?.component;
  const componentProps = selectedChart?.props || {};

  return (
    <>
      <Dropdown
        value={selectedChart?.value}
        onChange={(e) => handleSelection(e.value)}
        options={DisplayCharts}
        optionLabel="name"
        optionValue="value"
        placeholder="Select a Chart"
        className="w-full md:w-14rem"
      />

      {loading ? (
        <div
          style={{ height: "800px", borderRadius: "20px" }}
          className="flex w-10 border-rounded-3xl align-items-center"
        >
          <Skeleton height="100%" />
        </div>
      ) : (
        SelectedComponent && <SelectedComponent {...componentProps} />
      )}
    </>
  );
}
