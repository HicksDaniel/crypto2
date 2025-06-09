import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { useCoinStore } from "../../stores/useCoinStore.jsx";
import { calculatePercentageChange } from "../../assets/common/utils.jsx";

export default function CompoundLineChart() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const { data, userCoins } = useCoinStore();

  const userFavoritesArray = ["bitcoin", "ethereum", "dogecoin"];

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const colorPalette = [
      documentStyle.getPropertyValue("--green-500"),
      documentStyle.getPropertyValue("--blue-500"),
      documentStyle.getPropertyValue("--yellow-500"),
      documentStyle.getPropertyValue("--purple-500"),
      documentStyle.getPropertyValue("--orange-500"),
    ];

    const labels = [0, 0.15, 1, 7, 14, 30, 60, 200, 365];

    let cumulativeData = new Array(labels.length).fill(0);

    const datasets = userFavoritesArray
      .map((favoriteName, index) => {
        const marketCoin = data.find(
          (coin) => coin.name.toLowerCase() === favoriteName
        );
        const userCoin = userCoins.find(
          (coin) => coin.name.toLowerCase() === favoriteName
        );

        if (!marketCoin || !userCoin) return null;

        const percentageChangeData = calculatePercentageChange(
          marketCoin.marketData?.pricing,
          userCoin.owned
        );

        cumulativeData = cumulativeData.map(
          (val, i) => val + percentageChangeData[i]
        );

        return {
          label: marketCoin.name,
          data: [...cumulativeData],
          fill: true,
          tension: 0.4,
          backgroundColor: colorPalette[index % colorPalette.length],
        };
      })
      .filter(Boolean); // remove nulls

    setChartData({
      labels,
      datasets,
    });

    setChartOptions({
      maintainAspectRatio: false,
      aspectRatio: 1,
      plugins: {
        legend: {},
      },
      scales: {
        x: {
          afterTickToLabelConversion: (ctx) => {
            ctx.ticks = [];
            ctx.ticks.push({ value: 0, label: "Current" });
            ctx.ticks.push({ value: 0.15, label: "1h" });
            ctx.ticks.push({ value: 1, label: "24h" });
            ctx.ticks.push({ value: 7, label: "7 Days" });
            ctx.ticks.push({ value: 14, label: "14 Days" });
            ctx.ticks.push({ value: 30, label: "30 Days" });
            ctx.ticks.push({ value: 60, label: "60 Days" });
            ctx.ticks.push({ value: 200, label: "200 Days" });
            ctx.ticks.push({ value: 365, label: "1 year" });
          },
          reverse: true,
          type: "logarithmic",
        },
        y: {},
      },
    });
  }, [data, userCoins]);

  return (
    <Chart
      style={{ display: "flex", width: "95%", height: "20rem" }}
      type="line"
      data={chartData}
      options={chartOptions}
    />
  );
}
