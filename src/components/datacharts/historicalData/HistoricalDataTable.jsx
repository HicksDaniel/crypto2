import React, { useState, useEffect } from "react";
import { eachDayOfInterval, parseISO, format } from "date-fns";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Calendar } from "primereact/calendar";
import { useCoinStore } from "../../../stores/useCoinStore.jsx";
import { dataTableStyles } from "../../../assets/common/passthroughStyles.jsx";

const startDate = new Date();
startDate.setDate(startDate.getDate() - 1); // May 18

const endDate = new Date(); // May 19

export default function HistoricalDataTable() {
  const { fetchHistoryData, formattedHistoricalData, searchCoin, loading } =
    useCoinStore();

  const [calendarDates, setCalendarDates] = useState([startDate, endDate]);

  const handleChange = async (dateValues) => {
    setCalendarDates(dateValues);
  };

  const localCurrency = "usd";

  const start = calendarDates[0];
  const end = calendarDates[1];
  const dates = start && end ? eachDayOfInterval({ start, end }) : [];

  useEffect(() => {
    if (start && end && dates.length > 0) {
      fetchHistoryData(searchCoin, dates, localCurrency);
    }
  }, [calendarDates, start, end, JSON.stringify(searchCoin)]);

  const historicalDataReady = formattedHistoricalData && !loading;

  return (
    <>
      {loading && <div>Loading historical data...</div>}

      <div>Searching Historical Data for: {searchCoin}</div>

      <button onClick={() => console.log("HDT", searchCoin)}>
        Click for trending
      </button>

      <div className="card w-6 flex justify-content-center">
        <Calendar
          className="w-12"
          value={calendarDates}
          onChange={(e) => handleChange(e.value)}
          selectionMode="range"
          readOnlyInput
          hideOnRangeSelection
        />
      </div>
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
