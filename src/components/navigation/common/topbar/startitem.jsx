import { Button } from "primereact/button";

export function StartItem({ handleClick }) {
  return (
    <div className="flex justify-content-evenly align-items-center">
      <img
        style={{ borderRadius: "50%", boxShadow: "0px 0px 100px -10px" }}
        alt="logo"
        src="src\assets\TinyMeowth.png"
        height="50"
      ></img>
      <Button onClick={handleClick}>TEST</Button>
    </div>
  );
}
