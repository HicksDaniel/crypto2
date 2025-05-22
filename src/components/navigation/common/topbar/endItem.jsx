import { InputText } from "primereact/inputtext";
import { Avatar } from "primereact/avatar";
import { useCoinStore } from "../../../../stores/useCoinStore";

export function EndItem() {
  const { searchCoin, updateSearchCoin, loading } = useCoinStore();

  const handleSubmit = (value) => {
    updateSearchCoin(value);
  };
  return (
    <div
      className="flex justify-content-between align-items-center "
      style={{ minWidth: "100px", maxWidth: "100%" }}
    >
      <InputText
        placeholder="Search"
        onChange={(e) => handleSubmit(e.target.value)}
        type="text"
        className=" w-12 "
      />
      <Avatar
        className="min-w-0"
        image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
        shape="circle"
      />
    </div>
  );
}
