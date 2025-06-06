import { Outlet } from "react-router";
import MenuTopBar from "./components/navigation/topbar";
import MenuSideBar from "./components/navigation/sidebar";
import { Button } from "primereact/button";

const TOP_BAR_HEIGHT = "75px";
const SIDE_BAR_WIDTH = "12.5%";

const contentStyles = {
  display: "flex",
  flexFlow: "column nowrap",
  alignItems: "center",
  marginTop: TOP_BAR_HEIGHT,
  height: `calc(100vh - ${TOP_BAR_HEIGHT})`,
  padding: "20px",
  overflowX: "hidden",
  overflowY: "auto",
};

function Layout() {
  return (
    <>
      <MenuSideBar width={SIDE_BAR_WIDTH} />
      <MenuTopBar height={TOP_BAR_HEIGHT} />
      <div className="w-9" style={{ backgroundColor: "var(--surface-50" }}>
        <div style={contentStyles}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
