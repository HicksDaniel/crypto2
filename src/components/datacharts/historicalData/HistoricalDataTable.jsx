import React, { useState, useEffect } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useCoinStore } from "../../../stores/useCoinStore.jsx";
import { dataTableStyles } from "../../../assets/common/passthroughStyles.jsx";

export default function HistoricalDataTable({ search, date, localCurrency }) {
  const { fetchHistoryData, formattedHistoricalData, loading } = useCoinStore();

  useEffect(() => {

    fetchHistoryData(search, date, localCurrency);
  }, [fetchHistoryData]);

  const historicalDataReady = formattedHistoricalData && !loading;
  { console.log(formattedHistoricalData) }

  return (
    <>
      <div>This is Your Home Now!</div>
      <button onClick={() => console.log("HDT", formattedHistoricalData)}>
        Click for trending
      </button>
      <div className="flex bg-primary-600 justify-content-center p-0 m-0 w-9">
        {historicalDataReady && (
          <DataTable pt={dataTableStyles} value={formattedHistoricalData}>
            <Column field="name" header="Company" />
            <Column field="currentPrice" bodyClassName="text-justify" header="Price" />
            <Column field="totalVolume" header="Total Volume" />
            <Column sortable field="marketCap" header="Market Cap" />

          </DataTable>
        )}
      </div>
    </>
  );
}
