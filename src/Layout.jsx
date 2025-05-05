
import { Outlet } from "react-router";
import MenuTopBar from "./components/navigation/topbar";
import MenuSideBar from "./components/navigation/sidebar";

const TOP_BAR_HEIGHT = "75px";
const SIDE_BAR_WIDTH = "12.5%";

const contentStyles = {
    marginTop: TOP_BAR_HEIGHT,
    height: `calc(100vh - ${TOP_BAR_HEIGHT})`,
    padding: "20px",
}

function Layout() {

    return (
        <>
            <MenuSideBar width={SIDE_BAR_WIDTH} />
            <MenuTopBar height={TOP_BAR_HEIGHT} />
            <div className="w-9" style={{ backgroundColor: "rgba(125, 125, 125, .2)" }}>
                <div style={contentStyles}>
                    <Outlet />
                </div>
            </div >
        </>


    );
}

export default Layout;