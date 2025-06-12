import { useCoinStore } from "../../../stores/useCoinStore";
import { calculatePercentageChange } from "../../../assets/common/utils";
import { renderChangeOverTime } from "./common/renderChangeOverTime";

export function ChangeOverTime() {
  const { data, timeline, updateTimeLine, fetchSingleCoinData } =
    useCoinStore();

  const currentData = calculatePercentageChange(data?.marketData?.pricing);

  const handleClick = (value) => {
    if (value === timeline) return;
    updateTimeLine(value);
    fetchSingleCoinData();
  };

  return (
    <div className="flex mb-6 border-1 justify-content-around align-items-end overflow-hidden border-round-3xl h-8rem w-11">
      {currentData?.map((item, index) => (
        renderChangeOverTime(item, index, handleClick)
      ))}
    </div>
  );
}
