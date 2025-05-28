import React, { useState, useEffect } from "react";
import { SelectButton } from "primereact/selectbutton";
import { useCoinStore } from "../../../stores/useCoinStore.jsx";
import DoughnutChart from "../../datacharts/doughnutchart";

export default function ChartSelector() {
  const { chartButtonList, updateVisibleCharts, chartList, updateChartList } =
    useCoinStore();
  const [value, setValue] = useState(null);
  const items = [...chartButtonList];

  useEffect(() => {
    if (chartList === null) return;
    const res = chartList.map((id) =>
      chartButtonList.find((item) => item.value === id)
    );

    setValue(chartList);
    updateVisibleCharts(res);
  }, [value]);

  async function handleChange(data) {
    const value = await updateChartList(data);
    setValue(value);
  }

  return (
    <div className="card flex justify-content-center">
      <SelectButton
        value={value}
        onChange={(e) => handleChange(e.value)}
        optionLabel="name"
        options={items}
        multiple
      />
    </div>
  );
}
