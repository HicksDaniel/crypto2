export const renderChangeOverTime = (item, index, handleClick) => {
    return (
        <div
            key={index}
            className="flex border-right-1 justify-content-center flex-column w-2 text-center h-full"
        >
            <div
                className="flex w-12 p-0 m-0 cursor-pointer justify-content-center align-items-center h-4rem font-bold"
                onClick={() => handleClick(item.value)}
                style={{
                    backgroundColor: "var(--primary-color)",
                    color: "var(--primary-color-text)",
                    borderColor: "black",
                }}
            >
                {item.label}
            </div>
            <div className="flex   justify-content-center align-items-center h-4rem font-bold">
                {item.changeValue != null
                    ? item.label === "Current"
                        ? `$${item.changeValue}`
                        : `${item.changeValue.toFixed(2)}%`
                    : "N/A"}
            </div>
        </div>
    )
}