import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { useCoinStore } from "../../stores/useCoinStore.jsx";
import { calculatePercentageChange } from "../../assets/common/utils.jsx";

export default function CompoundLineChart() {
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);
  const { data, userFavoritesData } = useCoinStore();

  useEffect(() => {

    console.log("data", data);
    console.log("userFavoritesData", userFavoritesData);

    if (!data || data.length === 0 || !userFavoritesData || userFavoritesData.length === 0) return;

    const documentStyle = getComputedStyle(document.documentElement);
    const colorPalette = [
      documentStyle.getPropertyValue("--green-500"),
      documentStyle.getPropertyValue("--blue-500"),
      documentStyle.getPropertyValue("--yellow-500"),
      documentStyle.getPropertyValue("--purple-500"),
      documentStyle.getPropertyValue("--orange-500"),
    ];

    const labels = [0, 0.15, 1, 7, 14, 30, 60, 200, 365];

    const datasets = userFavoritesData
      .map((marketCoin, index) => {
        const percentageChangeData = calculatePercentageChange(
          marketCoin?.marketData?.pricing
        );



        return {
          key: marketCoin?.name + index,
          label: marketCoin?.name,
          data: percentageChangeData,
          fill: true,
          tension: 0.4,
          backgroundColor: colorPalette[index % colorPalette.length],
          borderColor: colorPalette[index % colorPalette.length],
        };
      })
      .filter(Boolean);



    setChartData({ labels, datasets });

    setChartOptions({
      maintainAspectRatio: false,
      responsive: true,
      aspectRatio: 1,
      plugins: {
        legend: {},
      },
      scales: {
        x: {
          type: "logarithmic",
          reverse: true,
          ticks: {
            callback: (value) => {
              const labelMap = {
                0: "Current",
                0.15: "1h",
                1: "24h",
                7: "7 Days",
                14: "14 Days",
                30: "30 Days",
                60: "60 Days",
                200: "200 Days",
                365: "1 Year",
              };
              return labelMap[value] || value;
            },
          },
        },
        y: {},
      },
    });
  }, [data, userFavoritesData]);

  if (!chartData || !chartOptions) {
    return (
      <div style={{ display: "flex", height: "20rem", justifyContent: "center", alignItems: "center" }}>
        <p>Loading chart...</p>
      </div>
    );
  }

  return (
    <Chart
      style={{ display: "flex", width: "95%", height: "20rem" }}
      type="line"
      data={chartData}
      options={chartOptions}
    />
  );
}