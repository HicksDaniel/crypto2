import React, { useState, useEffect } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useCoinStore } from "../../../stores/useCoinStore.jsx";
import { dataTableStyles } from "../../../assets/common/passthroughStyles.jsx";
import {
  imageBodyTemplate,
  displayNameTemplate,
  marketCapTemplate,
  currentPriceDataTemplate,
  priceChangeDataTemplate,
} from "./tableBodyStyles.jsx";

export default function TrendingDataTable() {
  const { fetchTrendingData, formattedTrendingData, loading } = useCoinStore();

  useEffect(() => {
    fetchTrendingData();
  }, [fetchTrendingData]);

  const trendingDataReady = formattedTrendingData && !loading;

  return (
    <>
      <div className="flex w-12 bg-primary-600 justify-content-center p-0 m-0 w-9">
        {trendingDataReady && (
          <DataTable pt={dataTableStyles} value={formattedTrendingData}>
            <Column body={displayNameTemplate} header="Company" />
            <Column
              sortable
              body={marketCapTemplate}
              field="marketCapRank"
              header="MC Rank"
            />
            <Column body={imageBodyTemplate} header="Quantity" />
            <Column
              sortable
              body={currentPriceDataTemplate}
              field="currentPrice"
              header="Current Price"
            />
            <Column
              sortable
              body={priceChangeDataTemplate}
              field="priceChange24h"
              header="24h Price Change"
            />
            <Column field="totalVolume" header="Total Volume" />
          </DataTable>
        )}
      </div>
    </>
  );
}
