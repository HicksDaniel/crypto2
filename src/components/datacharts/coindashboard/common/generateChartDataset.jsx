import { enUS } from "date-fns/locale";
import "chartjs-adapter-date-fns";
import { _toLeftRightCenter } from "chart.js/helpers";
import { createTallDiamondImage } from "../../../../assets/common/chartUtils";
import { labelMap } from "../../../../assets/common/utils";


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

export const createChartOptions = (timeline = "1", selectedDataKey = "", themeColors = []) => {
  return {
    elements: {
      point: {
        radius: 0,
        hoverPointRadius: 5,
        hoverBackgroundColor: "black",
        pointStyle: createTallDiamondImage(30, 50, themeColors.computedPrimary800, 2, 0.2),
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
      datalabels: {
        display: false,
      },
      tooltip: {
        padding: 10,
        position: "offsetBelow",
        mode: "index",
        intersect: false,
      },
      legend: {
        display: true,
        labels: {
          usePointStyle: false,
        },
      },
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
  };
};

