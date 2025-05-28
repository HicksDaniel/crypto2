import React, { useState, useEffect } from "react";
import { eachDayOfInterval } from "date-fns";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Calendar } from "primereact/calendar";
import { useCoinStore } from "../../../stores/useCoinStore.jsx";
import { dataTableStyles } from "../../../assets/common/passthroughStyles.jsx";
import { useNavigate } from "react-router";

const startDate = new Date();
startDate.setDate(startDate.getDate() - 1);

const endDate = new Date();

export default function HistoricalDataTable() {
  const [inputDates, setInputDates] = useState([startDate, endDate]);
  const navigate = useNavigate();
  const {
    fetchHistoryData,
    formattedHistoricalData,
    searchCoin,
    fetchData,
    loading,
  } = useCoinStore();

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
      setInputDates(dateValues);
    }
  };

  const localCurrency = "usd";

  const start = inputDates[0];
  const end = inputDates[1];
  const dates = start && end ? eachDayOfInterval({ start, end }) : [];

  useEffect(() => {
    if (start && end && dates.length > 0) {
      fetchHistoryData(searchCoin, dates, localCurrency);
    }
  }, [start, end, searchCoin]);

  const historicalDataReady = formattedHistoricalData && !loading;

  return (
    <>
      {loading && <div>Loading historical data...</div>}

      <div>Searching Historical Data for: {searchCoin}</div>

      <div className="card w-6 flex justify-content-center">
        <Calendar
          className="w-12"
          value={inputDates}
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
            <Column body={CompanyData} header="Company" />
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
