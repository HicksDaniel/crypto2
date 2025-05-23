
import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { useCoinStore } from "../stores/useCoinStore";


const FETCH_HEADER = {
    accept: "application/json",
    "x-cg-demo-api-key": "CG-c7WmWDGxgBsFBma9zh72TkTC",
};

export default function CoinInfo() {

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const { data, userCoins, loading, error, fetchData } = useCoinStore();



    const selectedCoin = data

    const get24hCoinData = async () => {
        try {
            const response = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1",
                {
                    method: "GET",
                    headers: FETCH_HEADER,
                },
            );
            const data = await response.json()
            console.log("data", data)
            return data;
        } catch {
            console.error("Error fetching 24h data:", error)
        }
    }


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
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue("--text-color");
        const textColorSecondary = documentStyle.getPropertyValue(
            "--text-color-secondary"
        );
        const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
        const data = {
            labels: [0, 0.15, 1, 7, 14, 30, 60, 200, 365],
            datasets: [
                {
                    label: selectedCoin?.name,
                    data: calculatePercentageChange(
                        selectedCoin.marketData?.pricing, 1
                    ),
                    fill: false,
                    tension: 0.4,
                    borderColor: documentStyle.getPropertyValue("--green-500"),
                },

            ],
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 1,
            responsive: true,
            plugins: {
                legend: {

                },
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

                    // ticks: {
                    //   color: textColorSecondary,
                    // },
                    // grid: {
                    //   color: surfaceBorder,
                    // },
                },
                y: {
                    // ticks: {
                    //   color: textColorSecondary,
                    // },
                    // grid: {
                    //   color: surfaceBorder,
                    // },
                },
            },
        };

        setChartData(data);
        setChartOptions(options);
    }, [data]);

    return (
        <>
            <button onClick={() => console.log(get24hCoinData())}>click here</button>
            <Chart
                style={{ display: "flex", justifySelf: "center", width: "95%", height: "20rem" }}

                className=""
                type="line"
                data={chartData}
                options={chartOptions}
            />
        </>

    );
}
