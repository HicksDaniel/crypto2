// import { useState, useEffect, useMemo } from "react";
// import { InputText } from "primereact/inputtext";
// import { Avatar } from "primereact/avatar";
// import { ListBox } from "primereact/listbox";
// import { useCoinStore } from "../../../../stores/useCoinStore";

// export function EndItem() {
//   const { fetchCoinList, coinList, updateSearchCoin } = useCoinStore();
//   const [searchValue, setSearchValue] = useState("");
//   const [selectedCoin, setSelectedCoin] = useState(null);

//   useEffect(() => {
//     fetchCoinList();
//   }, [fetchCoinList]);

//   const normalizedSearch = searchValue.toLowerCase().normalize();

//   const filteredCoins = useMemo(() => {
//     if (!normalizedSearch.trim()) return [];

//     return coinList
//       .filter(
//         (coin) =>
//           coin.name.toLowerCase().normalize().includes(normalizedSearch) ||
//           coin.symbol.toLowerCase().normalize().includes(normalizedSearch)
//       )
//       .sort((a, b) => a.name.length - b.name.length)
//       .slice(0, 5)
//       .map((coin) => ({
//         label: `${coin.name} (${coin.symbol})`,
//         value: coin,
//       }));
//   }, [normalizedSearch, coinList]);

//   const handleSelectCoin = (e) => {
//     const coin = e.value;
//     if (coin) {
//       updateSearchCoin(coin.id);
//       setSelectedCoin(coin);
//       setSearchValue(coin.name);

//     setTimeout(() => setSearchValue(""), 100);
//   };

//   return (
//     <div className="flex flex-column gap-2" style={{ position: "relative" }}>
//       <div
//         className="flex justify-content-between align-items-center"
//         style={{ minWidth: "100px", maxWidth: "100%" }}
//       >
//         <InputText
//           placeholder="Search"
//           keyfilter="alphanum"
//           value={searchValue}
//           onChange={(e) => setSearchValue(e.target.value)}
//           type="text"
//           className="w-10"
//         />
//         <Avatar
//           className="min-w-0 mr-1"
//           image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
//           shape="circle"
//         />
//       </div>

//       {filteredCoins.length > 0 && (
//         <ListBox
//           className="w-10"
//           value={selectedCoin}
//           options={filteredCoins}
//           onChange={handleSelectCoin}
//           style={{
//             zIndex: "1",
//             position: "absolute",
//             transform: "translateY(55px)",
//           }}
//           optionLabel="label"
//           filter={false}
//           listStyle={{ maxHeight: "200px" }}
//         />
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { ListBox } from "primereact/listbox";
import { Avatar } from "primereact/avatar";
import { useCoinStore } from "../../../../stores/useCoinStore";

export function EndItem() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const { updateSearchCoin } = useCoinStore(); // optional

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (!searchValue.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(
            searchValue
          )}`
        );
        const text = await res.text();

        let data;
        try {
          data = JSON.parse(text);
        } catch {
          console.error("API returned non-JSON response:", text);
          setSearchResults([]);
          return;
        }

        const coins = data.coins.map((coin) => ({
          label: `${coin.name} (${coin.symbol})`,
          value: coin.id,
          image: coin.thumb,
        }));

        setSearchResults(coins.slice(0, 5));
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      }
    }, 800); // Increased debounce to 800ms look at implementing back-end proxy for caching search results

    return () => clearTimeout(delayDebounce);
  }, [searchValue]);

  const handleSelect = (e) => {
    const selectedId = e.value;
    const coin = searchResults.find((c) => c.value === selectedId);
    if (coin) {
      setSelectedCoin(coin);
      setSearchValue(coin.label); // set input to selected label
      updateSearchCoin(coin.value); // store selected coin in global state
      setSearchResults([]); // hide dropdown
    }
  };

  return (
    <div className="flex flex-column gap-2" style={{ position: "relative" }}>
      <div className="flex align-items-center gap-2">
        <InputText
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-10"
        />
        <Avatar
          className="min-w-0"
          image={
            selectedCoin?.image ||
            "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
          }
          shape="circle"
        />
      </div>

      {searchResults.length > 0 && (
        <ListBox
          value={selectedCoin?.value || null}
          options={searchResults}
          onChange={handleSelect}
          optionLabel="label"
          itemTemplate={(option) => (
            <div className="flex align-items-center">
              <img
                src={option.image}
                alt={option.label}
                style={{ width: "20px", marginRight: "10px" }}
              />
              <span>{option.label}</span>
            </div>
          )}
          style={{
            position: "absolute",
            zIndex: 10,
            transform: "translateY(55px)",
            width: "100%",
          }}
          listStyle={{ maxHeight: "200px" }}
        />
      )}
    </div>
  );
}
