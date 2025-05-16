import React from "react";
import { create } from "zustand";
import { structuredCoinData } from "./structureData";
import DoughnutChart from "../components/datacharts/doughnutchart";
import StyledLineChart from "../components/datacharts/styledlinechart";
import CompoundLineChart from "../components/datacharts/compoundlinechart";
import { mapCoinData } from "../assets/common/utils";

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
  const res = await fetch(
    "https://api.coingecko.com/api/v3/search/trending?coins",
    {
      method: "GET",
      headers: FETCH_HEADER,
    }
  );
  if (!res.ok)
    throw Error(res?.error || "Oh no, shit broke. - fetchCoinData()");
  const data = await res.json();

  return data || {};
};
const fetchHistoryCoinData = async (value) => {
  console.log("inside fetch request", value);
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/bitcoin/history`,
    {
      method: "GET",
      headers: FETCH_HEADER,
    }
  );
  console.log("fetch res", res);
  if (!res.ok)
    throw Error(res?.error || "Oh no, shit broke. - fetchHitoryCoinData()");

  const data = await res.json();
  return data || {};
};

const fetchCoinData = async (coinName) => {
  const res = await fetch(`${BASE_URL}/coins/${coinName}`, {
    method: "GET",
    headers: FETCH_HEADER,
  });

  if (!res.ok)
    throw Error(res?.error || "Oh no, shit broke. - fetchCoinData()");
  const data = await res.json();

  return data || {};
};

export const useCoinStore = create((set) => ({
  data: DEFAULT_DATA_STATE,
  rawTrendingData: [],
  formattedTrendingData: [],
  coinHistoryData: [],
  userCoins: MOCK_USER_COINS,
  loading: false,
  error: null,
  chartButtonList: DEFAULT_CHART_LIST,
  chartList: [],
  visibleCharts: [],

  updateVisibleCharts: (value) => {
    set({ visibleCharts: value });
  },
  updateChartList: (value) => {
    set({ chartList: value });
  },

  fetchHistoryData: async (value) => {
    set({ loading: true });
    try {
      const response = await fetchHistoryCoinData(value);
      console.log("response", response);
      if (!response) throw new Error("No Results for History Data");
      set({ coinHistoryData: response, loading: false });
    } catch (error) {
      set({ coinHistoryData: [], loading: false });
      console.warn("Issue fetching historical coin data", error);
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

  fetchData: async () => {
    const userCoins = MOCK_USER_COINS;

    set({ loading: true, error: null });
    try {
      const promisesArray = userCoins.map((res) => fetchCoinData(res.name));

      await Promise.all(promisesArray)
        .then((responses) => {
          return Promise.all(
            responses.map(async (response) => {
              const finalData = structuredCoinData(await response);
              console.log(response);
              return finalData;
            })
          );
        })
        .then((d) => {
          set({ data: d, loading: false, userCoins });
        });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
