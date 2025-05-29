import { enUS } from "date-fns/locale";
import "chartjs-adapter-date-fns";
import { _toLeftRightCenter } from "chart.js/helpers";

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

export const hoverLine = {
  id: "hoverLine",
  afterDatasetsDraw(chart) {
    const {
      ctx,
      tooltip,
      data,
      chartArea: { top, bottom, left, right },
    } = chart;

    if (tooltip._active.length > 0) {
      const xCoor = tooltip._active[0].element.x;
      const yCoor = tooltip._active[0].element.y;

      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;

      ctx.beginPath();
      ctx.moveTo(left, yCoor);
      ctx.lineTo(xCoor - 5, yCoor);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(xCoor, yCoor + 5);
      ctx.lineTo(xCoor, bottom);
      ctx.stroke();
    }
  },
};

export const createChartOptions = (timeline = "1", selectedDataKey = "") => ({
  elements: {
    point: {
      radius: 1,
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
