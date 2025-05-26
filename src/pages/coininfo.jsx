import React from 'react';
import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';
import PriceTimeline from '../components/datacharts/coinDashboard/pricetimeline';
import { useCoinStore } from '../stores/useCoinStore';
import { dataViewButtons, timeChangeButtons } from '../assets/common/utils';
import { commonButtonStyles } from '../assets/common/passthroughStyles';
import { ChangeOverTime } from '../components/datacharts/coindashboard/changeovertime';

export default function CoinInfo() {
    const timeLine = useCoinStore(state => state.timeLine);
    const updateTimeLine = useCoinStore(state => state.updateTimeLine);
    const selectedDataKey = useCoinStore(state => state.selectedDataKey);
    const updateDataKey = useCoinStore(state => state.updateDataKey);

    const handleTimeChange = (value) => {
        if (value === timeLine) return;
        updateTimeLine(value);
    };

    const handleDataViewChange = (value) => {
        if (value === selectedDataKey) return;
        updateDataKey(value);
    };



    return (
        <div className="flex w-12 h-full" style={{ background: "rgba(90,90,90,0.2)" }}>
            <div className="p-2 w-4">
                <h1>test</h1>
            </div>

            <div className="flex flex-column align-items-center p-2 w-8 h-full">
                <div className="flex w-6 justify-content-center gap-1">
                    <ButtonGroup className="w-5">
                        {dataViewButtons.map((btn, index) => (
                            <Button
                                key={btn.label + index}
                                onClick={() => handleDataViewChange(btn.value)}
                                disabled={btn.disabbled}
                                style={{
                                    width: btn.width,

                                    ...commonButtonStyles,
                                    backgroundColor: selectedDataKey === btn.value ? "#007ad9" : undefined,
                                    color: selectedDataKey === btn.value ? "white" : undefined,
                                }}
                                label={btn.label}
                            />
                        ))}
                    </ButtonGroup>
                    <ButtonGroup className="w-2">
                        <Button key="L" style={{ width: "30px", ...commonButtonStyles }} label="L" disabled tooltip="Coming soon" />
                        <Button key="T" style={{ width: "30px", ...commonButtonStyles }} label="T" disabled tooltip="Coming soon" />
                    </ButtonGroup>

                    <ButtonGroup className="w-5">
                        {timeChangeButtons.map(btn => (
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

                <div className="flex w-12 h-full" >
                    <PriceTimeline />
                </div>

                <div className="flex justify-content-center w-12 h-20rem">
                    <ChangeOverTime />
                </div>
            </div>
        </div>
    );
}