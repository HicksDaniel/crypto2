import { InputText } from "primereact/inputtext";
import { Avatar } from "primereact/avatar";

export function EndItem() {
    return (

        <div className="flex justify-content-between align-items-center " style={{ minWidth: "100px", maxWidth: "100%" }}>
            <InputText placeholder="Search" type="text" className=" w-12 " />
            <Avatar className="min-w-0" image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
        </div>
    )
}


