import React, { useState } from "react";
import { SelectButton } from "primereact/selectbutton";
import { useCoinStore } from "../../../stores/useCoinStore.jsx";

export default function ChartSelector() {
  const { chartButtonList, updateVisibleCharts, chartList, updateChartList } = useCoinStore();
  const [value, setValue] = useState(chartList);

  const items = [...chartButtonList];

  const handleChange = (selectedValues) => {
    setValue(selectedValues);
    updateChartList(selectedValues);

    const res = selectedValues.map((id) =>
      chartButtonList.find((item) => item.value === id)
    );

    updateVisibleCharts(res);
  };

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