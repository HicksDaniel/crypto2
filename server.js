import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;
const FETCH_HEADER = {
  accept: "application/json",
  "x-cg-demo-api-key": "CG-c7WmWDGxgBsFBma9zh72TkTC",
};

app.use(cors());

app.get("/api/coin-history", async (req, res) => {
  const { coinId, date } = req.query;

  if (!coinId || !date) {
    return res.status(400).json({ error: "Missing coinId or date" });
  }

  try {
    const apiUrl = `https://api.coingecko.com/api/v3/coins/${coinId}/history?date=${date}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: FETCH_HEADER,
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching from CoinGecko:", error);
    res.status(500).json({ error: "Failed to fetch data from CoinGecko" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
