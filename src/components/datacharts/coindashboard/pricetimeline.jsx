import { useState, useEffect, useMemo, useRef } from "react";
import { Chart } from "primereact/chart";
import { useCoinStore } from "../../../stores/useCoinStore";
import { Skeleton } from "primereact/skeleton";
import { hoverLine } from "./common/generateChartDataset";
import { Tooltip } from 'chart.js';





Tooltip.positioners.offsetBelow = function (elements, eventPosition) {
  const pos = Tooltip.positioners.average(elements);
  if (!pos) return false;

  const chart = elements[0].element.$context.chart;
  const tooltipWidth = chart.tooltip.width || 100;
  const chartWidth = chart.width;

  let adjustedX = pos.x - tooltipWidth / 2;

  if (adjustedX < 10) adjustedX + 140; // Prevent left overflow
  if (adjustedX + tooltipWidth > chartWidth - 150) {
    adjustedX = chartWidth - tooltipWidth + 50; // Prevent right overflow
  }

  return {
    x: adjustedX,
    y: pos.y + 50,
  };
};


import {
  prepareDataset,
  createChartData,
  createChartOptions,
} from "./common/generateChartDataset";


export default function PriceTimeline() {

  const chartRef = useRef(null);
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
    fetchSingleCoinData();
  }, []);


  const chartDataMemo = useMemo(() => {
    if (!singleCoinData?.[selectedDataKey]?.length) return defaultChartData;
    const dataset = prepareDataset(singleCoinData[selectedDataKey]);
    return createChartData(searchCoin, selectedDataKey, dataset);
  }, [singleCoinData, searchCoin, selectedDataKey]);

  const chartOptionsMemo = useMemo(() => {
    console.log(themeColors)
    return createChartOptions(timeline, selectedDataKey, themeColors);
  }, [timeline, selectedDataKey, themeColors]);

  const renderChart = () => (
    <Chart
      onClick={() => console.log(chartOptionsMemo)}
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
      <div className="flex flex-column align-items-center justify-content-center h-full p-0 w-12">
        <div className="flex align-items-center w-3 h-2rem">
          <Skeleton height="70%" />
        </div>

        <div className="flex h-30rem gap-2 w-12">
          <Skeleton height="100%" width="15%" />
          <Skeleton height="100%" width="85%" />
        </div>

        <div className="flex h-3rem m-2 mb-5 w-12">
          <Skeleton height="100%" width="100%" />
        </div>
      </div>
    );
  }

  return <>{renderChart()}</>;
}
