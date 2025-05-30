import { Badge } from "primereact/badge";
import { useNavigate } from "react-router";

export const ItemRenderer = ({ item }) => {
  const navigate = useNavigate();

  const handleRouting = (toRoute) => {
    console.log(typeof toRoute);
    navigate(toRoute);
  };

  return (
    <>
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
};
