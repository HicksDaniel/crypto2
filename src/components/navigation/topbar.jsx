import React, { useState, useContext } from "react";

import { Menubar } from "primereact/menubar";
import { PrimeReactContext } from "primereact/api";

import { menuBarStyling } from "../../assets/common/passthroughStyles";
import { topbarMenuItems } from "./common/topbar/topbarMenuItems";
import { StartItem } from "./common/topbar/startitem";
import { EndItem } from "./common/topbar/endItem";

export default function MenuTopBar({ height }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { changeTheme } = useContext(PrimeReactContext);

  const handleClick = () => {
    setIsDarkMode((prevMode) => {
      const nextMode = !prevMode;
      updateTheme(nextMode);
      return nextMode;
    });
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
    <div
      className="flex w-9"
      style={{
        height: `${height}`,

        position: "absolute",
      }}
    >
      <Menubar
        style={{ fontWeight: "300" }}
        pt={menuBarStyling}
        model={topbarMenuItems}
        start={<StartItem handleClick={handleClick} />}
        end={<EndItem />}
      />
    </div>
  );
}
