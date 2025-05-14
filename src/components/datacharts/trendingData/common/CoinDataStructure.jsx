export function CoinDataStructure(data) {
    const dataStructure = {
        name: data?.name || null,
        image: data.small || null,
        currentPrice: data?.data?.price || null,
        priceChange24h: data?.data?.price_change_percentage_24h?.usd || null,
        totalVolume: data?.data?.total_volume || null,
        marketCapRank: data?.market_cap_rank || null,
        symbol: data?.symbol || null,
    }

    return dataStructure
}