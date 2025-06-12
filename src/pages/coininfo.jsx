import React, { useEffect, useState } from "react";

import PriceTimeline from "../components/datacharts/pricetimeline";
import { ButtonGroupsNav } from "../components/datacharts/coindashboard/buttonGroupsNav";
import { ChangeOverTime } from "../components/datacharts/coindashboard/changeovertime";
import { SingleCoinHighLights } from "../components/datacharts/coindashboard/singleCoinHighLights";
import "./coininfo.css";

export default function CoinInfo() {
  const [showHighlights, setShowHighlights] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowHighlights(true), 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex w-12 h-full justify-content-between overflow-hidden">
      <div
        style={{ maxWidth: "500px", minWidth: "350px" }}
        className={`w-3 slide-in ${showHighlights ? "active" : ""}`}>
        <SingleCoinHighLights />
      </div>
      <div className="flex h-full flex-column align-items-center w-9 ">
        <div
          className={` w-12 h-5rem slide-in-down ${showHighlights ? "active" : ""
            }`}
        >
          <ButtonGroupsNav />
        </div>
        <div
          className={`flex w-12 h-full slide-in-left ${showHighlights ? "active" : ""
            }`}
        >
          <PriceTimeline />
        </div>

        <div
          className={`flex justify-content-end align-items-end w-12 h-20rem slide-in-up ${showHighlights ? "active" : ""
            }`}
        >
          <ChangeOverTime />
        </div>
      </div>
    </div>
  );
}
