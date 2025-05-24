
import { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { useCoinStore } from "../../../stores/useCoinStore";
import { enUS } from 'date-fns/locale';
import 'chartjs-adapter-date-fns';


export default function PriceTimeline() {

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});


    const { singleCoinData, searchCoin, timeLine, loading, error, fetchSingleCoinData } = useCoinStore();



    useEffect(() => {
        if (!singleCoinData?.prices?.length) return;


        const documentStyle = getComputedStyle(document.documentElement);
        const timeStamps = singleCoinData?.prices?.map(item => new Date(item[0]));
        const prices = singleCoinData?.prices?.map(item => item[1]);

        let stepTimer = 'day';
        if (timeLine === '1') stepTimer = 'hour';
        else if (timeLine === '7') stepTimer = 'day';
        else if (timeLine === '30') stepTimer = 'week';
        else if (timeLine === '365' || timeLine === 'max') stepTimer = 'month';


        const data = {
            labels: timeStamps,
            datasets: [
                {
                    label: `${searchCoin} Price (USD)`,
                    data: prices,
                    fill: true,
                    tension: 0.4,
                    borderColor: documentStyle.getPropertyValue("--green-500"),
                },

            ],
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: .5,
            responsive: true,
            plugins: {
                legend: {

                },
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: stepTimer,
                        tooltipFormat: 'PPpp'
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
    }, [searchCoin, timeLine]);

    return (
        <>
            <button onClick={() => console.log(singleCoinData, searchCoin)}>click here</button>
            <Chart
                style={{ display: "flex", justifySelf: "center", width: "95%", height: "50%" }}
                className=""
                type="line"
                data={chartData}
                options={chartOptions}
            />
        </>

    );
}