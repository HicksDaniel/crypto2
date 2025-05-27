import React from "react";
import { Button } from "primereact/button";
import { ButtonGroup } from "primereact/buttongroup";
import { useCoinStore } from "../../../stores/useCoinStore";
import {
  dataViewButtons,
  timeChangeButtons,
} from "../../../assets/common/utils";
import { commonButtonStyles } from "../../../assets/common/passthroughStyles";

export function ButtonGroupsNav() {
  const timeLine = useCoinStore((state) => state.timeLine);
  const updateTimeLine = useCoinStore((state) => state.updateTimeLine);
  const selectedDataKey = useCoinStore((state) => state.selectedDataKey);
  const updateDataKey = useCoinStore((state) => state.updateDataKey);

  const handleTimeChange = (value) => {
    if (value === timeLine) return;
    updateTimeLine(value);
  };

  const handleDataViewChange = (value) => {
    if (value === selectedDataKey) return;
    updateDataKey(value);
  };
  return (
    <div className="flex w-12 justify-content-center gap-1">
      <ButtonGroup className="w-5">
        {dataViewButtons.map((btn, index) => (
          <Button
            key={btn.label + index}
            onClick={() => handleDataViewChange(btn.value)}
            disabled={btn.disabbled}
            style={{
              width: btn.width,

              ...commonButtonStyles,
              backgroundColor:
                selectedDataKey === btn.value ? "#007ad9" : undefined,
              color: selectedDataKey === btn.value ? "white" : undefined,
            }}
            label={btn.label}
          />
        ))}
      </ButtonGroup>
      <ButtonGroup className="w-2">
        <Button
          key="L"
          style={{ width: "30px", ...commonButtonStyles }}
          label="L"
          disabled
          tooltip="Coming soon"
        />
        <Button
          key="T"
          style={{ width: "30px", ...commonButtonStyles }}
          label="T"
          disabled
          tooltip="Coming soon"
        />
      </ButtonGroup>

      <ButtonGroup className="w-5">
        {timeChangeButtons.map((btn) => (
          <Button
            key={btn.value}
            disabled={btn.disabled}
            onClick={() => handleTimeChange(btn.value)}
            style={{
              width: btn.width,
              ...commonButtonStyles,
              backgroundColor: timeLine === btn.value ? "#007ad9" : undefined,
              color: timeLine === btn.value ? "white" : undefined,
            }}
            label={btn.label}
          />
        ))}
      </ButtonGroup>
    </div>
  );
}
