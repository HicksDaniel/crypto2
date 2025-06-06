import React from "react";
import { create } from "zustand";

import {
  DEFAULT_COIN,
  DEFAULT_CHART_LIST,
  DEFAULT_DATA_STATE,
  MOCK_USER_COINS,
  mapCoinData,
  mapHistoricalData,
  BASE_URL,
  FETCH_HEADER,
  fetchTrendingCoinData,
  fetchHistoryCoinData,
  fetchCoinData,
  structuredCoinData,
} from "../assets/common/utils";

export const useCoinStore = create((set, get) => ({
  data: DEFAULT_DATA_STATE,
  searchCoin: DEFAULT_COIN,
  singleCoinData: [],
  rawTrendingData: [],
  formattedTrendingData: [],
  rawDefinedData: [],
  formattedDefinedData: [],
  rawHistoricalData: [],
  formattedHistoricalData: [],
  userCoins: MOCK_USER_COINS,
  loading: false,
  error: null,
  chartButtonList: DEFAULT_CHART_LIST,
  chartList: [],
  visibleCharts: [],
  coinList: [],
  timeline: "1",
  selectedDataKey: "prices",

  updateTimeLine: (value) => {
    set({ timeline: value });
  },
  updateDataKey: (value = "prices") => {
    set({ selectedDataKey: value });
  },

  updateVisibleCharts: (value) => {
    set({ visibleCharts: value });
  },
  updateChartList: (value) => {
    set({ chartList: value });
  },
  updateSearchCoin: (value) => {
    set({ searchCoin: String(value.toLowerCase()) });
  },

  fetchCoinList: async () => {
    try {
      const response = await fetch(`${BASE_URL}/coins/list`, {
        method: "GET",
        headers: FETCH_HEADER,
      });
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
    const { searchCoin, timeline } = get();

    set({ loading: true });
    try {
      const response = await fetch(
        `${BASE_URL}/coins/${searchCoin}/market_chart?vs_currency=usd&days=${timeline}`,
        {
          method: "GET",
          headers: FETCH_HEADER,
        }
      );
      const data = await response.json();

      set({ singleCoinData: data, loading: false });
    } catch (error) {
      set({ loading: false, error: "Failed to fetch data" });
      console.error("Error fetching 24h data:", error);
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
      set({ formattedTrendingData: [], loading: false });
      console.warn("Issue fetching trending coin data", error);
    }
  },

  fetchDefinedData: async (value) => {
    const isTrending = value === "trending" ? "search" : "coins";

    set({ loading: true });
    try {
      const res = await fetch(
        `${BASE_URL}/${isTrending}/${value}?vs_currency=usd`,
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

      const formattedDefinedData = await data.coins.map((coin) => ({
        ...mapCoinData(coin.item),
      }));
      set({ rawTrendingData: data, formattedDefinedData, loading: false });
    } catch (error) {
      set({ formattedTrendingData: [], loading: false });
      console.warn("Issue fetching trending coin data", error);
    }
  },

  fetchData: async (coin) => {
    if (!coin || typeof coin !== "string" || !coin.trim()) {
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
      console.log("coinData", coinData);
      const formattedData = await structuredCoinData(coinData);
      set({ data: formattedData, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
