import { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Avatar } from "primereact/avatar";
import { useCoinStore } from "../../../../stores/useCoinStore";

export function EndItem() {
  const { searchCoin, fetchCoinList, coinList, updateSearchCoin, loading, error } = useCoinStore();
  const [searchValue, setSearchValue] = useState("")
  const [filteredCoins, setFilteredCoins] = useState([]);

  useEffect(() => {
    fetchCoinList();
  }, []);

  useEffect(() => {
    if (searchValue.trim() === "") {
      setFilteredCoins([]);
      return;
    }

    const results = coinList
      .filter(
        (coin) =>
          coin.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(searchValue.toLowerCase())
      )
      .sort((a, b) => a.name.length - b.name.length)
      .slice(0, 5);

    setFilteredCoins(results);
  }, [searchValue, coinList]);

  const handleChange = (value) => {
    setSearchValue(value);
  };
  const handleSelectCoin = (coin) => {
    updateSearchCoin(coin.id);
    setSearchValue(coin.name);
    setFilteredCoins([]);
  };
  return (
    <div className="flex flex-column gap-2" style={{ position: "relative" }}>
      <div
        className="flex justify-content-between align-items-center"
        style={{ minWidth: "100px", maxWidth: "100%" }}
      >
        <InputText
          placeholder="Search"
          value={searchValue}
          onChange={(e) => handleChange(e.target.value)}
          type="text"
          className="w-12"
        />
        <Avatar
          className="min-w-0"
          image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
          shape="circle"
        />
      </div>

      {filteredCoins.length > 0 && (
        <ul
          className="search-dropdown"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            zIndex: 10,
            background: "#fff",
            width: "100%",
            maxHeight: "200px",
            overflowY: "auto",
            border: "1px solid #ccc",
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {filteredCoins.map((coin) => (
            <li
              key={coin.id}
              onClick={() => handleSelectCoin(coin)}
              style={{
                padding: "0.5rem",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              {coin.name} ({coin.symbol})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}