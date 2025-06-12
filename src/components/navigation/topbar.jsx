import React, { useState, useEffect, useContext } from "react";
import { Menubar } from "primereact/menubar";
import { PrimeReactContext } from "primereact/api";

import { menuBarStyling } from "../../assets/common/passthroughStyles";
import { topbarMenuItems } from "./common/topbar/topbarMenuItems";
import { StartItem } from "./common/topbar/startitem";
import { EndItem } from "./common/topbar/endItem";
import { getThemeColors } from "../../assets/common/chartUtils";
import { useCoinStore } from "../../stores/useCoinStore";

export default function MenuTopBar({ height }) {
  const { updateThemeColorsForCharts, themeColors } = useCoinStore();
  const { changeTheme } = useContext(PrimeReactContext);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const themeLink = document.getElementById("theme-link");

    const handleThemeLoad = () => {
      const colors = getThemeColors();
      updateThemeColorsForCharts(colors[0], colors[1]);
    };
    if (themeLink) {
      themeLink.addEventListener("load", handleThemeLoad);

      if (themeLink.sheet) {
        handleThemeLoad();
      }
    } else {
      handleThemeLoad();
    }

    return () => {
      if (themeLink) {
        themeLink.removeEventListener("load", handleThemeLoad);
      }
    };
  }, [isDarkMode]);

  const updateTheme = (nextMode) => {
    if (!changeTheme) return;

    if (nextMode) {
      changeTheme("md-light-deeppurple", "md-dark-deeppurple", "theme-link");
    } else {
      changeTheme("md-dark-deeppurple", "md-light-deeppurple", "theme-link");
    }
  };

  const handleClick = () => {
    setIsDarkMode((prevMode) => {
      const nextMode = !prevMode;
      updateTheme(nextMode);
      return nextMode;
    });
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