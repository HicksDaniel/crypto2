import DoughnutChart from "../../components/datacharts/doughnutchart";
import StyledLineChart from "../../components/datacharts/styledlinechart";
import CompoundLineChart from "../../components/datacharts/compoundlinechart";
import { format } from "date-fns";

export const structuredCoinData = async (coinData) => {
  console.log(coinData);
  return new Promise((resolve) => {
    const processedData = {
      name: coinData?.name || null,
      image: coinData?.image.small || null,
      marketCapRank: coinData?.market_cap_rank || null,
      symbol: coinData?.symbol || null,
      last_updated: coinData?.last_updated || null,

      marketCap: coinData?.market_data?.market_cap?.usd || null,
      fullyDilutedValuation:
        coinData?.market_data?.fully_diluted_valuation?.usd || null,

      circulatingSupply: coinData?.market_data?.circulating_supply || null,
      totalSupply: coinData?.market_data?.total_supply || null,
      maxSupply: coinData?.market_data?.max_supply || null,

      marketData: {
        allTimeHigh: {
          ath: coinData?.market_data?.ath?.usd || null,
          ath_cp: coinData?.market_data?.ath_change_percentage?.usd || null,
          ath_date: coinData?.market_data?.ath_date?.usd || null,
        },
        allTimeLow: {
          atl: coinData?.market_data?.atl?.usd || null,
          atl_cp: coinData?.market_data?.atl_change_percentage?.usd || null,
          atl_date: coinData?.market_data?.atl_date?.usd || null,
        },
        pricing: {
          currentPriceBTC: coinData?.market_data?.current_price?.btc || null,
          currentPriceUSD: coinData?.market_data?.current_price?.usd || null,
          high_24h: coinData?.market_data?.high_24h?.usd || null,
          low_24h: coinData?.market_data?.low_24h?.usd || null,
          change_24h_USD:
            coinData?.market_data?.price_change_percentage_24h_in_currency
              ?.usd || null,
          change_24h_BTC:
            coinData?.market_data?.price_change_percentage_24h_in_currency
              ?.btc || null,
          pcp_1h:
            coinData?.market_data?.price_change_percentage_1h_in_currency
              ?.usd || null,
          pcp_24h: coinData?.market_data?.price_change_percentage_24h || null,
          pcp_7day: coinData?.market_data?.price_change_percentage_7d || null,
          pcp_14day: coinData?.market_data?.price_change_percentage_14d || null,
          pcp_30day: coinData?.market_data?.price_change_percentage_30d || null,
          pcp_60day: coinData?.market_data?.price_change_percentage_60d || null,
          pcp_200day:
            coinData?.market_data?.price_change_percentage_200d || null,
          pcp_1year: coinData?.market_data?.price_change_percentage_1y || null,
        },
      },
    };
    resolve(processedData);
  });
};

export function mapCoinData(coin) {
  return {
    name: coin?.name || null,
    image: coin?.small || null,
    currentPrice: coin?.data?.price || null,
    priceChange24h: coin?.data?.price_change_percentage_24h?.usd || null,
    totalVolume: coin?.data?.total_volume || null,
    marketCapRank: coin?.market_cap_rank || null,
    symbol: coin?.symbol || null,
  };
}
export function mapHistoricalData(coin, localCurrency) {
  return {
    name: coin?.name || null,
    image: coin?.image?.small || null,
    currentPrice:
      coin?.market_data?.current_price?.[localCurrency].toFixed(2) || null,
    totalVolume:
      coin?.market_data?.total_volume?.[localCurrency].toFixed(2) || null,
    marketCap:
      coin?.market_data?.market_cap?.[localCurrency].toFixed(2) || null,
    symbol: coin?.symbol || null,
    date: coin?.date || null,
  };
}

export const dataViewButtons = [
  { label: "Price", value: "prices", width: "55px" },
  { label: "Market Cap", value: "market_caps", width: "110px" },
  { label: "Total Volume", value: "total_volumes", width: "110px" },
];
export const timeChangeButtons = [
  { label: "24h", value: "1", width: "35px" },
  { label: "7d", value: "7", width: "30px" },
  { label: "1m", value: "30", width: "30px" },
  { label: "3m", value: "90", width: "30px" },
  { label: "1y", value: "365", width: "30px" },
  {
    label: "Max",
    value: "max",
    width: "40px",
    disabled: true,
    tooltip: "Not Available Through Free API",
  },
  {
    label: "LOG",
    value: "LOG",
    width: "30px",
    disabled: true,
    tooltip: "Coming soon",
  },
  {
    label: "tbd",
    value: "tbd1",
    width: "30px",
    disabled: true,
    tooltip: "Coming soon",
  },
  {
    label: "tbd",
    value: "tbd2",
    width: "30px",
    disabled: true,
    tooltip: "Coming soon",
  },
  {
    label: "tbd",
    value: "tbd3",
    width: "30px",
    disabled: true,
    tooltip: "Coming soon",
  },
];

