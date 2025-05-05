
import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';


export default function MenuSideBar({ width }) {
    const [visibleLeft, setVisibleLeft] = useState(false);
    const [visibleRight, setVisibleRight] = useState(false);

    const buttonFormat = ((direction, position) => {
        const updatedStyles = {
            background: `linear-gradient(to ${direction}, transparent 31%, var(--primary-color) 85%)`,
            width: "100%",
            justifyContent: `flex-${position}`
        }
        return updatedStyles
    }

    )
    return (
        <div className="flex absolute w-full h-full justify-content-between" >
            <div className="flex w-4rem">
                <Button style={{ ...buttonFormat("left", "start") }} icon="pi pi-arrow-right" onMouseEnter={() => setVisibleLeft(true)} />
            </div>
            <div className="flex w-4rem">
                <Button style={{ ...buttonFormat("right", "end") }} icon="pi pi-arrow-left" onMouseEnter={() => setVisibleRight(true)} />
            </div>


            <Sidebar style={{ width: `${width} ` }} visible={visibleLeft} position="left" onMouseLeave={() => setVisibleLeft(false)} onHide={() => setVisibleLeft(false)}>
                <h2>Left Sidebar</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </Sidebar>

            <Sidebar style={{ width: `${width} ` }} visible={visibleRight} position="right" onMouseLeave={() => setVisibleRight(false)} onHide={() => setVisibleRight(false)}>
                <h2>Right Sidebar</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </Sidebar>


        </div>
    )
}
