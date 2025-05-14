export const formatCurrency = (value, numType) => {
    return value.toLocaleString('en-US', { maximumSignificantDigits: 5, maximumFractionDigits: 5, style: numType, currency: 'USD' });
};



export const imageBodyTemplate = (rowData) => {
    return (

        <div className=" flex justify-content-between p-0 align-items-center">
            <div className=" flex align-items-center w-4">
                <img style={{ borderRadius: '20px' }} src={`${rowData.image}`} width={"40px"} alt={rowData.image} className="shadow-4" />
            </div>
            <div className=" flex w-7 justify-content-center">
                {rowData.symbol}
            </div>
        </div>
    )
};
export const displayNameTemplate = (rowData) => {
    return (
        <div className=" justify-content-center align-items-center">
            {rowData.name}
        </div>
    )
};
export const marketCapTemplate = (rowData) => {
    return (
        <div className="flex  justify-content-center align-items-center">
            {rowData.marketCapRank}
        </div>
    )
};
export const currentPriceDataTemplate = (rowData) => {
    return (
        <div className="flex justify-content-center w-12" >
            {formatCurrency(rowData.currentPrice, "currency")}
        </div>
    )
};
export const priceChangeDataTemplate = (rowData) => {
    const iconColor = rowData.priceChange24h > 0 ? "green" : "red"
    const deduceSymbol = rowData.priceChange24h > 0 ?
        "m-2 pi pi-chevron-up" : "m-2 pi pi-chevron-down"

    return (
        <div className="flex w-full align-items-center justify-content-end">
            {formatCurrency(rowData.priceChange24h / 100, "percent")}

            <i className={deduceSymbol} style={{ borderRadius: "25%", boxShadow: `0px 0px 5px 2px ${iconColor}`, color: iconColor }}></i>
        </div>
    )
};
