import React, { useState, useEffect } from "react";
import { Chart as ChartJS } from 'chart.js';
import { Chart } from "primereact/chart";
import { useCoinStore } from "../../stores/useCoinStore.jsx";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Skeleton } from "primereact/skeleton";

ChartJS.register(ChartDataLabels);

export default function DoughnutChart() {
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);
  const { userFavoritesData, loading, chartColors } = useCoinStore();

  useEffect(() => {
    if (!userFavoritesData || userFavoritesData.length === 0) return;

    const colorPalette = Object.values(chartColors);
    const labels = userFavoritesData.map((coin) => coin.name);

    const values = userFavoritesData.map(
      (coin) => coin?.userOwned * coin?.marketData?.pricing?.currentPriceUSD
    );

    const baseColors = labels.map((_, index) =>
      colorPalette[index % colorPalette.length]
    );

    const hoverColors = baseColors.map(color => color + "CC");
    const datasets = [
      {
        label: "Portfolio Distribution",
        data: values,
        backgroundColor: baseColors,
        hoverBackgroundColor: hoverColors,
        borderWidth: 1,
      },
    ];

    const totalValue = values.reduce((sum, val) => sum + val, 0);

    setChartData({
      labels,
      datasets,
    });

    setChartOptions({
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Doughnut Chart",
        },
        subtitle: {
          display: true,
          text: `Total Value: $${totalValue.toLocaleString("en-US")}`,
        },
        datalabels: {
          color: "#fff",
          formatter: (value, context) => {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${percentage}%`;
          },
        },
        legend: {
          position: "top",
        },
      },
    });
  }, [userFavoritesData, chartColors]);

  if (!chartData || !chartOptions) {
    return (

      <Skeleton className="flex justify-content-center align-items-center w-12 h-22rem border-round-2xl">
        <p>Loading chart...</p>
      </Skeleton>
    );
  }

  return (
    <Chart
      style={{ display: "flex", justifyContent: "center", width: "inherit", height: "20rem" }}
      type="doughnut"
      data={chartData}
      options={chartOptions}
    />
  );
}
