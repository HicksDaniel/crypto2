import React, { useEffect, useState } from "react";
import { useCoinStore } from "../../../stores/useCoinStore";
import { ProgressBar } from "primereact/progressbar";
import { Skeleton } from "primereact/skeleton";
import { format } from "date-fns";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { Divider } from "primereact/divider";

export function SingleCoinHighLights() {
  const { data, fetchData, searchCoin, timeline, updateTimeLine, loading } =
    useCoinStore();

  const name = data?.name;
  const symbol = data?.symbol;
  const image = data?.image;
  const marketRank = data?.marketRank;
  const marketData = data?.marketData;

  const marketCap = data?.marketCap;
  const FDValuation = data?.fullyDilutedValuation;
  const circulatingSupply = data?.circulatingSupply;
  const totalSupply = data?.totalSupply;
  const maxSupply = data?.maxSupply;

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

  const formatLargeNumbers = (value) => {
    if (typeof value !== "number" || isNaN(value)) return "—";

    if (value >= 1_000_000_000) {
      const billions = value / 1_000_000_000;
      return `$${billions.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} Billion`;
    } else if (value >= 1_000_000) {
      const millions = value / 1_000_000;
      return `$${millions.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} Million`;
    } else {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
      });
    }
  };

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
      <div
        style={{ maxWidth: "200px" }}
        className="flex align-items-center p-0 gap-2 h-2rem"
      >
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
        <div className="flex text-sm mt-1 justify-content-between">
          <div>${marketData?.pricing.low_24h}</div>
          <div>24h Range</div>
          <div>${marketData?.pricing.high_24h}</div>
        </div>
      </div>
      <div>
        <Panel className="mt-5" header="Market Info" toggleable>
          <div className="m-0">
            <div className="flex justify-content-between h-2rem m-0 p-0">
              <p>Market Cap</p>
              <p>{formatLargeNumbers(marketCap)}</p>
            </div>
            <Divider />
          </div>
          <div className="m-0">
            <div className="flex justify-content-between h-2rem m-0 p-0">
              <p>Fully Diluted Valuation</p>
              <p>{formatLargeNumbers(FDValuation)}</p>
            </div>
            <Divider />
          </div>
          <div className="m-0">
            <div className="flex justify-content-between h-2rem m-0 p-0">
              <p>Circulating Supply</p>
              <p>{formatLargeNumbers(circulatingSupply)}</p>
            </div>
            <Divider />
          </div>
          <div className="m-0">
            <div className="flex justify-content-between h-2rem m-0 p-0">
              <p>Total Supply</p>
              <p>{totalSupply}</p>
            </div>
            <Divider />
          </div>
          <div className="m-0">
            <div className="flex justify-content-between h-2rem m-0 p-0">
              <p>Max Supply</p>
              <p>
                {maxSupply === null || maxSupply === undefined
                  ? "Infinite"
                  : maxSupply.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                    })}
              </p>
            </div>
            <Divider />
          </div>
        </Panel>
      </div>
      <div>
        <Panel
          className="mt-5"
          header={`${symbol?.toUpperCase()} Historical Price`}
          toggleable
        >
          <div className="m-0">
            <div className="flex justify-content-between h-2rem m-0 p-0">
              <p>24h Range</p>
              <p>
                {formatLargeNumbers(marketData?.pricing.low_24h)} -{" "}
                {formatLargeNumbers(marketData?.pricing.high_24h)}
              </p>
            </div>
            <Divider />
          </div>
          {/* <div className="m-0">
            <div className="flex justify-content-between h-2rem m-0 p-0">
              <p>7d Range</p>
              <p>{formatLargeNumbers(FDValuation)}</p>
            </div>
            <Divider />
          </div> */}
          <div className="m-0">
            <div className="flex justify-content-between h-2rem m-0 p-0">
              <p>All-Time High</p>
              <p>{formatLargeNumbers(marketData?.allTimeHigh?.ath)}</p>
            </div>
            <Divider />
          </div>
          <div className="m-0">
            <div className="flex justify-content-between align-items-center h-2rem m-0 p-0">
              <p>All-Time Low</p>
              <div>
                <div>{formatLargeNumbers(marketData?.allTimeLow?.atl)}</div>
              </div>
            </div>
            <div className="flex justify-content-end">
              {marketData?.allTimeLow?.atl_date}
            </div>
            <Divider />
          </div>
          <div className="m-0">
            <div className="flex justify-content-between h-2rem m-0 p-0">
              <p>Max Supply</p>
              <p>
                {maxSupply == null ? "Infinite" : maxSupply.toLocaleString()}
              </p>
            </div>
            <Divider />
          </div>
        </Panel>
      </div>
      <h1
        onClick={() =>
          console.log(
            marketCap,
            FDValuation,
            circulatingSupply,
            totalSupply,
            maxSupply
          )
        }
      >
        Hello!
      </h1>
    </>
  );
}
