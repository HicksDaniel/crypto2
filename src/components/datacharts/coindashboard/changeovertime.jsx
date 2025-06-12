import React, { useEffect } from "react";
import { useCoinStore } from "../../../stores/useCoinStore";
import { calculatePercentageChange } from "../../../assets/common/utils";

export function ChangeOverTime() {
  const { data, fetchData, searchCoin, timeline, updateTimeLine, fetchSingleCoinData } =
    useCoinStore();

  const currentData = calculatePercentageChange(data?.marketData?.pricing);

  const handleClick = (value) => {
    if (value === timeline) return;
    updateTimeLine(value);
    fetchSingleCoinData();
  };

  useEffect(() => {
    const InitializeCOT = async () => {
      fetchSingleCoinData(searchCoin);
    };
    InitializeCOT();
  }, [searchCoin]);

  return (
    <div className="flex border-1  justify-content-around align-items-end overflow-hidden border-round-3xl h-8rem w-11">
      {currentData?.map((item, index) => (
        <div
          key={index}
          className="flex border-right-1 justify-content-center flex-column w-2 text-center h-full"
        >
          <div
            onClick={() => handleClick(item.value)}
            style={{
              backgroundColor: "var(--primary-color)",
              color: "var(--primary-color-text)",
              borderColor: "black",
            }}
            className="flex   w-12 p-0 m-0 cursor-pointer justify-content-center align-items-center h-4rem font-bold"
          >
            {item.label}
          </div>
          <div className="flex   justify-content-center align-items-center h-4rem font-bold">
            {item.changeValue != null
              ? item.label === "Current"
                ? `$${item.changeValue}`
                : `${item.changeValue.toFixed(2)}%`
              : "N/A"}
          </div>
        </div>
      ))}
    </div>
  );
}
