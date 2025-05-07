import React from "react";
import { create } from "zustand";
import { structuredCoinData } from "./structureData";
import DoughnutChart from "../components/datacharts/doughnutchart";
import StyledLineChart from "../components/datacharts/styledlinechart";
import CompoundLineChart from "../components/datacharts/compoundlinechart";

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
    name: "Option 1",
    value: 1,
    comp: <DoughnutChart />
  },
  {
    name: "Option 2",
    value: 2,
    comp: <StyledLineChart />
  },
  {
    name: "Option 3",
    value: 3,
    comp: <CompoundLineChart />
  },
  {
    name: "Option 4",
    value: 4,
    comp: "NO CHART AVAILABLE"
  },

];

const fetchCoinData = async (coinName: string) => {
  const res = await fetch(`${BASE_URL}/coins/${coinName}`, {
    method: "GET",
    headers: FETCH_HEADER,
  });

  if (!res.ok) throw Error(res?.error || "Oh no, shit broke.");
  const data = await res.json();

  return data || {};
};


export const useCoinStore = create((set) => ({
  data: DEFAULT_DATA_STATE,
  userCoins: MOCK_USER_COINS,
  loading: false,
  error: null,
  chartButtonList: DEFAULT_CHART_LIST,
  chartList: [],
  visibleCharts: [],


  updateVisibleCharts: (value) => {
    set({ visibleCharts: value })
    console.log("THIS IS VISIBLE CHARTS", value)
  },
  updateChartList: (value) => {
    set({ chartList: value })
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
