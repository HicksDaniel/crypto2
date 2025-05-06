import { useState, useEffect } from "react";
import BasicCard from "../components/cards/basiccard";
import { Button } from "primereact/button";
import { RadioButton } from 'primereact/radiobutton';

import "primeflex/primeflex.css";
import { useCoinStore } from "../stores/useCoinStore";
import DoughnutChart from "../components/datacharts/doughnutchart";
import StyledLineChart from "../components/datacharts/styledlinechart";
import CompoundLineChart from "../components/datacharts/compoundlinechart";

const chartCategories = [
  { name: "Compound L Chart", key: "C", showing: false, comp: <CompoundLineChart /> },
  { name: "Doughnut Chart", key: "D", showing: false, comp: <DoughnutChart /> },
  { name: "Styled Line Chart", key: "S", showing: false, comp: <StyledLineChart /> },
]
3
export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState(chartCategories[1]);
  const [showingCharts, setShowingCharts] = useState([])
  const { data, loading, error, fetchData } = useCoinStore();
  let chartArray = []

  function updateChartArray(value) {

    const update = chartArray.map((chart) => {
      if (chart.name === value.name) {
        return { ...chart, showing: true };
      }
      console.log(chart)
      return chart;
    });
  }


  const renderedRadioButtons = (
    chartCategories.map((category) => {
      chartArray.push(category)
      return (
        <div key={category.key} className="flex align-items-center">
          <RadioButton inputId={category.key} name="category" value={category} onChange={(e) => { updateChartArray(e.value), setSelectedCategory(e.value) }} checked={selectedCategory.key === category.key} />
          <label htmlFor={category.key} className="ml-4">{category.name}</label>
        </div>
      );

    })
  )

  const renderedGraphs = (
    chartArray.map((c) => {
      {
        c.showing === true && data !== null && !loading && (
          <BasicCard size="col-6 min-w-min" comp={c.comp} />
        )
      }
    })
  )


  useEffect(() => {
    fetchData();
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Error: {error}</p>;
    }
  }, []);

  return (
    <div>

      <div className="flex flex-row justify-content-center flex-wrap row-gap-3 pt-5 ">
        {data !== null && !loading && (
          <BasicCard maxWidth="48rem" minWidth="24rem" width="40%" comp={<StyledLineChart />} />
        )}
        {data !== null && !loading && (
          <BasicCard maxWidth="48rem" minWidth="24rem" width="40%" comp={<StyledLineChart />} />
        )}
        {data !== null && !loading && (
          <BasicCard maxWidth="24rem" minWidth="24rem" width="25%" comp={<DoughnutChart />} />
        )}
        {data !== null && !loading && (
          <BasicCard maxWidth="48rem" minWidth="24rem" width="40%" comp={<CompoundLineChart />} />
        )}
        {data !== null && !loading && (
          <BasicCard maxWidth="24rem" minWidth="24rem" width="40%" comp={<DoughnutChart />} />
        )}
        {data !== null && !loading && (
          <BasicCard maxWidth="48rem" minWidth="24rem" width="40%" comp={<CompoundLineChart />} />
        )}

      </div>

    </div >
  );
};
