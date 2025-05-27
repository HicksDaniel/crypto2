import React, { useEffect, useState } from "react";
import { useCoinStore } from "../../../stores/useCoinStore";
import { ProgressBar } from "primereact/progressbar";
import { Skeleton } from "primereact/skeleton";

export function SingleCoinHighLights() {
  const { data, fetchData, searchCoin, timeLine, updateTimeLine, loading } =
    useCoinStore();

  const name = data?.name;
  const symbol = data?.symbol;
  const image = data?.image;
  const marketRank = data?.marketRank;
  const marketData = data?.marketData;

  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    let timeout;

    if (loading || showSkeleton) {
      setShowSkeleton(true);
      timeout = setTimeout(() => {
        setShowSkeleton(false);
      }, 350);
    }

    return () => clearTimeout(timeout);
  }, [loading]);

  const CustomProgressBar = ({ value, min, max }) => {
    const percentage = ((value - min) / (max - min)) * 100;

    return (
      <ProgressBar
        style={{ fontSize: "12px", height: "1rem" }}
        value={percentage.toFixed(2)}
      />
    );
  };

  if (loading || showSkeleton) {
    return (
      <div>
        <div className="flex align-items-center p-0 gap-2 h-2rem">
          <Skeleton height="90%" width="8%" />
          <Skeleton height="90%" width="18%" />
          <Skeleton height="90%" width="18%" />
          <Skeleton height="90%" width="5%" />
        </div>
        <div className="flex gap-2 align-items-center text-4xl h-3rem">
          <Skeleton height="90%" width="60%" />
          <Skeleton height="40%" width="10%" />
        </div>
        <div className="flex h-2rem align-items-center gap-2">
          {" "}
          <Skeleton height="60%" width="20%" />
          <Skeleton height="60%" width="10%" />
        </div>
        <div className="p-2 h-3rem">
          <div>
            <Skeleton />
          </div>
          <div className="flex">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex align-items-center p-0 gap-2 h-2rem">
        <img width="30px" src={image} />
        <div className="font-bold">{name}</div>
        <div>{symbol?.toUpperCase()} Price</div>
        <div>#{marketRank}</div>
      </div>
      <div className="flex gap-2 align-items-center text-4xl h-3rem">
        <div className="flex font-bold">
          ${marketData?.pricing?.currentPriceUSD}
        </div>
        <div className="flex text-xl font-semibold">
          {marketData?.pricing?.pcp_24h.toFixed(2)}%
        </div>
      </div>
      <div className="flex h-2rem align-items-center gap-2">
        {" "}
        <div className="flex font-bold">
          {marketData?.pricing?.currentPriceBTC?.toFixed(3)} BTC
        </div>
        <div className="flex font-semibold">
          {marketData?.pricing?.change_24h_BTC?.toFixed(2) || 0}%
        </div>
      </div>
      <div className="p-2 h-3rem">
        <div>
          <CustomProgressBar
            className="h-full"
            value={marketData?.pricing.currentPriceUSD}
            min={marketData?.pricing.low_24h}
            max={marketData?.pricing.high_24h}
          />
        </div>
        <div className="flex text-xs justify-content-between">
          <div>${marketData?.pricing.low_24h}</div>
          <div>24h Range</div>
          <div>${marketData?.pricing.high_24h}</div>
        </div>
      </div>
      <h1 onClick={() => console.log(data)}>Hello!</h1>
    </>
  );
}
