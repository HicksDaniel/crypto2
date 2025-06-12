import { useState, useEffect, useMemo, useRef } from "react";
import { Chart } from "primereact/chart";
import { useCoinStore } from "../../stores/useCoinStore";
import { hoverLine } from "../../assets/common/chartUtils";
import { priceTimeLineSkeleton } from "../../assets/common/utils";
import { positionerLogic } from "../../assets/common/chartUtils";
import { prepareDataset, createChartData, createChartOptions } from "./coindashboard/common/generateChartDataset";

export default function PriceTimeline() {

  const chartRef = useRef(positionerLogic);
  const {
    singleCoinData,
    searchCoin,
    timeline,
    loading,
    error,
    fetchSingleCoinData,
    themeColors,
    defaultChartData,
    selectedDataKey,
  } = useCoinStore();

  useEffect(() => {
    fetchSingleCoinData(); // <------- THIS IS HERE SO WHEN I CTRL+S it will re-render the chart.
  }, []);


  const chartDataMemo = useMemo(() => {
    if (!singleCoinData?.[selectedDataKey]?.length) return defaultChartData;
    const dataset = prepareDataset(singleCoinData[selectedDataKey]);
    return createChartData(searchCoin, selectedDataKey, dataset);
  }, [singleCoinData, searchCoin, selectedDataKey]);

  const chartOptionsMemo = useMemo(() => {
    return createChartOptions(timeline, selectedDataKey, themeColors);
  }, [timeline, selectedDataKey, themeColors]);

  const renderChart = () => (
    <Chart
      ref={chartRef}
      className="w-12"
      key={selectedDataKey}
      type="line"
      data={chartDataMemo}
      plugins={[hoverLine]}
      options={chartOptionsMemo}
    />
  );
  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }
  if (loading) {
    return (
      priceTimeLineSkeleton()
    );
  }

  return <>{renderChart()}</>;
}
