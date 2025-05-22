import { Badge } from "primereact/badge";
import { useNavigate } from "react-router";

function itemRenderer(item) {
  const navigate = useNavigate();
  const handleRouting = (toRoute) => {
    navigate(toRoute);
  };
  return (
    <a
      onClick={() => {
        handleRouting(item.label);
      }}
      className="flex text-xl px-2 align-items-center"
    >
      <span className={item.icon} />
      <span className="m-1">{item.label}</span>
      {item.badge && <Badge className="m-0 p-0" value={item.badge} />}
    </a>
  );
}

export const topbarMenuItems = [
  {
    label: "Home",
    icon: "pi pi-home",
    template: itemRenderer,
  },
  {
    label: "Dashboard",
    icon: "pi pi-star",
    template: itemRenderer,
  },
  {
    label: "About",
    icon: "pi pi-envelope",
    template: itemRenderer,
  },
];
