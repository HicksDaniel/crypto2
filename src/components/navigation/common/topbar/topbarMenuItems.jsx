import { Badge } from "primereact/badge";
import { useNavigate } from "react-router";
import { useCoinStore } from "../../../../stores/useCoinStore";

function ItemRenderer({ item }) {
  const { data, singleCoinData } = useCoinStore();
  const navigate = useNavigate();

  const handleRouting = (toRoute) => {
    console.log(typeof toRoute);
    navigate(toRoute);
  };

  return (
    <>
      <button onClick={() => console.log(data)}>Data</button>
      <button onClick={() => console.log(singleCoinData)}>sD</button>
      <a
        onClick={() => {
          handleRouting(item.label);
        }}
        className="flex text-xl px-2 align-items-center"
        style={{ color: "var(--primary-color-text)", cursor: "pointer" }} // make it clear it's clickable
      >
        <span className={item.icon} />
        <span className="m-1">{item.label}</span>
        {item.badge && <Badge className="m-0 p-0" value={item.badge} />}
      </a>
    </>
  );
}

export const topbarMenuItems = [
  {
    label: "Home",
    icon: "pi pi-home",
    template: (item) => <ItemRenderer item={item} />,
  },
  {
    label: "Dashboard",
    icon: "pi pi-star",
    template: (item) => <ItemRenderer item={item} />,
  },
  {
    label: "About",
    icon: "pi pi-envelope",
    template: (item) => <ItemRenderer item={item} />,
  },
  {
    label: "Coin",
    icon: "pi pi-coin",
    template: (item) => <ItemRenderer item={item} />,
  },
];
