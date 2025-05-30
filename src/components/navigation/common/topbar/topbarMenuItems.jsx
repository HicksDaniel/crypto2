import { ItemRenderer } from "./itemRenderer";

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
