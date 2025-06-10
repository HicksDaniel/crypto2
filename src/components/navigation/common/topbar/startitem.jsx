import { Button } from "primereact/button";
import { useCoinStore } from "../../../../stores/useCoinStore";

export function StartItem({ handleClick }) {
  const { data, singleCoinData, userFavoritesData, visibleCharts } =
    useCoinStore();

  return (
    <div className="flex justify-content-evenly align-items-center">
      <img alt="logo" src="src\assets\TinyMeowth.png" height="50"></img>
      <Button onClick={handleClick}>TEST</Button>



    </div>
  );
}
