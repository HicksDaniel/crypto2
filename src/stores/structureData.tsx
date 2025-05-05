export function structuredCoinData(data) {

  const dataStructure = {
    name: data?.name || null,
    last_updated: data?.last_updated || null,
    marketData: {
      allTimeHigh: {
        ath: data?.market_data?.ath?.usd || null,
        ath_cp: data?.market_data?.ath_change_percentage?.usd || null,
        ath_date: data?.market_data?.ath_date?.usd || null,
      },

      allTimeLow: {
        atl: data?.market_data?.atl?.usd || null,
        atl_cp: data?.market_data?.atl_change_percentage?.usd || null,
        atl_date: data?.market_data?.atl_date?.usd || null,
      },
      pricing: {
        currentPrice: data?.market_data?.current_price?.usd || null,
        high_24h: data?.market_data?.high_24h?.usd || null,
        low_24h: data?.market_data?.low_24h?.usd || null,
        change_24h: data?.market_data?.price_change_24h_in_currency?.usd || null,
        pcp_1h:
          data?.market_data?.price_change_percentage_1h_in_currency?.usd || null,
        pcp_24h: data?.market_data?.price_change_percentage_24h || null,
        pcp_7day: data?.market_data?.price_change_percentage_7d || null,
        pcp_14day: data?.market_data?.price_change_percentage_14d || null,
        pcp_30day: data?.market_data?.price_change_percentage_30d || null,
        pcp_60day: data?.market_data?.price_change_percentage_60d || null,
        pcp_200day: data?.market_data?.price_change_percentage_200d || null,
        pcp_1year: data?.market_data?.price_change_percentage_1y || null,
      },
    },
  };

  return dataStructure


}
