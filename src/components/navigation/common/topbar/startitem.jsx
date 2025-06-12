import { Button } from "primereact/button";
import { useCoinStore } from "../../../../stores/useCoinStore";

export function StartItem({ handleClick }) {
  const { data, singleCoinData, themeColors, chartColors } =
    useCoinStore();

  return (
    <div className="flex justify-content-evenly align-items-center">
      <img alt="logo" src="src\assets\TinyMeowth.png" height="50"></img>
      <Button onClick={handleClick}>TEST</Button>
      <button onClick={() => console.log(themeColors)}>Colors</button>
      <button onClick={() => console.log(chartColors)}>Colors</button>


    </div>
  );
}
