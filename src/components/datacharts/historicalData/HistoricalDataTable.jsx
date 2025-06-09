import React, { useState, useEffect } from "react";
import { eachDayOfInterval } from "date-fns";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Calendar } from "primereact/calendar";
import { useCoinStore } from "../../../stores/useCoinStore.jsx";
import { dataTableStyles } from "../../../assets/common/passthroughStyles.jsx";
import { useNavigate } from "react-router";
import { formatCurrency } from "../trendingData/tableBodyStyles.jsx";



export default function HistoricalDataTable() {
  const { selectedDates, fetchHistoryData, updateSelectedDates, formattedHistoricalData, searchCoin, loading } =
    useCoinStore();
  const navigate = useNavigate();

  const CompanyData = (rowData) => {
    return (
      <div
        onClick={() => handleReroute("/Coin")}
        className="flex cursor-pointer justify-content-center w-12"
      >
        {rowData.name}
      </div>
    );
  };
  const handleReroute = (value) => {
    navigate(value);
  };

  const handleChange = (dateValues) => {


    if (dateValues && dateValues.length === 2) {
      updateSelectedDates(dateValues[0], dateValues[1]);

    };
    if (dateValues && dateValues[0] && dateValues[1]) {
      fetchHistoryData();
    }
  };



  const historicalDataReady = formattedHistoricalData && !loading;

  return (
    <>
      {loading && <div>Loading historical data...</div>}

      <div>Searching Historical Data for: {searchCoin}</div>

      <div className="card w-6 flex justify-content-center">
        <Calendar
          className="w-12"
          dateFormat="MM/dd/yy"
          value={selectedDates}
          onChange={(e) => handleChange(e.value)}
          selectionMode="range"
          readOnlyInput
          hideOnRangeSelection
        />
      </div>

      <div className="flex bg-primary-600 justify-content-center p-0 m-0 w-9">
        {historicalDataReady ? (
          <DataTable pt={dataTableStyles} value={formattedHistoricalData}>
            <Column sortable field="date" header="Date" />
            <Column body={CompanyData} header="Company" />
            <Column field="marketCap" header="Market Cap" body={(rowData) => formatCurrency(rowData.marketCap)} />
            <Column field="totalVolume" header="Total Volume" />
            <Column field="currentPrice" header="Price" body={(rowData) => formatCurrency(rowData.currentPrice)} />
          </DataTable>
        ) : (
          !loading && <div>No historical data found.</div>
        )}
      </div>
    </>
  );
}
