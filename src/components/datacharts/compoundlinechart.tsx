import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { useCoinStore } from "../../stores/useCoinStore.jsx";
import { calculateLineChartData } from "../../assets/common/utils.jsx";

export default function CompoundLineChart() {
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);
  const { data, userFavoritesData } = useCoinStore();

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

    const labels = [0.001, 0.15, 1, 7, 14, 30, 60, 200, 365];

    const datasets = userFavoritesData.map((marketCoin, index) => {
      const yValues = calculateLineChartData(
        marketCoin?.marketData?.pricing,
        marketCoin?.userOwned
      );


      const data = labels.map((x, i) => ({
        x,
        y: yValues[i] || 0,
      }));

      return {
        label: marketCoin?.name,
        data,
        fill: true,
        tension: 0.4,
        backgroundColor: colorPalette[index % colorPalette.length],
        borderColor: colorPalette[index % colorPalette.length],
        stack: "stack1",
      };
    });

    setChartData({ labels, datasets });

    setChartOptions({
      maintainAspectRatio: false,
      responsive: true,
      aspectRatio: 1,
      plugins: {
        legend: {},
        title: {
          display: true,
          text: 'Stacked Line Chart',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            footer: (tooltipItems) => {
              const total = tooltipItems.reduce((sum, item) => sum + item.parsed.y, 0);
              return `Total: ${total.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
            }
          }
        }
      },
      interaction: {
        mode: 'index',
        intersect: false,
      },
      stacked: true,
      scales: {
        x: {
          type: 'logarithmic',
          reverse: true,
          stacked: true,
          min: 0.001,
          max: 365,
          ticks: {
            autoSkip: false,
            maxRotation: 60,
            minRotation: 20,
            stepSize: 1,
            callback: function (value) {
              const labelMap = {
                0.001: 'Current',
                0.15: '1h',
                1: '24h',
                7: '7 Days',
                14: '14 Days',
                30: '30 Days',
                60: '60 Days',
                200: '200 Days',
                365: '1 Year',
              };
              return labelMap[value] || '';
            }
          }
        },
        y: {


          stacked: true
        }
      }
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
