import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { useCoinStore } from "../../stores/useCoinStore";

export default function DoughnutChart() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const { data, userCoins, loading, error, fetchData } = useCoinStore();

  const bitcoin = data.find((c) => c.name === "Bitcoin");
  const ethereum = data.find((c) => c.name === "Ethereum");
  const dogecoin = data.find((c) => c.name === "Dogecoin");
  const userBitcoin = userCoins.find((c) => c.name === "bitcoin");
  const userEthereum = userCoins.find((c) => c.name === "ethereum");
  const userDogecoin = userCoins.find((c) => c.name === "dogecoin");

  const hasData = bitcoin && ethereum && dogecoin;

  const handleClick = () => {
    console.log(userCoins);
  };

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const data = {
      labels: [ethereum?.name, dogecoin?.name, bitcoin?.name],
      datasets: [
        {
          data: [
            userEthereum.owned * ethereum?.marketData?.pricing.currentPrice,
            userDogecoin.owned * dogecoin?.marketData?.pricing.currentPrice,
            userBitcoin.owned * bitcoin?.marketData?.pricing.currentPrice,
          ],
          backgroundColor: [
            documentStyle.getPropertyValue("--blue-500"),
            documentStyle.getPropertyValue("--yellow-500"),
            documentStyle.getPropertyValue("--green-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--blue-400"),
            documentStyle.getPropertyValue("--yellow-400"),
            documentStyle.getPropertyValue("--green-400"),
          ],
        },
      ],
    };
    const options = {
      plugins: {
        legend: {

        },
      },
      cutout: "50%",
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="flex justify-content-center w-full">
      {!loading && hasData && (
        <Chart style={{ display: "flex", justifyContent: "between", width: "20rem", height: "20rem" }} type="doughnut" data={chartData} options={chartOptions} />
      )}
    </div>
  );
}
