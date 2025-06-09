import React, { useState, useEffect, useRef } from "react";
import { Chart } from "primereact/chart";
import { useCoinStore } from "../../stores/useCoinStore.jsx";

export default function StyledLineChart() {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);
  const { data, userCoins } = useCoinStore();

  const bitcoin = data.find((c) => c.name === "Bitcoin");
  const ethereum = data.find((c) => c.name === "Ethereum");
  const dogecoin = data.find((c) => c.name === "Dogecoin");

  const userBitcoin = userCoins.find((c) => c.name === "bitcoin");
  const userEthereum = userCoins.find((c) => c.name === "ethereum");
  const userDogecoin = userCoins.find((c) => c.name === "dogecoin");

  const calculatePercentageChange = (coinData, userData) => {
    const currentPrice = coinData?.currentPrice;

    return [
      userData * currentPrice,
      (userData * currentPrice) / (1 + coinData?.pcp_1h / 100),
      (userData * currentPrice) / (1 + coinData?.pcp_24h / 100),
      (userData * currentPrice) / (1 + coinData?.pcp_7day / 100),
      (userData * currentPrice) / (1 + coinData?.pcp_14day / 100),
      (userData * currentPrice) / (1 + coinData?.pcp_30day / 100),
      (userData * currentPrice) / (1 + coinData?.pcp_60day / 100),
      (userData * currentPrice) / (1 + coinData?.pcp_200day / 100),
      (userData * currentPrice) / (1 + coinData?.pcp_1year / 100),
    ];
  };

  useEffect(() => {
    if (
      !bitcoin ||
      !ethereum ||
      !dogecoin ||
      !userBitcoin ||
      !userEthereum ||
      !userDogecoin
    ) {
      return;
    }

    const documentStyle = getComputedStyle(document.documentElement);

    const data = {
      labels: [0, 0.15, 1, 7, 14, 30, 60, 200, 365],
      datasets: [
        {
          label: bitcoin.name,
          data: calculatePercentageChange(
            bitcoin.marketData?.pricing,
            userBitcoin.owned
          ),
          fill: false,
          tension: 0.4,
          borderColor: documentStyle.getPropertyValue("--green-500"),
        },
        {
          label: ethereum.name,
          data: calculatePercentageChange(
            ethereum.marketData?.pricing,
            userEthereum.owned
          ),
          fill: false,
          borderDash: [2, 5],
          tension: 0.4,
          borderColor: documentStyle.getPropertyValue("--blue-500"),
        },
        {
          label: dogecoin.name,
          data: calculatePercentageChange(
            dogecoin.marketData?.pricing,
            userDogecoin.owned
          ),
          fill: false,
          tension: 0.4,
          borderColor: documentStyle.getPropertyValue("--yellow-500"),
        },
      ],
    };

    const options = {
      maintainAspectRatio: false,
      aspectRatio: 1,
      responsive: true,
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
    };

    setChartData(data);
    setChartOptions(options);

    // ✅ Proper cleanup
    return () => {
      if (
        chartRef.current?.chart &&
        typeof chartRef.current.chart.destroy === "function"
      ) {
        chartRef.current.chart.destroy();
      }
    };
  }, [data, userCoins]);

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
