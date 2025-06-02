import React, { useEffect, useState } from "react";
import { useCoinStore } from "../../../stores/useCoinStore";
import { ProgressBar } from "primereact/progressbar";
import { Skeleton } from "primereact/skeleton";
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
      <div>
        <TabView>
          <TabPanel header="Header I">
            <p className="m-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </TabPanel>
          <TabPanel header="Header II">
            <p className="m-0">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci
              velit, sed quia non numquam eius modi.
            </p>
          </TabPanel>
          <TabPanel header="Header III">
            <p className="m-0">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga. Et harum quidem rerum
              facilis est et expedita distinctio. Nam libero tempore, cum soluta
              nobis est eligendi optio cumque nihil impedit quo minus.
            </p>
          </TabPanel>
        </TabView>
        <Panel header="Market Info" toggleable>
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
              <p>{maxSupply === null ? "Infinite" : maxSupply}</p>
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
