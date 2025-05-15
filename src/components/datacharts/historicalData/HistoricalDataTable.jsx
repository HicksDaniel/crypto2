import React, { useState, useEffect } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useCoinStore } from "../../../stores/useCoinStore.jsx";
import { dataTableStyles } from "../../../assets/common/passthroughStyles.jsx";

export default function HistoricalDataTable({ search }) {
  const { fetchHistoryData, coinHistoryData, loading } = useCoinStore();

  useEffect(() => {
    fetchHistoryData(search);
  }, [fetchHistoryData]);

  const historicalDataReady = coinHistoryData && !loading;

  return (
    <>
      <div>This is Your Home Now!</div>
      <button onClick={() => console.log("trending")}>
        Click for trending
      </button>
      <div className="flex bg-primary-600 justify-content-center p-0 m-0 w-9">
        {historicalDataReady && (
          <DataTable pt={dataTableStyles} value={coinHistoryData}>
            <Column header="Company" />
            <Column sortable field="marketCapRank" header="MC Rank" />
            <Column header="Quantity" />
            <Column sortable field="currentPrice" header="Current Price" />
            <Column sortable field="priceChange24h" header="24h Price Change" />
            <Column field="totalVolume" header="Total Volume" />
          </DataTable>
        )}
      </div>
    </>
  );
}
