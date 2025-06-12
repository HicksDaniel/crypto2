import { enUS } from "date-fns/locale";
import "chartjs-adapter-date-fns";
import { _toLeftRightCenter } from "chart.js/helpers";
import { useCoinStore } from "../../../../stores/useCoinStore";

import { createTallDiamondImage } from "../../../../assets/common/chartUtils";



import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,);



Tooltip.positioners.offsetBelow = function (elements, eventPosition) {
  const pos = Tooltip.positioners.average(elements);
  if (!pos) return false;

  const chart = elements[0].element.$context.chart;
  const tooltipWidth = chart.tooltip.width || 100;
  const chartWidth = chart.width;

  let adjustedX = pos.x - tooltipWidth / 2;

  if (adjustedX < 10) adjustedX = 10;
  if (adjustedX + tooltipWidth > chartWidth - 50) {
    adjustedX = chartWidth - tooltipWidth - 50;
  }

  return {
    x: adjustedX,
    y: pos.y + 1150,
  };
};

export const labelMap = {
  prices: "Price (USD)",
  market_caps: "Market Cap (USD)",
  total_volumes: "Total Volume (USD)",
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

      ctx.strokeStyle = "rgba(0,0,0,0.2)";
      ctx.setLineDash([]);
      ctx.lineWidth = 3;


      ctx.beginPath();
      ctx.moveTo(left, yCoor);
      ctx.lineTo(xCoor - 15, yCoor);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(xCoor, yCoor + 25);
      ctx.lineTo(xCoor, bottom);
      ctx.stroke();
    }
  },
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