export const calculatePercentageChange = (coinData, userData = 1) => {
  if (!coinData) return [];

  const userCoinValue = [
    { label: "Current", value: "1", changeValue: coinData?.currentPrice },
    { label: "1h", value: "1", changeValue: coinData?.pcp_1h },
    { label: "24h", value: "1", changeValue: coinData?.pcp_24h },
    { label: "7d", value: "7", changeValue: coinData?.pcp_7day },
    { label: "30d", value: "30", changeValue: coinData?.pcp_30day },
    { label: "1y", value: "365", changeValue: coinData?.pcp_1year },
  ];

  return userCoinValue;
};

export const DEFAULT_DATA_STATE = [];
export const BASE_URL = "https://api.coingecko.com/api/v3";
export const FETCH_HEADER = {
  accept: "application/json",
  "x-cg-demo-api-key": "CG-c7WmWDGxgBsFBma9zh72TkTC",
};

export const MOCK_USER_COINS = [
  {
    name: "bitcoin",
    owned: 1,
  },
  {
    name: "ethereum",
    owned: 20,
  },
  { name: "dogecoin", owned: 380000 },
];

export const DEFAULT_COIN = "bitcoin";

export const DEFAULT_CHART_LIST = [
  {
    name: "Compound Line",
    value: 1,
    comp: <CompoundLineChart />,
    size: {
      maxWidth: "48rem",
      minWidth: "24rem",
      width: "100%",
    },
  },
  {
    name: "Doughnut",
    value: 2,
    comp: <DoughnutChart />,
    size: {
      maxWidth: "24rem",
      minWidth: "24rem",
      width: "100%",
    },
  },
  {
    name: "Styled Line",
    value: 3,
    comp: <StyledLineChart />,
    size: {
      maxWidth: "48rem",
      minWidth: "24rem",
      width: "100%",
    },
  },
  {
    name: "Compound Line",
    value: 4,
    comp: <CompoundLineChart />,
    size: {
      maxWidth: "48rem",
      minWidth: "24rem",
      width: "100%",
    },
  },

  {
    name: "Doughnut",
    value: 5,
    comp: <DoughnutChart />,
    size: {
      maxWidth: "24rem",
      minWidth: "24rem",
      width: "100%",
    },
  },
  {
    name: "Styled Line",
    value: 6,
    comp: <StyledLineChart />,
    size: {
      maxWidth: "48rem",
      minWidth: "24rem",
      width: "100%",
    },
  },
  {
    name: "Option 4",
    value: 7,
    comp: "NO CHART AVAILABLE",
    size: {
      maxWidth: "24rem",
      minWidth: "24rem",
      width: "100%",
    },
  },
];

export const fetchTrendingCoinData = async () => {
  try {
    const res = await fetch(`${BASE_URL}/search/trending`, {
      method: "GET",
      headers: FETCH_HEADER,
    });

    if (!res.ok)
      throw new Error(
        `Failed to fetch trending coins: ${res.status} ${res.statusText}`
      );

    const data = await res.json();
    return data || {};
  } catch (error) {
    console.error("Error fetching trending coin data:", error);
  }
};

export const fetchHistoryCoinData = async (coinId, date) => {
  if (!coinId || !date) {
    console.warn("Invalid value or date passed to fetchHistoryCoinData");
    return;
  }
  try {
    const formattedFetchDate = format(date, "dd-MM-yyyy");
    const formattedDisplayDate = format(date, "MM-dd-yyyy");

    const res = await fetch(
      `http://localhost:3000/api/coin-history?coinId=${coinId}&date=${formattedFetchDate}`
    );

    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return {
      ...data,
      date: formattedDisplayDate,
    };
  } catch (error) {
    console.error("Error fetching historical coin data:", error);
    throw error;
  }
};

export const fetchCoinData = async (coinName) => {
  console.log("fetchCoinData", coinName);
  if (!coinName) {
    console.warn("fetchCoinData called with invalid coinName.");
    return null;
  }
  try {
    coinName = coinName.toLowerCase();
    const res = await fetch(`${BASE_URL}/coins/${coinName}`, {
      method: "GET",
      headers: FETCH_HEADER,
    });

    if (!res.ok)
      throw new Error(
        `Failed to fetch coin data: ${res.status} ${res.statusText}`
      );
    const data = await res.json();
    return data || {};
  } catch (error) {
    console.error("Error in fetchCoinData:", error);
    throw error;
  }
};
