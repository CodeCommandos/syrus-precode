import WebSocket from "ws";

export const subscribeToRealtimeStock = (symbol) => {
  if (!symbol) {
    console.log("Symbol is required");
    return;
  }

  const apiKey = process.env.APCA_API_KEY_ID;
  const secretKey = process.env.APCA_API_SECRET_KEY;

  const url = "wss://stream.data.alpaca.markets/v2/test";

  const ws = new WebSocket(url, {
    headers: {
      "APCA-API-KEY-ID": apiKey,
      "APCA-API-SECRET-KEY": secretKey,
    },
  });

  ws.on("open", () => {
    
    // Subscribe to the symbol for trade data and quote bars
    const subscribeMessage = {
      action: "subscribe",
      trades: [symbol], // Trades channel for the symbol
      quotes: [symbol], // Quotes channel for the symbol
      bars: [symbol], // Bars channel for the symbol (minute-level data)
    };
    ws.send(JSON.stringify(subscribeMessage));
    console.log(`Subscribed to real-time data for ${symbol}`);
  });

  ws.on("message", (data) => {
    const parsedData = JSON.parse(data);
    parsedData.forEach((update)=>{
        if (update?.T === "t") {
          // Trade message
          console.log(`Trade data for ${symbol}:`, parsedData);
        } else if (update?.T === "q") {
          // Quote message
          console.log(`Quote data for ${symbol}:`, parsedData);
        } else if (update?.T === "b") {
          // Bar (minute) message
          console.log(`Minute bar data for ${symbol}:`, parsedData);
        }
    })
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });

  ws.on("close", (code, reason) => {
    console.log("Stock WebSocket connection closed", { code, reason });
  });

};
