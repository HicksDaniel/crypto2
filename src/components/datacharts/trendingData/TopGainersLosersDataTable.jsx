import { useEffect } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useCoinStore } from "../../../stores/useCoinStore.jsx";
import { dataTableStyles } from "../../../assets/common/passthroughStyles.jsx";
import {
  imageBodyTemplate,
  marketCapTemplate,
  currentPriceDataTemplate,
  priceChangeDataTemplate,
} from "./tableBodyStyles.jsx";
import { useNavigate } from "react-router";

export default function TopGainersLosersDataTable({ gainer }) {
  const navigate = useNavigate();
  const {
    fetchSingleCoinData,
    topGainersData,
    topLosersData,
    updateSearchCoin,
    loading,
  } = useCoinStore();

  const displayNameTemplate = (rowData) => {
    const handleClick = (value) => {
      updateSearchCoin(value);
      fetchSingleCoinData();
      navigate("/Coin");
    };
    return (
      <div
        onClick={() => handleClick(rowData.name)}
        className=" justify-content-center align-items-center"
      >
        {rowData.name}
      </div>
    );
  };

  const dataReady = topGainersData && topLosersData && !loading;

  const GainersLosersData = gainer === true ? topGainersData : topLosersData;

  return (
    <>
      <div className="flex w-12 bg-primary-600 justify-content-center p-0 m-0 w-9">
        {dataReady && (
          <DataTable pt={dataTableStyles} value={GainersLosersData}>
            <Column body={displayNameTemplate} header="Company" />
            <Column body={imageBodyTemplate} header="Symbol" />
            <Column
              sortable
              body={marketCapTemplate}
              field="marketCapRank"
              header="MC Rank"
            />
            <Column
              sortable
              body={currentPriceDataTemplate}
              field="currentPrice"
              header="Current Price"
            />
            <Column
              sortable
              body={priceChangeDataTemplate}
              field="percentChange24h"
              header="24h Change"
            />
            <Column field="totalVolume" header="Total Volume" />
          </DataTable>
        )}
      </div>
    </>
  );
}
