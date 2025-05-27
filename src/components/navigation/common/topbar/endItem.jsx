import { useState, useEffect, useMemo } from "react";
import { InputText } from "primereact/inputtext";
import { Avatar } from "primereact/avatar";
import { ListBox } from "primereact/listbox";
import { useCoinStore } from "../../../../stores/useCoinStore";

export function EndItem() {
  const { fetchCoinList, coinList, updateSearchCoin } = useCoinStore();
  const [searchValue, setSearchValue] = useState("");
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    fetchCoinList();
  }, [fetchCoinList]);

  const normalizedSearch = searchValue.toLowerCase().normalize();

  const filteredCoins = useMemo(() => {
    if (!normalizedSearch.trim()) return [];

    return coinList
      .filter(
        (coin) =>
          coin.name.toLowerCase().normalize().includes(normalizedSearch) ||
          coin.symbol.toLowerCase().normalize().includes(normalizedSearch)
      )
      .sort((a, b) => a.name.length - b.name.length)
      .slice(0, 5)
      .map((coin) => ({
        label: `${coin.name} (${coin.symbol})`,
        value: coin,
      }));
  }, [normalizedSearch, coinList]);

  const handleSelectCoin = (e) => {
    const coin = e.value;
    if (coin) {
      updateSearchCoin(coin.id);
      setSelectedCoin(coin);
      setSearchValue(coin.name); // optionally show the selected name
    }

    // Clear filteredCoins by clearing searchValue (this hides the ListBox)
    setTimeout(() => setSearchValue(""), 100); // delay to prevent ListBox flicker
  };

  return (
    <div className="flex flex-column gap-2" style={{ position: "relative" }}>
      <div
        className="flex justify-content-between align-items-center"
        style={{ minWidth: "100px", maxWidth: "100%" }}
      >
        <InputText
          placeholder="Search"
          keyfilter="alphanum"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          className="w-10"
        />
        <Avatar
          className="min-w-0 mr-1"
          image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
          shape="circle"
        />
      </div>

      {filteredCoins.length > 0 && (
        <ListBox
          className="w-10"
          value={selectedCoin}
          options={filteredCoins}
          onChange={handleSelectCoin}
          style={{
            zIndex: "1",
            position: "absolute",
            transform: "translateY(55px)",
          }}
          optionLabel="label"
          filter={false}
          listStyle={{ maxHeight: "200px" }}
        />
      )}
    </div>
  );
}
