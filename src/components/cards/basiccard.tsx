import React from "react";

import { Card } from "primereact/card";
import { basicCardStyling } from "./basiccardstyling";

export default function BasicCard({ minWidth, width, maxWidth, comp }) {
  return (
    <div
      className="flex h-22rem justify-content-center"
      style={{ width: `${width}`, maxWidth: `${maxWidth}`, minWidth: `${minWidth}`, height: "30%", padding: "0px" }}>
      <Card
        pt={basicCardStyling}
        className={`flex w-12 mx-2 py-1 border-round-2xl shadow-5 `}
      >
        {comp}
      </Card >
    </div >
  );
}
