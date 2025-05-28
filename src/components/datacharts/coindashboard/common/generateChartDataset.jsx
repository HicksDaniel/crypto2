import { enUS } from "date-fns/locale";
import "chartjs-adapter-date-fns";

export const labelMap = {
  prices: "Price (USD)",
  market_caps: "Market Cap (USD)",
  total_volumes: "Total Volume (USD)",
};

export const DEFAULT_CHART_DATA = {
  labels: [],
  datasets: [],
};

export const getStepTimer = (timeline) => {
  switch (timeline) {
    case "1":
      return "hour";
    case "7":
      return "day";
    case "30":
      return "week";
    case "365":
    case "max":
      return "month";
    default:
      return "day";
  }
};

export const prepareDataset = (coinDataArray) => {
  if (!coinDataArray) return [];
  return coinDataArray.map((item) => ({
    x: new Date(item[0]),
    y: item[1],
  }));
};

export const createChartData = (searchCoin, selectedDataKey, dataset) => {
  return {
    datasets: [
      {
        label: `${searchCoin} ${labelMap[selectedDataKey] || ""}`,
        data: dataset,
        fill: true,
        tension: 0.4,
      },
    ],
  };
};

export const createChartOptions = (timeline = "1", selectedDataKey = "") => ({
  elements: {
    point: {
      radius: 0,
    },
  },
  interaction: {
    mode: "index",
    axis: "x",
    intersect: false,
  },
  maintainAspectRatio: false,
  aspectRatio: 0.5,
  responsive: true,
  plugins: {
    tooltip: {
      mode: "index",
      intersect: false,
    },
    legend: {},
  },
  scales: {
    x: {
      type: "time",
      time: {
        unit: getStepTimer(timeline),
        tooltipFormat: "PPpp",
      },
      adapters: {
        date: {
          locale: enUS,
        },
      },
      title: {
        display: true,
        text: "Time Line",
      },
    },
    y: {
      title: {
        display: true,
        text: labelMap[selectedDataKey] || "Value",
      },
      ticks: {
        callback: (value) => {
          if (typeof value === "number") {
            return `$${value.toLocaleString()}`;
          }
          return value;
        },
      },
    },
  },
});
