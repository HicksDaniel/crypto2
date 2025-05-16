import React, { useState, useEffect } from "react";
import { eachDayOfInterval, parseISO, format } from "date-fns";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useCoinStore } from "../../../stores/useCoinStore.jsx";
import { dataTableStyles } from "../../../assets/common/passthroughStyles.jsx";

const today = () => new Date();
const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d;
};

export default function HistoricalDataTable() {
  const { fetchHistoryData, formattedHistoricalData, loading } = useCoinStore();
  const [firstDate, setFirstDate] = useState(new Date(today()));
  const [secondDate, setSecondDate] = useState(new Date(yesterday()));

  const search = "bitcoin";

  const localCurrency = "usd";

  const start = parseISO("2025-04-11");
  const end = parseISO("2025-05-15");
  const dates = eachDayOfInterval({ start, end });

  useEffect(() => {
    console.log(firstDate);
    console.log(secondDate);
    fetchHistoryData(search, dates, localCurrency);
  }, []);

  const historicalDataReady = formattedHistoricalData && !loading;

  return (
    <>
      <div>This is Your Home Now!</div>

      <button onClick={() => console.log("HDT", formattedHistoricalData)}>
        Click for trending
      </button>
      <div className="flex bg-primary-600 justify-content-center p-0 m-0 w-9">
        {historicalDataReady && (
          <DataTable pt={dataTableStyles} value={formattedHistoricalData}>
            <Column sortable field="date" header="Date" />
            <Column field="name" header="Company" />
            <Column sortable field="marketCap" header="Market Cap" />
            <Column field="totalVolume" header="Total Volume" />
            <Column
              field="currentPrice"
              bodyClassName="text-justify"
              header="Price"
            />
          </DataTable>
        )}
      </div>
    </>
  );
}
