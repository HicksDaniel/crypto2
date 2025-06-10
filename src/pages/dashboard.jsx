import { useEffect } from "react";
import BasicCard from "../components/cards/basiccard";
import { useCoinStore } from "../stores/useCoinStore.jsx";

import "primeflex/primeflex.css";

export default function Dashboard() {
  const {
    loading,
    error,
    fetchUserFavorites,
    visibleCharts,
  } = useCoinStore();



  useEffect(() => {

    fetchUserFavorites();
  }, [visibleCharts]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-row justify-content-center flex-wrap row-gap-3 pt-5">
      {visibleCharts.map((chart) => (
        <BasicCard
          key={chart.value}
          maxWidth={chart.size.maxWidth}
          minWidth={chart.size.minWidth}
          width={chart.size.width}
          comp={chart.comp}
        />
      ))}
    </div>
  );
}