import React, { useState, useEffect, useRef } from "react";
import { Chart } from "primereact/chart";
import { useCoinStore } from "../../stores/useCoinStore.jsx";
import { calculateLineChartData } from "../../assets/common/utils.jsx";

export default function StyledLineChart() {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);
  const { data, userFavoritesData, themeColors, chartColors } = useCoinStore();




  useEffect(() => {
    if (!userFavoritesData || userFavoritesData.length === 0) return;

    const colorPalette = [
      chartColors.computedGreen500,
      chartColors.computedBlue500,
      chartColors.computedYellow500,
      chartColors.computedPurple500,
      chartColors.computedOrange500,
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
        fill: false,
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
        datalabels: {
          display: false
        },
        legend: {},
        title: {
          display: true,
          text: 'Stacked Line Chart',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            title: function (tooltipItems) {
              const x = tooltipItems[0].parsed.x;
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
              return labelMap[x] || x;
            },
            footer: function (tooltipItems) {
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
      stacked: false,
      scales: {
        x: {
          type: 'logarithmic',
          reverse: true,
          stacked: false,
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


          stacked: false
        }
      }
    });
  }, [data, userFavoritesData]);

  if (!chartData || !chartOptions) return null;

  return (
    <Chart
      ref={chartRef}
      type="line"
      data={chartData}
      options={chartOptions}
      style={{ width: "95%", height: "20rem" }}
    />
  );
}
