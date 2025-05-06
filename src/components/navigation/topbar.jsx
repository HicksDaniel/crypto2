import React, { useState, useContext, useEffect } from 'react';

import { Menubar } from 'primereact/menubar';
import { PrimeReactContext } from "primereact/api";

import { menuBarStyling } from './common/topbar/menubarstyling';
import { topbarMenuItems } from './common/topbar/topbarMenuItems';
import { StartItem } from './common/topbar/startItem';
import { EndItem } from './common/topbar/endItem';

export default function MenuTopBar({ height }) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { changeTheme } = useContext(PrimeReactContext);

    const handleClick = () => {
        const nextMode = !isDarkMode;
        setIsDarkMode(nextMode);
        updateTheme();
    };

    const updateTheme = () => {
        if (!changeTheme) return;

        if (isDarkMode) {
            changeTheme("md-dark-deeppurple", "md-light-deeppurple", "theme-link");
        } else {
            changeTheme("md-light-deeppurple", "md-dark-deeppurple", "theme-link");
        }
    };

    return (
        <div className="flex w-9" style={{ height: `${height}`, position: "absolute", boxShadow: "0px 10px 50px 0px rgba(120,120,120,.5)" }}>
            <Menubar style={{ fontWeight: "300" }}
                pt={menuBarStyling}
                model={topbarMenuItems}
                start={<StartItem handleClick={handleClick} />}
                end={<EndItem />} />
        </div >
    )
}
