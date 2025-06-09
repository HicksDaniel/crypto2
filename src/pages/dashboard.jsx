import { useState, useEffect } from "react";
import BasicCard from "../components/cards/basiccard";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import { Reorder } from "framer-motion";

import "primeflex/primeflex.css";
import { useCoinStore } from "../stores/useCoinStore.jsx";

export default function Dashboard() {
  const { data, loading, error, fetchData, visibleCharts } = useCoinStore();

  useEffect(() => {
    fetchData();
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Error: {error}</p>;
    }
  }, []);

  const renderedCharts = visibleCharts.map((chart) => {
    data !== null && !loading;
    return (
      <BasicCard
        maxWidth={chart.size.maxWidth}
        minWidth={chart.size.minWidth}
        width={chart.size.width}
        comp={chart.comp}
      />
    );
  });

  // const renderedCharts = () => {
  //   return (
  //       < Reorder.Group
  //       style={{ display: "flex", flexFlow: "row wrap", justifyContent: "center", rowGap: "", paddingTop: "40px", rowGap: "2ch", width: "100%", padding: 0, margin: 0 }}
  //       axis="x"
  //       values={visibleCharts}
  //       onReorder={updateVisibleCharts}
  //     >
  //       {visibleCharts.map((chart) => (
  //           <Reorder.Item initial={{ opacity: .5 }}
  //             animate={{ opacity: 1 }}
  //             exit={{ opacity: 0 }}
  //             key={chart.value}
  //             drag
  //             value={chart.value}>
  //             <div style={{
  //               display: "flex",
  //               justifyContent: "center",
  //               color: "green",
  //               fontSize: 20,
  //               width: "100%",
  //               height: "350px",
  //               borderRadius: "2px",
  //               textAlign: "center",

  //             }}>
  //               <BasicCard maxWidth="48rem" minWidth="24rem" width="100%" comp={chart.comp} />
  //             </div>
  //           </Reorder.Item>
  //         ))
  //       }
  //     </Reorder.Group >
  //   )
  // }

  return (
    <div className="flex flex-row justify-content-center flex-wrap row-gap-3 pt-5">
      {renderedCharts}
    </div>
  );
}
