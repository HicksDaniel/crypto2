
import React, { useState, useEffect } from "react";
import { SelectButton } from 'primereact/selectbutton';
import { useCoinStore } from "../../../stores/useCoinStore";
import DoughnutChart from "../../datacharts/doughnutchart";

export default function ChartSelector() {
    const { data, loading, error, fetchData, chartButtonList, updateVisibleCharts,
        chartList, updateChartList, } = useCoinStore();
    const [value, setValue] = useState(null);
    const [currentArray, setCurrentArray] = useState(null)
    const items = [
        ...chartButtonList
    ];

    useEffect(() => {
        if (chartList === null) return;
        // console.log("chart list", chartList)
        const res = chartList.map((id => chartButtonList.find(item => item.value === id)))
        console.log("list of charts and data", res)
        setValue(chartList)
        updateVisibleCharts(res)
    }, [value])

    async function handleChange(data) {
        const value = await updateChartList(data)
        setValue(value)




    }

    // const onthisclick = () => {
    //     console.log(value)
    // }
    return (
        <div className="card flex justify-content-center">
            <SelectButton value={value} onChange={(e) => handleChange(e.value)} optionLabel="name" options={items} multiple />
            {/* <button onClick={onthisclick} /> */}
        </div>
    );
}
