import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { useCoinStore } from "../../stores/useCoinStore.jsx";

export default function DoughnutChart() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const { userFavoritesData, loading } = useCoinStore();

  useEffect(() => {
    if (!userFavoritesData || userFavoritesData.length === 0) return;

    const documentStyle = getComputedStyle(document.documentElement);
    const colorPalette = [
      documentStyle.getPropertyValue("--green-500"),
      documentStyle.getPropertyValue("--blue-500"),
      documentStyle.getPropertyValue("--yellow-500"),
      documentStyle.getPropertyValue("--purple-500"),
      documentStyle.getPropertyValue("--orange-500"),
    ];

    const labels = userFavoritesData.map((coin) => coin.name);
    const values = userFavoritesData.map(
      (coin) => coin.userOwned * coin.marketData.currentPrice
    );

    setChartData({
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: colorPalette.slice(0, values.length),
          hoverBackgroundColor: colorPalette.slice(0, values.length),
        },
      ],
    });

    setChartOptions({
      plugins: {
        legend: {
          position: "right",
        },
      },
    });
  }, [userFavoritesData]);

  return (
    <>
      {!loading && (
        <Chart
          style={{
            display: "flex",
            justifyContent: "center",
            width: "inherit",
            height: "20rem",
          }}
          type="doughnut"
          data={chartData}
          options={chartOptions}
        />
      )}
    </>
  );
}
