import React from "react";
import { create } from "zustand";
import { structuredCoinData } from "./structureData";
import DoughnutChart from "../components/datacharts/doughnutchart";
import StyledLineChart from "../components/datacharts/styledlinechart";
import CompoundLineChart from "../components/datacharts/compoundlinechart";
import { mapCoinData } from "../assets/common/utils";
import { mapHistoricalData } from "../assets/common/utils";
import { format } from "date-fns";

const DEFAULT_DATA_STATE = [];
const BASE_URL = "https://api.coingecko.com/api/v3";
const FETCH_HEADER = {
  accept: "application/json",
  "x-cg-demo-api-key": "CG-c7WmWDGxgBsFBma9zh72TkTC",
};

const MOCK_USER_COINS = [
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

const DEFAULT_COIN = "bitcoin";

const DEFAULT_CHART_LIST = [
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

const fetchTrendingCoinData = async () => {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/search/trending",
      {
        method: "GET",
        headers: FETCH_HEADER,
      }
    );

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

const fetchHistoryCoinData = async (coinId, date) => {
  console.log(date);
  const formattedFetchDate = format(date, "dd-MM-yyyy");
  const formattedDisplayDate = format(date, "MM-dd-yyyy");


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

const fetchCoinData = async (coinName) => {
  coinName = coinName.toLowerCase()
  console.log(coinName)
  if (!coinName) {
    console.warn("fetchCoinData called with invalid coinName.");
    return null;
  }
  try {
    const res = await fetch(`${BASE_URL}/coins/${coinName}`, {
      method: "GET",
      headers: FETCH_HEADER,
    });

    if (!res.ok)
      throw new Error(+
        `Failed to fetch coin data: ${res.status} ${res.statusText}`
      );
    const data = await res.json();
    return data || {};

  } catch (error) {
    console.error("Error in fetchCoinData:", error);
    throw error;
  }
};

export const useCoinStore = create((set, get) => ({
  data: DEFAULT_DATA_STATE,
  searchCoin: DEFAULT_COIN,
  singleCoinData: null,
  rawTrendingData: [],
  formattedTrendingData: [],
  rawHistoricalData: [],
  formattedHistoricalData: [],
  userCoins: MOCK_USER_COINS,
  loading: false,
  error: null,
  chartButtonList: DEFAULT_CHART_LIST,
  chartList: [],
  visibleCharts: [],
  coinList: [],
  timeLine: "1",

  updateTimeLine: (value) => {
    set({ timeLine: value })
  },

  updateVisibleCharts: (value) => {
    set({ visibleCharts: value });
  },
  updateChartList: (value) => {
    set({ chartList: value });
  },
  updateSearchCoin: (value) => {
    set({ searchCoin: value });
  },

  fetchCoinList: async () => {
    try {
      const response = await fetch("https://api.coingecko.com/api/v3/coins/list", {
        method: "GET",
        headers: FETCH_HEADER,
      },);
      const data = await response.json();
      set({ coinList: data });
    } catch (error) {
      console.error("Failed to fetch coin list:", error);
    }
  },

  fetchHistoryData: async (coin, dates, localCurrency) => {
    set({ loading: true, error: null });
    try {
      const promisesArray = dates.map((date) =>
        fetchHistoryCoinData(coin, date)
      );

      const results = await Promise.allSettled(promisesArray);

      const resultsArray = [];
      for (let result of results) {
        if (result.status === "fulfilled") {
          try {
            const formattedResults = mapHistoricalData(
              result.value,
              localCurrency
            );

            resultsArray.push(formattedResults);
          } catch (err) {
            console.error("Error formatting historical data:", err);
          }
        } else {
          console.error("Failed to fetch data for a date:", result.reason);
        }
      }
      set({
        formattedHistoricalData: resultsArray,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching history data:", error);
      set({ error: error.message, loading: false });
    }
  },
  fetchSingleCoinData: async () => {
    const { searchCoin, timeLine } = get()

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${searchCoin}/market_chart?vs_currency=usd&days=${timeLine}`,
        {
          method: "GET",
          headers: FETCH_HEADER,
        },
      );
      const data = await response.json()
      set({ singleCoinData: data, loading: false })

      return data;
    } catch (error) {
      set({ loading: false, error: "Failed to fetch data" });
      console.error("Error fetching 24h data:", error)
    }
  },

  fetchTrendingData: async () => {
    set({ loading: true });
    try {
      const response = await fetchTrendingCoinData();
      if (!response) throw new Error("No Results for Trending Data");

      const formattedTrendingData = response.coins.map((coin) => ({
        ...mapCoinData(coin.item),
      }));
      set({ rawTrendingData: response, formattedTrendingData, loading: false });
    } catch (error) {
      set({ trendingData: [], loading: false });
      console.warn("Issue fetching trending coin data", error);
    }
  },

  fetchData: async (coin) => {
    if (!coin || typeof coin !== 'string' || !coin.trim()) {
      console.warn("Invalid coin parameter:", coin);
      set({ error: "Invalid coin parameter", loading: false });
      return;
    }

    set({ loading: true, error: null });

    try {
      const coinData = await fetchCoinData(coin);
      if (!coinData) {
        throw new Error("No data returned from fetchCoinData");
      }

      const formattedData = await structuredCoinData(coinData);
      set({ data: formattedData, loading: false });

    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
