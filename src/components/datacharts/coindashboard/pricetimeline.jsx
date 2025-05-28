import { useState, useEffect, useMemo } from "react";
import { Chart } from "primereact/chart";
import { useCoinStore } from "../../../stores/useCoinStore";
import { Skeleton } from "primereact/skeleton";

import {
  DEFAULT_CHART_DATA,
  prepareDataset,
  createChartData,
  createChartOptions,
} from "./common/generateChartDataset";

export default function PriceTimeline() {
  const singleCoinData = useCoinStore((state) => state.singleCoinData);
  const searchCoin = useCoinStore((state) => state.searchCoin);
  const timeline = useCoinStore((state) => state.timeline);
  const loading = useCoinStore((state) => state.loading);
  const error = useCoinStore((state) => state.error);
  const selectedDataKey = useCoinStore((state) => state.selectedDataKey);

  const chartDataMemo = useMemo(() => {
    if (!singleCoinData?.[selectedDataKey]?.length) return DEFAULT_CHART_DATA;
    const dataset = prepareDataset(singleCoinData[selectedDataKey]);
    return createChartData(searchCoin, selectedDataKey, dataset);
  }, [singleCoinData, searchCoin, selectedDataKey]);

  const chartOptionsMemo = useMemo(() => {
    return createChartOptions(timeline, selectedDataKey);
  }, [timeline, selectedDataKey]);

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
  return (
    <Chart
      className=" w-12"
      key={`${selectedDataKey}`}
      type="line"
      data={chartDataMemo}
      options={chartOptionsMemo}
    />
  );
}
