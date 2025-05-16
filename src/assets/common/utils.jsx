export function mapCoinData(coin) {
  console.log("test", coin);
  return {
    name: coin?.name || null,
    image: coin?.small || null,
    currentPrice: coin?.data?.price || null,
    priceChange24h: coin?.data?.price_change_percentage_24h?.usd || null,
    totalVolume: coin?.data?.total_volume || null,
    marketCapRank: coin?.market_cap_rank || null,
    symbol: coin?.symbol || null,
  };
}
export function mapHistoricalData(coin, localCurrency) {

  return {
    name: coin?.name || null,
    image: coin?.image?.small || null,
    currentPrice: coin?.market_data?.current_price?.[localCurrency].toFixed(2) || null,
    totalVolume: coin?.market_data?.total_volume?.[localCurrency].toFixed(2) || null,
    marketCap: coin?.market_data?.market_cap?.[localCurrency].toFixed(2) || null,
    symbol: coin?.symbol || null,
  };
}
