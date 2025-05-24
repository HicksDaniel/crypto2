import React from 'react';
import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';
import PriceTimeline from '../components/datacharts/coinDashboard/pricetimeline';
import { useCoinStore } from '../stores/useCoinStore';


const commonButtonStyles = {
    fontSize: ".75rem",
    minWidth: "0",
    padding: "0",
    height: "30px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
}



export default function CoinInfo() {
    const { updateTimeLine } =
        useCoinStore();

    const handleClick = (value) => {
        updateTimeLine(value)
    }

    return (
        <div style={{ display: "flex", width: "1280px", background: "rgba(90,90,90,0.2)" }}>
            <div style={{ padding: "10px", width: "40%" }}>
                <h1>test</h1>
            </div>

            <div style={{ padding: "10px", width: "60%", background: "rgba(90,90,90,0.5)" }}>
                <div style={{ display: "flex", width: "100%", justifyContent: "space-evenly", gap: "1rem" }}>

                    <ButtonGroup
                        pt={{
                            root: {
                                className: 'my-custom-button-group',
                                style: { display: "flex", padding: "0px", margin: "0px", width: "275px", borderRadius: '8px' }
                            }
                        }}
                    >
                        <Button style={{
                            width: "55px",
                            ...commonButtonStyles
                        }} label="Price" />
                        <Button style={{
                            width: "110px",
                            ...commonButtonStyles
                        }} label="Market Cap" />
                        <Button style={{
                            width: "110px",
                            ...commonButtonStyles
                        }} label="TradingView" />
                    </ButtonGroup>

                    <ButtonGroup
                        pt={{
                            root: {
                                className: 'my-custom-button-group',
                                style: { display: "flex", width: "10%" }
                            }
                        }}
                    >
                        <Button style={{
                            width: "30px",
                            ...commonButtonStyles
                        }} label="L" disabled tooltip="Coming soon" />
                        <Button style={{
                            width: "30px",
                            ...commonButtonStyles
                        }} label="T" disabled tooltip="Coming soon" />
                    </ButtonGroup>

                    <ButtonGroup
                        pt={{
                            root: {
                                className: 'my-custom-button-group',
                                style: { width: "55%", borderRadius: '8px' }
                            }
                        }}
                    >
                        <Button style={{
                            width: "35px",
                            ...commonButtonStyles
                        }} onClick={() => handleClick("1")} label="24h" />
                        <Button style={{
                            width: "30px",
                            ...commonButtonStyles
                        }} onClick={() => handleClick("7")} label="7d" />
                        <Button style={{
                            width: "30px",
                            ...commonButtonStyles
                        }} onClick={() => handleClick("30")} label="1m" />
                        <Button style={{
                            width: "30px",
                            ...commonButtonStyles
                        }} onClick={() => handleClick("90")} label="3m" />
                        <Button style={{
                            width: "30px",
                            ...commonButtonStyles
                        }} onClick={() => handleClick("365")} label="1y" />
                        <Button style={{
                            width: "40px",
                            ...commonButtonStyles
                        }} onClick={() => handleClick("max")} label="Max" />
                        <Button style={{
                            width: "40px",
                            ...commonButtonStyles
                        }} label="LOG" />
                        <Button style={{
                            width: "40px",
                            ...commonButtonStyles
                        }} label="tbd" disabled tooltip="Coming soon" />
                        <Button style={{
                            width: "40px",
                            ...commonButtonStyles
                        }} label="tbd" disabled tooltip="Coming soon" />
                        <Button style={{
                            width: "40px",
                            ...commonButtonStyles
                        }} label="tbd" disabled tooltip="Coming soon" />
                    </ButtonGroup>
                </div>

                <div>
                    <PriceTimeline />
                </div>

                <div>
                    <h2>PlaceHolder</h2>
                </div>
            </div>
        </div>
    );
}
