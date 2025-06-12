import React from "react";
import { create } from "zustand";
import { eachDayOfInterval } from "date-fns";



import {
  DEFAULT_COIN,
  DEFAULT_CHART_LIST,
  DEFAULT_DATA_STATE,
  DEFAULT_CHART_DATA,
  mapTrendingData,
  mapGainersLosersData,
  mapHistoricalData,
  BASE_URL,
  FETCH_HEADER,
  fetchHistoryCoinData,
  fetchCoinData,
  startDate,
  endDate,
  DEFAULT_USER_FAVORITES,

} from "../assets/common/utils";


export const useCoinStore = create((set, get) => ({
  data: DEFAULT_DATA_STATE,
  searchCoin: DEFAULT_COIN,
  defaultChartData: DEFAULT_CHART_DATA,
  userFavorites: DEFAULT_USER_FAVORITES,
  themeColors: [],
  chartColors: {},
  userFavoritesData: [],
  selectedDates: [startDate, endDate],
  topGainersData: [],
  topLosersData: [],
  topCoinsData: [],
  singleCoinData: [],
  rawTrendingData: [],
  formattedTrendingData: [],
  rawDefinedData: [],
  formattedDefinedData: [],
  rawHistoricalData: [],
  formattedHistoricalData: [],
  loading: false,
  error: null,
  chartButtonList: DEFAULT_CHART_LIST,
  chartList: [],
  visibleCharts: [],
  coinList: [],
  timeline: "1",
  localCurrency: "usd",
  selectedDataKey: "prices",

  updateThemeColors: (value1, value2) => {
    set({ themeColors: value1, chartColors: value2 })
  },

  updateSelectedDates: (value, nextValue) => {
    set({ selectedDates: [value, nextValue] })
  },

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

  fetchHistoryData: async () => {
    const { searchCoin, selectedDates, localCurrency } = get();

    const start = selectedDates[0];
    const end = selectedDates[1];
    const dates = start && end ? eachDayOfInterval({ start, end }) : [];

    set({ loading: true, error: null });
    try {
      const promisesArray = dates.map((date) =>
        fetchHistoryCoinData(searchCoin, date)
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
      const res1 = await fetch(
        `${BASE_URL}/coins/${searchCoin}/market_chart?vs_currency=usd&days=${timeline}`,
        {
          method: "GET",
          headers: FETCH_HEADER,
        },
      );
      const res2 = fetchCoinData(searchCoin);

      const data1 = await res1.json();
      const data2 = await res2;




      set({ data: data2, singleCoinData: data1, loading: false });
    } catch (error) {
      set({ loading: false, error: "Failed to fetch data" });
      console.error("Error fetching 24h data:", error);
    }
  },

  fetchTrendingData: async () => {
    set({ loading: true });

    try {
      const res = await fetch(`${BASE_URL}/search/trending`, {
        method: "GET",
        headers: FETCH_HEADER,
      });

      if (!res.ok) {
        throw new Error(
          `Failed to fetch trending coins: ${res.status} ${res.statusText}`
        );
      }

      const data = await res.json();
      if (!data || !Array.isArray(data.coins)) {
        throw new Error("Invalid data format received from API");
      }

      const formattedTrendingData = data.coins.map((coin) => ({
        ...mapTrendingData(coin.item),
      }));

      set({ rawTrendingData: data, formattedTrendingData, loading: false });
    } catch (error) {
      console.warn("Issue fetching trending coin data", error);
      set({ formattedTrendingData: [], loading: false });
    }
  },

  fetchTopsGainersLosersData: async (value, dataset) => {
    console.log("store fetch", value);
    set({ loading: true });

    try {
      const res = await fetch(`${BASE_URL}/${value}`, {
        method: "GET",
        headers: FETCH_HEADER,
      });

      if (!res.ok) {
        throw new Error(
          `Failed to fetch coins: ${res.status} ${res.statusText}`
        );
      }

      const data = await res.json();

      console.log("data", data);

      const mappedData = data.map((coin) => ({
        ...mapGainersLosersData(coin),
      }));

      const topGainers = [...mappedData]
        .filter((coin) => coin.percentChange24h != null)
        .sort((a, b) => b.percentChange24h - a.percentChange24h)
        .slice(0, 15);

      const topCoins = [...mappedData]
        .filter((coin) => coin.marketCapRank != null)
        .sort((a, b) => a.marketCapRank - b.marketCapRank)
        .slice(0, 15);

      const topLosers = [...mappedData]
        .filter((coin) => coin.percentChange24h != null)
        .sort((a, b) => a.percentChange24h - b.percentChange24h)
        .slice(0, 15);

      set({
        rawTrendingData: data,
        topCoinsData: topCoins,
        topGainersData: topGainers,
        topLosersData: topLosers,
        loading: false,
      });
    } catch (error) {
      set({ formattedTrendingData: [], loading: false });
      console.warn("Issue fetching coin data", error);
    }
  },

  fetchUserFavorites: async () => {
    const { userFavorites } = get();

    if (!Array.isArray(userFavorites) || userFavorites.length === 0) {
      console.warn("Users Favorite Coins Not Found", userFavorites);
      set({ userFavorites, error: "Unable To Locate User Favorites", loading: false });
      return;
    }

    set({ loading: true, error: null });

    try {
      const promiseArray = userFavorites.map((coin) => {
        return fetchCoinData(coin.name, coin.owned);
      });

      const results = await Promise.allSettled(promiseArray);

      const fulfilled = results
        .filter((r) => r.status === "fulfilled")
        .map((r) => r.value);

      if (fulfilled.length === 0) {
        throw new Error("All coin data fetches failed.");
      }

      set({ userFavoritesData: fulfilled, loading: false });

    } catch (error) {
      console.error("Error fetching user favorites:", error);
      set({ error: error.message, loading: false });
    }
  },
}));
