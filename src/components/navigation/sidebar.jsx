import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import ChartSelector from "../cards/selectchartbuttons/chartSelector";

export default function MenuSideBar({ width }) {
  const [visibleLeft, setVisibleLeft] = useState(false);
  const [visibleRight, setVisibleRight] = useState(false);

  const buttonFormat = (direction, position) => {
    const updatedStyles = {
      backgroundColor: "none",
      background: `linear-gradient(to ${direction}, transparent 31%, #1b242d 95%)`,
      width: "100%",
      justifyContent: `flex-${position}`,
    };
    return updatedStyles;
  };
  let timeoutId;

  function handleSideDrawers(value, string) {
    if (value === true) {
      if (string === "left") {
        timeoutId = setTimeout(() => {
          setVisibleLeft(value);
        }, 300);
      } else {
        timeoutId = setTimeout(() => {
          setVisibleRight(value);
        }, 300);
      }
    } else {
      setVisibleLeft(value);
      setVisibleRight(value);
    }
  }

  return (
    <>
      <div className="flex absolute left-0 h-full w-5rem">
        <Button
          style={{ ...buttonFormat("left", "start") }}
          icon="pi pi-arrow-right"
          onMouseOver={() => handleSideDrawers(true, "left")}
        />

        <Sidebar
          style={{ width: `${width}`, minWidth: "200px" }}
          visible={visibleLeft}
          position="left"
          onMouseLeave={() => handleSideDrawers(false)}
          onHide={() => setVisibleLeft(false)}
        >
          <h2>Select</h2>
          <ChartSelector />
        </Sidebar>
      </div>

      {/* <div className="flex absolute right-0 h-full w-5rem">
        <Button
          style={{ ...buttonFormat("right", "end") }}
          icon="pi pi-arrow-left"
          onMouseOver={() => handleSideDrawers(true, "right")}
        />
        <Sidebar
          style={{ width: `${width} `, minWidth: "200px" }}
          visible={visibleRight}
          position="right"
          onMouseLeave={() => handleSideDrawers(false)}
          onHide={() => setVisibleRight(false)}
        >
          <h2>Right Sidebar</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </Sidebar>
      </div> */}
    </>
  );
}
