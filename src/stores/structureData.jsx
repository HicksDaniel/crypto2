export const structuredCoinData = async (coinData) => {

  return new Promise((resolve) => {

    const processedData = {
      name: coinData?.name || null,
      last_updated: coinData?.last_updated || null,
      marketData: {
        allTimeHigh: {
          ath: coinData?.market_data?.ath?.usd || null,
          ath_cp: coinData?.market_data?.ath_change_percentage?.usd || null,
          ath_date: coinData?.market_data?.ath_date?.usd || null,
        },
        allTimeLow: {
          atl: coinData?.market_data?.atl?.usd || null,
          atl_cp: coinData?.market_data?.atl_change_percentage?.usd || null,
          atl_date: coinData?.market_data?.atl_date?.usd || null,
        },
        pricing: {
          currentPrice: coinData?.market_data?.current_price?.usd || null,
          high_24h: coinData?.market_data?.high_24h?.usd || null,
          low_24h: coinData?.market_data?.low_24h?.usd || null,
          change_24h: coinData?.market_data?.price_change_24h_in_currency?.usd || null,
          pcp_1h: coinData?.market_data?.price_change_percentage_1h_in_currency?.usd || null,
          pcp_24h: coinData?.market_data?.price_change_percentage_24h || null,
          pcp_7day: coinData?.market_data?.price_change_percentage_7d || null,
          pcp_14day: coinData?.market_data?.price_change_percentage_14d || null,
          pcp_30day: coinData?.market_data?.price_change_percentage_30d || null,
          pcp_60day: coinData?.market_data?.price_change_percentage_60d || null,
          pcp_200day: coinData?.market_data?.price_change_percentage_200d || null,
          pcp_1year: coinData?.market_data?.price_change_percentage_1y || null,
        },
      },
    };
    resolve(processedData);

  });
};