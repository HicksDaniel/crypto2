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
