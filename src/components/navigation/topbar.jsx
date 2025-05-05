
import React, { useState, useContext, useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { PrimeReactContext } from "primereact/api";

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

    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home'
        },
        {
            label: 'Features',
            icon: 'pi pi-star'
        },

        {
            label: 'Contact',
            icon: 'pi pi-envelope',
            badge: 3,
            template: itemRenderer
        }
    ];

    const start = (
        <div className="flex w-17rem justify-content-evenly align-items-center">
            <img style={{ borderRadius: "50%", boxShadow: "0px 0px 100px -10px" }} alt="logo" src="src\assets\TinyMeowth.png" height="50"></img>
            <Button onClick={handleClick}>TEST</Button>
        </div>
    )

    const end = (
        <div className="flex w-17rem justify-content-around align-items-center">
            <InputText placeholder="Search" type="text" className="sm:w-auto" />
            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
        </div>
    );

    return (
        <div className="flex w-9" style={{ height: `${height}`, position: "absolute" }}>
            <Menubar style={{ fontWeight: "500" }}
                pt={{
                    root: {
                        style: { borderRadius: "0", border: "none", display: "flex", width: "100%", justifyContent: "space-between", padding: "0px 5rem" }
                    },
                    menuitem: {
                        style: { display: "flex", justifyContent: "center", width: "125px" },
                    },
                    start: {
                        style: {},
                    },
                    end: {
                        style: { marginLeft: "0" },
                    },

                    content: { style: {} },
                }} model={items} start={start} end={end} />
        </div >
    )
}
