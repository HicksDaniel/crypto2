
import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { useCoinStore } from "../stores/useCoinStore";
import { enUS } from 'date-fns/locale';

import 'chartjs-adapter-date-fns';


const FETCH_HEADER = {
    accept: "application/json",
    "x-cg-demo-api-key": "CG-c7WmWDGxgBsFBma9zh72TkTC",
};

export default function CoinInfo() {

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    const { singleCoinData, searchCoin, loading, error, fetchSingleCoinData } = useCoinStore();




    const selectedCoin = searchCoin;









    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const timeStamps = singleCoinData?.prices?.map(item => new Date(item[0]));
        const prices = singleCoinData?.prices?.map(item => item[1]);

        const data = {
            labels: timeStamps,
            datasets: [
                {
                    label: `${selectedCoin} Price (USD)`,
                    data: prices,
                    fill: true,
                    tension: 0.4,
                    borderColor: documentStyle.getPropertyValue("--green-500"),
                },

            ],
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 2,
            responsive: true,
            plugins: {
                legend: {

                },
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'minute',
                        stepSize: 5,
                        tooltipFormat: 'HH:mm'
                    },
                    adapters: {
                        date: {
                            locale: enUS,
                        },
                    },
                    title: {
                        display: true,
                        text: 'Time'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Price (USD)'
                    }
                }
            },
        };

        setChartData(data);
        setChartOptions(options);
    }, [singleCoinData, searchCoin]);

    useEffect(() => {
        fetchSingleCoinData();
    }, [searchCoin]);

    return (
        <>
            <button onClick={() => console.log(singleCoinData, searchCoin)}>click here</button>
            <Chart
                style={{ display: "flex", justifySelf: "center", width: "95%", height: "50rem" }}
                className=""
                type="line"
                data={chartData}
                options={chartOptions}
            />
        </>

    );
}
