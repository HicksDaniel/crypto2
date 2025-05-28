import { Button } from "primereact/button";

export function StartItem({ handleClick }) {
  return (
    <div className="flex justify-content-evenly align-items-center">
      <img alt="logo" src="src\assets\TinyMeowth.png" height="50"></img>
      <Button onClick={handleClick}>TEST</Button>
    </div>
  );
}
